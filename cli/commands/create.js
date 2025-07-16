const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const { execSync } = require('child_process');

// 템플릿 생성 함수들
const createLandingPageTemplate = require('../templates/landingpage');
const createPortfolioTemplate = require('../templates/portfolio');
const createBlogTemplate = require('../templates/blog');

// 프로젝트 타입 별 템플릿 맵핑
const templateMap = {
  landingpage: createLandingPageTemplate,
  portfolio: createPortfolioTemplate,
  blog: createBlogTemplate
};

// 유효한 프로젝트 타입 검증
function validateProjectType(projectType) {
  const validTypes = ['landingpage', 'portfolio', 'blog'];
  return validTypes.includes(projectType.toLowerCase());
}

// 프로젝트 이름 생성
function generateProjectName(projectType, customName) {
  if (customName) return customName;
  
  const defaultNames = {
    landingpage: 'my-landing-page',
    portfolio: 'my-portfolio',
    blog: 'my-blog'
  };
  
  return defaultNames[projectType] || 'my-project';
}

// 디렉토리 생성
function createDirectory(projectPath) {
  if (fs.existsSync(projectPath)) {
    throw new Error(`디렉토리 '${projectPath}'가 이미 존재합니다. 다른 이름을 사용하거나 기존 폴더를 삭제해주세요.`);
  }
  fs.mkdirSync(projectPath, { recursive: true });
}

// 패키지 의존성 설치
function installDependencies(projectPath) {
  const spinner = ora('패키지 설치 중...').start();
  
  try {
    execSync('npm install', { 
      cwd: projectPath, 
      stdio: 'pipe' 
    });
    spinner.succeed('패키지 설치 완료!');
  } catch (error) {
    spinner.fail('패키지 설치 실패');
    console.error(chalk.red('설치 오류:'), error.message);
    throw error;
  }
}

// 성공 메시지 출력
function showSuccessMessage(projectName, projectPath) {
  console.log('');
  console.log(chalk.green('🎉 프로젝트 생성 완료!'));
  console.log('');
  console.log(chalk.yellow('다음 명령어로 개발을 시작하세요:'));
  console.log(chalk.gray('  cd ' + projectName));
  console.log(chalk.gray('  npm run dev'));
  console.log('');
  console.log(chalk.blue('브라우저에서 http://localhost:3000 을 열어보세요.'));
  console.log('');
  console.log(chalk.green('즐거운 개발 되세요! 🚀'));
}

// 메인 create 명령어 처리 함수
async function createCommand(projectType, projectName, options) {
  try {
    // 프로젝트 타입 검증
    if (!validateProjectType(projectType)) {
      console.error(chalk.red('❌ 지원하지 않는 프로젝트 타입입니다.'));
      console.log(chalk.yellow('지원하는 타입: landingpage, portfolio, blog'));
      return;
    }

    // 프로젝트 이름 설정
    const finalProjectName = generateProjectName(projectType, projectName);
    const projectPath = path.join(process.cwd(), finalProjectName);

    // 사용자 확인 (--yes 옵션이 없는 경우)
    if (!options.yes) {
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'proceed',
          message: `${chalk.cyan(finalProjectName)} 프로젝트를 생성하시겠습니까?`,
          default: true
        }
      ]);

      if (!answers.proceed) {
        console.log(chalk.yellow('프로젝트 생성이 취소되었습니다.'));
        return;
      }
    }

    console.log('');
    console.log(chalk.blue(`📁 ${projectType} 프로젝트 생성 중...`));

    // 디렉토리 생성
    createDirectory(projectPath);

    // 템플릿 생성
    const createTemplate = templateMap[projectType.toLowerCase()];
    await createTemplate(projectPath, finalProjectName, options);

    // 패키지 의존성 설치
    installDependencies(projectPath);

    // 성공 메시지
    showSuccessMessage(finalProjectName, projectPath);

  } catch (error) {
    console.error(chalk.red('❌ 프로젝트 생성 중 오류가 발생했습니다:'));
    console.error(chalk.red(error.message));
    
    // 실패 시 생성된 폴더 삭제
    if (finalProjectName && fs.existsSync(finalProjectName)) {
      try {
        fs.rmSync(finalProjectName, { recursive: true, force: true });
      } catch (deleteError) {
        console.warn(chalk.yellow('⚠️ 생성된 폴더를 삭제할 수 없습니다:', deleteError.message));
      }
    }
    
    process.exit(1);
  }
}

module.exports = createCommand; 