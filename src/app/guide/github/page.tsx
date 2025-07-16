'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Copy, Star, BookOpen, GitBranch, Users, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const GitHubGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const gitHubFeatures = [
    // Git 기본
    {
      category: 'git-basics',
      title: 'Git 설치 및 초기 설정',
      difficulty: 'beginner',
      description: 'Git을 설치하고 사용자 정보를 설정하는 방법',
      commands: [
        'git --version',
        'git config --global user.name "홍길동"',
        'git config --global user.email "hong@example.com"',
        'git config --global init.defaultBranch main',
        'git config --list'
      ],
      explanation: [
        'Git 버전 확인',
        '전역 사용자 이름 설정',
        '전역 이메일 주소 설정',
        '기본 브랜치를 main으로 설정',
        '현재 설정 확인'
      ],
      tips: [
        'GitHub 계정의 이메일과 동일하게 설정',
        'SSH 키 설정으로 비밀번호 입력 생략 가능',
        'git config --global 대신 --local로 프로젝트별 설정 가능',
        'VS Code나 다른 에디터를 기본 에디터로 설정 가능',
        'alias 설정으로 명령어 단축 가능'
      ],
      useCase: '개발 환경 설정, 계정 연동, 초기 구성'
    },
    {
      category: 'git-basics',
      title: '저장소 초기화 및 기본 작업',
      difficulty: 'beginner',
      description: 'Git 저장소를 만들고 기본적인 버전 관리 작업',
      commands: [
        'git init',
        'git add .',
        'git commit -m "Initial commit"',
        'git status',
        'git log --oneline'
      ],
      explanation: [
        '현재 폴더를 Git 저장소로 초기화',
        '모든 변경사항을 스테이징 영역에 추가',
        '변경사항을 저장소에 커밋',
        '현재 저장소 상태 확인',
        '커밋 히스토리를 한 줄씩 표시'
      ],
      tips: [
        '.gitignore 파일로 불필요한 파일 제외',
        'git add 대신 git add -A로 모든 변경사항 추가',
        '커밋 메시지는 명확하고 간결하게 작성',
        'git status로 항상 현재 상태 확인',
        'git log --graph로 브랜치 구조 시각화'
      ],
      useCase: '프로젝트 시작, 변경사항 추적, 히스토리 관리'
    },
    {
      category: 'git-basics',
      title: '브랜치 관리',
      difficulty: 'intermediate',
      description: '브랜치를 생성하고 관리하는 방법',
      commands: [
        'git branch',
        'git branch feature/menu-page',
        'git checkout feature/menu-page',
        'git checkout -b feature/order-system',
        'git merge feature/menu-page',
        'git branch -d feature/menu-page'
      ],
      explanation: [
        '현재 브랜치 목록 확인',
        '새 브랜치 생성',
        '브랜치 전환',
        '브랜치 생성과 동시에 전환',
        '브랜치 병합',
        '브랜치 삭제'
      ],
      tips: [
        '기능별로 브랜치를 나누어 작업',
        '브랜치 이름은 feature/, hotfix/, bugfix/ 등의 prefix 사용',
        '작업 완료 후 불필요한 브랜치는 삭제',
        'git checkout 대신 git switch 사용 권장',
        '충돌 발생 시 차근차근 해결'
      ],
      useCase: '기능 개발, 병렬 작업, 실험적 변경'
    },

    // GitHub 기본
    {
      category: 'github-basics',
      title: 'GitHub 계정 생성 및 저장소 생성',
      difficulty: 'beginner',
      description: 'GitHub 계정을 만들고 첫 번째 저장소를 생성하는 방법',
      commands: [
        'github.com에서 회원가입',
        'New Repository 클릭',
        'Repository name: restaurant-website',
        'Description: 신승반점 웹사이트',
        'Public 선택 후 Create repository'
      ],
      explanation: [
        'GitHub 계정 생성',
        '새 저장소 생성 시작',
        '저장소 이름 설정',
        '저장소 설명 추가',
        '공개 저장소로 생성 완료'
      ],
      tips: [
        '저장소 이름은 프로젝트 내용을 명확히 나타내도록',
        'README.md 파일 자동 생성 옵션 활용',
        '.gitignore 템플릿 선택으로 불필요한 파일 제외',
        'Private 저장소는 유료 계정 또는 제한적 무료 사용',
        'Organization 사용으로 팀 프로젝트 관리'
      ],
      useCase: '프로젝트 시작, 코드 공유, 포트폴리오 구축'
    },
    {
      category: 'github-basics',
      title: '로컬과 원격 저장소 연결',
      difficulty: 'beginner',
      description: '로컬 프로젝트를 GitHub 저장소에 연결하는 방법',
      commands: [
        'git remote add origin https://github.com/username/restaurant-website.git',
        'git branch -M main',
        'git push -u origin main',
        'git remote -v',
        'git pull origin main'
      ],
      explanation: [
        '원격 저장소 연결',
        '기본 브랜치를 main으로 설정',
        '로컬 코드를 원격 저장소에 업로드',
        '원격 저장소 연결 상태 확인',
        '원격 저장소에서 최신 변경사항 가져오기'
      ],
      tips: [
        'HTTPS 대신 SSH 사용으로 보안 강화',
        'git push -u로 upstream 설정 후 git push만 사용',
        'git pull 전에 항상 현재 작업 커밋',
        'origin은 원격 저장소의 기본 이름',
        'git fetch로 로컬 병합 없이 원격 상태만 확인'
      ],
      useCase: '원격 백업, 팀 협업, 버전 동기화'
    },
    {
      category: 'github-basics',
      title: 'README.md 작성',
      difficulty: 'beginner',
      description: '프로젝트 소개를 위한 README.md 파일 작성법',
      commands: [
        '# 신승반점 웹사이트',
        '## 프로젝트 소개',
        '인천 차이나타운의 전통 중화요리 전문점 웹사이트',
        '## 기술 스택',
        '- HTML5, CSS3, JavaScript'
      ],
      explanation: [
        '프로젝트 제목 (H1)',
        '소개 섹션 (H2)',
        '프로젝트 간단 설명',
        '기술 스택 섹션',
        '사용된 기술 목록'
      ],
      tips: [
        '마크다운 문법 활용으로 가독성 향상',
        '프로젝트 스크린샷 또는 데모 링크 포함',
        '설치 및 실행 방법 상세 설명',
        '기여 방법과 라이선스 정보 추가',
        '배지(Badge) 활용으로 프로젝트 상태 표시'
      ],
      useCase: '프로젝트 문서화, 사용법 안내, 첫인상 개선'
    },

    // 협업 기능
    {
      category: 'collaboration',
      title: 'Pull Request 생성 및 리뷰',
      difficulty: 'intermediate',
      description: '코드 변경사항을 제안하고 리뷰받는 방법',
      commands: [
        'git checkout -b feature/responsive-design',
        'git add .',
        'git commit -m "Add responsive design for mobile"',
        'git push origin feature/responsive-design',
        'GitHub에서 Compare & pull request 클릭'
      ],
      explanation: [
        '새 기능 브랜치 생성',
        '변경사항 스테이징',
        '의미 있는 커밋 메시지 작성',
        '브랜치를 원격 저장소에 푸시',
        'GitHub에서 PR 생성'
      ],
      tips: [
        'PR 제목과 설명을 명확하게 작성',
        '변경사항을 작은 단위로 나누어 PR 생성',
        '리뷰어를 지정하여 코드 검토 요청',
        'CI/CD 체크가 통과된 후 머지',
        '머지 후 불필요한 브랜치 삭제'
      ],
      useCase: '코드 리뷰, 품질 관리, 팀 협업'
    },
    {
      category: 'collaboration',
      title: 'Issue 관리',
      difficulty: 'beginner',
      description: '버그 리포트나 기능 요청을 관리하는 방법',
      commands: [
        'Issues 탭 클릭',
        'New issue 버튼 클릭',
        'Bug report 또는 Feature request 선택',
        '제목: 모바일에서 메뉴 버튼이 작동하지 않음',
        '설명: 재현 단계와 예상 결과 작성'
      ],
      explanation: [
        'Issue 페이지 접근',
        '새 Issue 생성',
        'Issue 템플릿 선택',
        '명확한 제목 작성',
        '상세한 설명 추가'
      ],
      tips: [
        'Issue 템플릿 활용으로 일관성 유지',
        '라벨(Label)로 Issue 분류',
        'Milestone으로 릴리스 계획 관리',
        'Assignee 지정으로 담당자 명확화',
        'Issue 번호로 커밋과 PR 연결'
      ],
      useCase: '버그 추적, 기능 요청, 프로젝트 관리'
    },
    {
      category: 'collaboration',
      title: 'Fork와 Contribution',
      difficulty: 'intermediate',
      description: '다른 사람의 프로젝트에 기여하는 방법',
      commands: [
        'Fork 버튼 클릭으로 저장소 복사',
        'git clone https://github.com/myname/original-repo.git',
        'git remote add upstream https://github.com/original/repo.git',
        'git checkout -b fix/mobile-menu',
        'git push origin fix/mobile-menu'
      ],
      explanation: [
        '원본 저장소를 내 계정으로 복사',
        '포크한 저장소를 로컬에 클론',
        '원본 저장소를 upstream으로 추가',
        '수정사항을 위한 브랜치 생성',
        '변경사항을 내 포크에 푸시'
      ],
      tips: [
        'upstream에서 정기적으로 최신 변경사항 가져오기',
        '기여 가이드라인(CONTRIBUTING.md) 확인',
        'Code of Conduct 준수',
        '작은 단위의 의미 있는 변경사항 제안',
        'PR 전에 로컬에서 충분한 테스트'
      ],
      useCase: '오픈소스 기여, 학습, 네트워킹'
    },

    // 고급 기능
    {
      category: 'advanced',
      title: 'GitHub Actions (CI/CD)',
      difficulty: 'advanced',
      description: '자동화된 빌드, 테스트, 배포 파이프라인 설정',
      commands: [
        'mkdir -p .github/workflows',
        'touch .github/workflows/deploy.yml',
        'name: Deploy to GitHub Pages',
        'on: push: branches: [main]',
        'jobs: deploy: runs-on: ubuntu-latest'
      ],
      explanation: [
        '워크플로우 디렉토리 생성',
        '워크플로우 파일 생성',
        '워크플로우 이름 설정',
        'main 브랜치 푸시 시 실행',
        'Ubuntu 환경에서 실행'
      ],
      tips: [
        'Marketplace에서 기존 Action 활용',
        '시크릿 변수로 API 키 등 민감 정보 관리',
        '매트릭스 빌드로 여러 환경에서 테스트',
        'if 조건으로 선택적 실행',
        '아티팩트 업로드로 빌드 결과 보존'
      ],
      useCase: '자동 배포, 코드 품질 검사, 테스트 자동화'
    },
    {
      category: 'advanced',
      title: 'GitHub Pages 배포',
      difficulty: 'intermediate',
      description: '정적 웹사이트를 GitHub Pages로 배포하는 방법',
      commands: [
        'Settings > Pages 메뉴 이동',
        'Source: Deploy from a branch',
        'Branch: main 선택',
        'Folder: / (root) 선택',
        'Save 버튼 클릭'
      ],
      explanation: [
        '저장소 설정 페이지 접근',
        '브랜치에서 배포 옵션 선택',
        '메인 브랜치 선택',
        '루트 폴더 선택',
        '설정 저장'
      ],
      tips: [
        'index.html 파일이 루트에 있어야 함',
        '커스텀 도메인 설정 가능',
        'HTTPS 강제 사용 권장',
        '404.html 파일로 에러 페이지 커스터마이징',
        'Jekyll 테마 사용으로 블로그 구축'
      ],
      useCase: '포트폴리오 배포, 프로젝트 데모, 문서 사이트'
    },
    {
      category: 'advanced',
      title: 'Git 고급 명령어',
      difficulty: 'advanced',
      description: '복잡한 상황에서 사용하는 고급 Git 명령어',
      commands: [
        'git rebase -i HEAD~3',
        'git stash',
        'git stash pop',
        'git cherry-pick <commit-hash>',
        'git reset --hard HEAD~1',
        'git reflog'
      ],
      explanation: [
        '최근 3개 커밋을 대화형으로 수정',
        '현재 작업을 임시 저장',
        '임시 저장된 작업 복원',
        '특정 커밋만 현재 브랜치에 적용',
        '마지막 커밋을 완전히 되돌리기',
        'Git 작업 히스토리 확인'
      ],
      tips: [
        'rebase는 공유된 브랜치에서 사용 금지',
        'stash는 여러 개 저장 가능',
        'cherry-pick은 충돌 가능성 고려',
        'reset --hard는 복구 불가능',
        'reflog로 잃어버린 커밋 복구 가능'
      ],
      useCase: '히스토리 정리, 임시 저장, 커밋 조작'
    },

    // 보안 및 관리
    {
      category: 'security',
      title: 'SSH 키 설정',
      difficulty: 'intermediate',
      description: '안전한 GitHub 연결을 위한 SSH 키 설정',
      commands: [
        'ssh-keygen -t rsa -b 4096 -C "your_email@example.com"',
        'eval "$(ssh-agent -s)"',
        'ssh-add ~/.ssh/id_rsa',
        'cat ~/.ssh/id_rsa.pub',
        'GitHub Settings > SSH and GPG keys에서 키 추가'
      ],
      explanation: [
        'RSA 4096비트 SSH 키 생성',
        'SSH 에이전트 실행',
        'SSH 키를 에이전트에 추가',
        '공개 키 내용 확인',
        'GitHub에 공개 키 등록'
      ],
      tips: [
        'passphrase 설정으로 보안 강화',
        'ssh-keygen -t ed25519 사용으로 더 안전한 키 생성',
        '정기적인 키 갱신 권장',
        'ssh -T git@github.com으로 연결 테스트',
        '여러 GitHub 계정 사용 시 config 파일 설정'
      ],
      useCase: '안전한 인증, 비밀번호 없는 로그인, 보안 강화'
    },
    {
      category: 'security',
      title: 'Repository 보안 설정',
      difficulty: 'intermediate',
      description: '저장소 보안을 강화하는 설정과 기능',
      commands: [
        'Settings > Security 메뉴 이동',
        'Dependabot alerts 활성화',
        'Code scanning 설정',
        'Secret scanning 활성화',
        'Branch protection rules 설정'
      ],
      explanation: [
        '저장소 보안 설정 접근',
        '의존성 취약점 알림 활성화',
        '코드 보안 스캔 설정',
        '민감 정보 탐지 활성화',
        '브랜치 보호 규칙 설정'
      ],
      tips: [
        '.env 파일은 절대 커밋하지 않기',
        'secrets를 사용하여 민감 정보 관리',
        'PR 리뷰 필수 설정',
        'status check 통과 후 머지',
        '정기적인 보안 감사'
      ],
      useCase: '보안 강화, 취약점 방지, 코드 품질 관리'
    },
    {
      category: 'security',
      title: 'Organizations 및 Teams',
      difficulty: 'advanced',
      description: '팀 단위 프로젝트 관리를 위한 조직 설정',
      commands: [
        'GitHub에서 New organization 생성',
        'Teams 생성 및 멤버 추가',
        'Repository 권한 설정',
        'Team discussions 활성화',
        'Organization security 정책 설정'
      ],
      explanation: [
        '새 조직 생성',
        '팀 구성 및 멤버 관리',
        '저장소별 접근 권한 설정',
        '팀 내 토론 공간 활성화',
        '조직 차원의 보안 정책 수립'
      ],
      tips: [
        'Base permissions를 Read로 설정',
        'Outside collaborators 최소화',
        'Two-factor authentication 필수 설정',
        'SAML SSO 사용으로 기업 계정 연동',
        'Audit log 정기적 확인'
      ],
      useCase: '팀 협업, 권한 관리, 기업 프로젝트'
    }
  ];

  const categories = [
    { id: 'all', name: '전체', icon: '📋' },
    { id: 'git-basics', name: 'Git 기초', icon: '🌱' },
    { id: 'github-basics', name: 'GitHub 기초', icon: '🐙' },
    { id: 'collaboration', name: '협업', icon: '👥' },
    { id: 'advanced', name: '고급 기능', icon: '🚀' },
    { id: 'security', name: '보안 & 관리', icon: '🔒' }
  ];

  const difficulties = [
    { id: 'beginner', name: '초급', color: 'bg-green-100 text-green-800' },
    { id: 'intermediate', name: '중급', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'advanced', name: '고급', color: 'bg-red-100 text-red-800' }
  ];

  const filteredFeatures = gitHubFeatures.filter(feature => {
    const matchesSearch = feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/guide" className="text-primary-600 hover:text-primary-700">
                가이드
              </Link>
              <span className="text-secondary-400">/</span>
              <span className="text-secondary-700">GitHub 사용법</span>
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl font-bold text-secondary-900 mb-4">
                🐙 GitHub 사용법
              </h1>
              <p className="text-xl text-secondary-600 mb-8">
                Git 기본부터 GitHub 고급 기능까지 완벽 마스터하여 효율적인 협업을 시작하세요
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-sm">
                  <Star className="w-4 h-4 mr-1" />
                  4.8점 (4,123개 평가)
                </Badge>
                <Badge variant="outline" className="text-sm">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {gitHubFeatures.length}개 기능
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-secondary-400" />
              <Input
                placeholder="Git/GitHub 기능 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <span>{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* GitHub Features */}
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8">
            {filteredFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl text-secondary-900">
                        {feature.title}
                      </CardTitle>
                      <Badge 
                        className={`text-xs ${difficulties.find(d => d.id === feature.difficulty)?.color}`}
                      >
                        {difficulties.find(d => d.id === feature.difficulty)?.name}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.id === feature.category)?.icon}
                      </Badge>
                      <GitBranch className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>
                  <p className="text-secondary-600 mb-2">{feature.description}</p>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {feature.useCase}
                  </Badge>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="commands" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="commands">명령어</TabsTrigger>
                      <TabsTrigger value="explanation">설명</TabsTrigger>
                      <TabsTrigger value="tips">팁</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="commands" className="mt-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-secondary-700">
                            💻 명령어/단계:
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(feature.commands.join('\n'))}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {feature.commands.map((command, i) => (
                            <div key={i} className="bg-black text-green-400 p-3 rounded font-mono text-sm">
                              <span className="text-gray-400">$ </span>
                              {command}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="explanation" className="mt-4">
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-secondary-700 mb-3">
                          📖 단계별 설명:
                        </h4>
                        <div className="space-y-2">
                          {feature.explanation.map((exp, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                {i + 1}
                              </div>
                              <p className="text-sm text-secondary-700 pt-1">{exp}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tips" className="mt-4">
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-secondary-700 mb-3">
                          💡 실무 팁:
                        </h4>
                        <div className="space-y-2">
                          {feature.tips.map((tip, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-primary-500 text-sm">•</span>
                              <p className="text-sm text-secondary-700">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredFeatures.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-secondary-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-secondary-600 mb-4">
              다른 검색어나 카테고리를 시도해보세요
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              variant="outline"
            >
              전체 기능 보기
            </Button>
          </div>
        )}

        {/* Git Workflow */}
        <section className="mt-16 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">🔄 Git 워크플로우</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-primary-900">1. 작업 시작</h3>
                    <p className="text-sm text-primary-700">git pull origin main</p>
                  </div>
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">1</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-blue-900">2. 브랜치 생성</h3>
                    <p className="text-sm text-blue-700">git checkout -b feature/new-feature</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">2</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-green-900">3. 작업 완료</h3>
                    <p className="text-sm text-green-700">git add . && git commit -m &quot;Add new feature&quot;</p>
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">3</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-yellow-900">4. 원격 업로드</h3>
                    <p className="text-sm text-yellow-700">git push origin feature/new-feature</p>
                  </div>
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">4</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-purple-900">5. Pull Request</h3>
                    <p className="text-sm text-purple-700">GitHub에서 PR 생성 및 리뷰</p>
                  </div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">5</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices */}
        <section className="mt-12 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">🎯 GitHub 모범 사례</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-3">✅ 좋은 습관</h3>
                  <ul className="space-y-2 text-sm text-secondary-600">
                    <li>• 의미 있는 커밋 메시지 작성</li>
                    <li>• 작은 단위로 자주 커밋</li>
                    <li>• 브랜치 이름을 명확하게 설정</li>
                    <li>• Pull Request에 상세한 설명 포함</li>
                    <li>• 코드 리뷰 적극 참여</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-3">❌ 피해야 할 실수</h3>
                  <ul className="space-y-2 text-sm text-secondary-600">
                    <li>• 민감한 정보 커밋</li>
                    <li>• 너무 큰 단위의 커밋</li>
                    <li>• main 브랜치에 직접 푸시</li>
                    <li>• 충돌 해결 시 신중하지 않은 처리</li>
                    <li>• 테스트 없이 코드 머지</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Command Reference */}
        <section className="mt-12 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>⚡ 자주 사용하는 명령어</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-3">기본 명령어</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>상태 확인</span>
                      <code className="bg-secondary-100 px-2 py-1 rounded">git status</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>스테이징</span>
                      <code className="bg-secondary-100 px-2 py-1 rounded">git add .</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>커밋</span>
                      <code className="bg-secondary-100 px-2 py-1 rounded">git commit -m</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>히스토리</span>
                      <code className="bg-secondary-100 px-2 py-1 rounded">git log</code>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-3">브랜치 & 원격</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>브랜치 생성</span>
                      <code className="bg-secondary-100 px-2 py-1 rounded">git checkout -b</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>원격 푸시</span>
                      <code className="bg-secondary-100 px-2 py-1 rounded">git push</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>원격 가져오기</span>
                      <code className="bg-secondary-100 px-2 py-1 rounded">git pull</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>브랜치 병합</span>
                      <code className="bg-secondary-100 px-2 py-1 rounded">git merge</code>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Links */}
        <section className="mt-12 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>📚 관련 가이드</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" asChild className="justify-start h-auto p-4">
                  <Link href="/guide/cursor">
                    <div>
                      <div className="font-medium">Cursor 사용법</div>
                      <div className="text-sm text-secondary-600">AI 코드 에디터 활용</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="justify-start h-auto p-4">
                  <Link href="/guide/vercel">
                    <div>
                      <div className="font-medium">Vercel 배포</div>
                      <div className="text-sm text-secondary-600">GitHub 연동 배포</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="justify-start h-auto p-4">
                  <Link href="/guide/terminal">
                    <div>
                      <div className="font-medium">터미널 명령어</div>
                      <div className="text-sm text-secondary-600">Git 명령어 활용</div>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default GitHubGuide; 