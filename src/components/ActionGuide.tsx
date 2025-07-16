'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  CheckCircle, 
  ExternalLink, 
  Copy, 
  Terminal,
  FileText,
  Download,
  Upload,
  Globe,
  Eye,
  Settings,
  Folder,
  Code,
  GitBranch,
  Sparkles,
  ArrowRight,
  CheckSquare,
  AlertTriangle,
  Info,
  Lightbulb,
  Circle
} from 'lucide-react';

interface ActionGuideProps {
  stepId: string;
  onActionComplete: (actionId: string) => void;
  userProgress?: {
    completedSteps: string[];
    completedActions: string[];
    currentProject?: string;
    githubConnected?: boolean;
  };
}

interface ActionItem {
  id: string;
  title: string;
  description: string;
  type: 'command' | 'download' | 'browser' | 'check' | 'input' | 'expandable';
  action?: string;
  url?: string;
  command?: string;
  validation?: string;
  tips?: string[];
  expandedContent?: {
    title: string;
    steps?: string[];
    commands?: {
      title: string;
      command: string;
      description: string;
    }[];
    apis?: {
      name: string;
      description: string;
      steps: string[];
      url: string;
      pricing: string;
      features: string[];
    }[];
  };
}

const ActionGuide: React.FC<ActionGuideProps> = ({ 
  stepId, 
  onActionComplete, 
  userProgress = { completedSteps: [], completedActions: [], githubConnected: false }
}) => {
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [completedActions, setCompletedActions] = useState<string[]>(userProgress.completedActions || []);
  const [userInputs, setUserInputs] = useState<{[key: string]: string}>({});
  const [showTips, setShowTips] = useState<{[key: string]: boolean}>({});
  const [expandedActions, setExpandedActions] = useState<{[key: string]: boolean}>({});

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleActionComplete = (actionId: string) => {
    if (!completedActions.includes(actionId)) {
      const newCompletedActions = [...completedActions, actionId];
      setCompletedActions(newCompletedActions);
      onActionComplete(actionId);
    }
  };

  const getActionsForStep = (stepId: string): ActionItem[] => {
    const actionSets = {
      'setup': [
        {
          id: 'download-nodejs',
          title: 'Node.js 다운로드 및 설치',
          description: 'Node.js 공식 사이트에서 LTS 버전을 다운로드하고 설치하세요',
          type: 'browser' as const,
          url: 'https://nodejs.org/ko/',
          validation: 'node --version',
          tips: [
            'LTS(Long Term Support) 버전을 선택하세요',
            '설치 과정에서 모든 옵션을 기본값으로 두세요',
            '설치 완료 후 터미널을 재시작하세요'
          ]
        },
        {
          id: 'download-cursor',
          title: 'Cursor IDE 다운로드 및 설치',
          description: 'Cursor AI 통합 개발 환경을 다운로드하고 설치하세요',
          type: 'browser' as const,
          url: 'https://cursor.com/?from=home',
          tips: [
            'Cursor는 VS Code 기반의 AI 통합 IDE입니다',
            '설치 후 GitHub 계정으로 로그인하세요',
            'AI 기능을 사용하려면 계정 등록이 필요합니다'
          ]
        },
        {
          id: 'download-claude',
          title: 'Claude Desktop 다운로드 및 설치',
          description: 'Claude AI 데스크톱 앱을 다운로드하고 설치하세요',
          type: 'browser' as const,
          url: 'https://www.anthropic.com/claude',
          tips: [
            'Claude Desktop은 Anthropic의 AI 어시스턴트입니다',
            '개발 중 코드 리뷰, 문서 작성, 문제 해결에 도움이 됩니다',
            '설치 후 Anthropic 계정으로 로그인하세요'
          ]
        },
        {
          id: 'verify-installation',
          title: '설치 확인',
          description: 'Node.js와 npm이 올바르게 설치되었는지 확인하세요',
          type: 'command' as const,
          command: 'node --version && npm --version',
          tips: [
            '두 명령어 모두 버전 번호가 출력되어야 합니다',
            'Node.js v18 이상을 권장합니다',
            '오류가 발생하면 시스템을 재시작해보세요'
          ]
        },
        {
          id: 'create-project-folder',
          title: '프로젝트 폴더 생성',
          description: '신승반점 프로젝트를 위한 폴더를 생성하세요',
          type: 'command' as const,
          command: 'mkdir shinseung-restaurant && cd shinseung-restaurant',
          tips: [
            '폴더 이름은 영문과 하이픈만 사용하세요',
            '바탕화면이나 Documents 폴더에 생성하세요',
            '생성된 폴더를 Cursor로 열어보세요'
          ]
        },
        {
          id: 'open-cursor',
          title: 'Cursor에서 프로젝트 열기',
          description: '생성한 프로젝트 폴더를 Cursor IDE로 열어보세요',
          type: 'check' as const,
          tips: [
            'Cursor 실행 후 "Open Folder" 클릭',
            '또는 터미널에서 "cursor ." 명령어 사용',
            '폴더 구조가 왼쪽 패널에 표시되어야 합니다'
          ]
        },
        {
          id: 'install-claude-desktop',
          title: 'Claude Desktop 설치 확인',
          description: 'Claude Desktop이 정상적으로 설치되었는지 확인하세요',
          type: 'check' as const,
          tips: [
            '시작 메뉴에서 "Claude"를 검색하여 실행',
            'Anthropic 계정으로 로그인',
            '바탕화면에 Claude 바로가기 아이콘 확인'
          ]
        },
        {
          id: 'easynext-cli-setup',
          title: 'EasyNext CLI 도구 설정',
          description: 'EasyNext CLI 도구를 설정하여 빠르게 프로젝트를 생성하세요',
          type: 'expandable' as const,
          tips: [
            '한 번의 명령어로 완전한 프로젝트 생성',
            '랜딩페이지, 포트폴리오, 블로그 템플릿 제공',
            '자동으로 의존성 설치 및 설정 완료'
          ],
          expandedContent: {
            title: 'EasyNext CLI 도구 사용법',
            steps: [
              '1. 터미널에서 프로젝트 폴더로 이동',
              '2. CLI 도구 사용 방법:',
              '   - 랜딩페이지 생성: easynext create landingpage my-landing',
              '   - 포트폴리오 생성: easynext create portfolio my-portfolio',
              '   - 블로그 생성: easynext create blog my-blog',
              '3. 생성된 프로젝트 폴더로 이동: cd [프로젝트명]',
              '4. 개발 서버 실행: npm run dev',
              '5. 브라우저에서 http://localhost:3000 확인'
            ],
            commands: [
              {
                title: '랜딩페이지 생성',
                command: 'easynext create landingpage my-landing',
                description: '현대적인 랜딩페이지 템플릿 생성'
              },
              {
                title: '포트폴리오 생성',
                command: 'easynext create portfolio my-portfolio',
                description: '개인 포트폴리오 사이트 템플릿 생성'
              },
              {
                title: '블로그 생성',
                command: 'easynext create blog my-blog',
                description: '블로그 사이트 템플릿 생성'
              }
            ]
          }
        },
        {
          id: 'setup-ai-apis',
          title: 'AI API 설정 (선택사항)',
          description: 'Cursor와 Claude에서 사용할 AI API를 설정하세요',
          type: 'expandable' as const,
          tips: [
            '더 강력한 AI 모델 사용 가능',
            '무료 사용량 제한 해제',
            '개인 API 키로 더 안전한 사용'
          ],
          expandedContent: {
            title: 'AI API 설정 가이드',
            apis: [
              {
                name: 'ChatGPT (OpenAI)',
                description: 'OpenAI의 GPT 모델 사용',
                steps: [
                  '1. OpenAI 웹사이트 방문: https://platform.openai.com/api-keys',
                  '2. "Create new secret key" 클릭',
                  '3. API 키 복사 후 안전한 곳에 보관',
                  '4. Cursor Settings → AI → OpenAI API Key 입력'
                ],
                url: 'https://platform.openai.com/api-keys',
                pricing: '$0.03/1K tokens부터 시작',
                features: ['GPT-4o', 'GPT-4o mini', '코딩 최적화']
              },
              {
                name: 'Claude (Anthropic)',
                description: 'Anthropic의 Claude 모델 사용',
                steps: [
                  '1. Anthropic 콘솔 방문: https://console.anthropic.com/',
                  '2. "Get API Keys" 클릭',
                  '3. API 키 생성 후 복사',
                  '4. Cursor Settings → AI → Anthropic API Key 입력'
                ],
                url: 'https://console.anthropic.com/',
                pricing: '$0.25/1K tokens부터 시작',
                features: ['Claude 3.5 Sonnet', 'Claude 3 Haiku', '긴 컨텍스트 처리']
              },
              {
                name: 'Gemini (Google)',
                description: 'Google의 Gemini 모델 사용',
                steps: [
                  '1. Google AI Studio 방문: https://aistudio.google.com/app/apikey',
                  '2. "Create API Key" 클릭',
                  '3. API 키 생성 후 복사',
                  '4. Cursor Settings → AI → Google API Key 입력'
                ],
                url: 'https://aistudio.google.com/app/apikey',
                pricing: '무료 사용량 제공 후 유료',
                features: ['Gemini Pro', 'Gemini Flash', '멀티모달 지원']
              }
            ]
          }
        }
      ],
      'html': [
        {
          id: 'create-html-file',
          title: 'index.html 파일 생성',
          description: 'Cursor에서 새 파일을 생성하고 index.html로 저장하세요',
          type: 'check' as const,
          tips: [
            'Cursor에서 Ctrl+N (새 파일)',
            'Ctrl+S로 저장하고 "index.html"로 이름 지정',
            '파일 아이콘이 HTML 아이콘으로 변경됩니다'
          ]
        },
        {
          id: 'html-basic-structure',
          title: 'HTML 기본 구조 작성',
          description: 'HTML5 기본 구조를 작성하세요',
          type: 'command' as const,
          command: `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>신승반점 - 인천 차이나타운 맛집</title>
</head>
<body>
    <h1>신승반점</h1>
    <p>인천 차이나타운 대표 맛집</p>
</body>
</html>`,
          tips: [
            '위 코드를 복사하여 index.html에 붙여넣으세요',
            '한국어 사이트이므로 lang="ko"를 사용합니다',
            'viewport 메타태그는 모바일 대응을 위해 필요합니다'
          ]
        },
        {
          id: 'create-header',
          title: '헤더 섹션 생성',
          description: '웹사이트의 헤더 부분을 만들어보세요',
          type: 'command' as const,
          command: `<header>
    <nav>
        <div class="logo">
            <h1>신승반점</h1>
        </div>
        <ul class="nav-menu">
            <li><a href="#home">홈</a></li>
            <li><a href="#menu">메뉴</a></li>
            <li><a href="#about">소개</a></li>
            <li><a href="#contact">연락처</a></li>
        </ul>
    </nav>
</header>`,
          tips: [
            '이 코드를 <body> 태그 안에 추가하세요',
            'nav 태그는 네비게이션 메뉴를 나타냅니다',
            '나중에 CSS로 스타일을 꾸밀 예정입니다'
          ]
        },
        {
          id: 'create-main-content',
          title: '메인 콘텐츠 생성',
          description: '웹사이트의 주요 내용을 담을 메인 섹션을 만들어보세요',
          type: 'command' as const,
          command: `<main>
    <section id="home" class="hero">
        <h2>인천 차이나타운 대표 맛집</h2>
        <p>1970년부터 이어온 전통의 맛</p>
        <button class="cta-button">메뉴 보기</button>
    </section>
    
    <section id="menu" class="menu-section">
        <h2>대표 메뉴</h2>
        <div class="menu-grid">
            <div class="menu-item">
                <h3>짜장면</h3>
                <p>진한 춘장과 신선한 재료로 만든 전통 짜장면</p>
                <span class="price">7,000원</span>
            </div>
            <div class="menu-item">
                <h3>짬뽕</h3>
                <p>얼큰하고 시원한 국물의 해물 짬뽕</p>
                <span class="price">8,000원</span>
            </div>
            <div class="menu-item">
                <h3>탕수육</h3>
                <p>바삭한 튀김과 새콤달콤한 소스의 탕수육</p>
                <span class="price">15,000원</span>
            </div>
        </div>
    </section>
</main>`,
          tips: [
            '이 코드를 헤더 다음에 추가하세요',
            'section 태그는 페이지의 구역을 나누는 역할을 합니다',
            'id 속성은 나중에 네비게이션 링크와 연결됩니다'
          ]
        },
        {
          id: 'create-footer',
          title: '푸터 섹션 생성',
          description: '웹사이트의 푸터 부분을 만들어보세요',
          type: 'command' as const,
          command: `<footer>
    <div class="footer-content">
        <div class="contact-info">
            <h3>연락처</h3>
            <p>주소: 인천광역시 중구 차이나타운로 123</p>
            <p>전화: 032-123-4567</p>
            <p>영업시간: 11:00 - 22:00</p>
        </div>
        <div class="social-links">
            <h3>소셜 미디어</h3>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Blog</a>
        </div>
    </div>
    <p class="copyright">&copy; 2024 신승반점. All rights reserved.</p>
</footer>`,
          tips: [
            '이 코드를 main 태그 다음에 추가하세요',
            'footer 태그는 페이지의 하단 정보를 담습니다',
            '연락처 정보는 실제 정보로 바꿔도 됩니다'
          ]
        },
        {
          id: 'test-html',
          title: 'HTML 파일 테스트',
          description: '작성한 HTML 파일을 브라우저에서 열어 확인하세요',
          type: 'check' as const,
          tips: [
            'index.html 파일을 더블클릭하여 브라우저에서 열어보세요',
            '또는 브라우저에서 Ctrl+O로 파일 열기',
            '내용이 제대로 표시되는지 확인하세요'
          ]
        }
      ],
      'css': [
        {
          id: 'create-css-file',
          title: 'style.css 파일 생성',
          description: 'CSS 파일을 생성하고 HTML에 연결하세요',
          type: 'check' as const,
          tips: [
            'Cursor에서 새 파일을 생성하고 "style.css"로 저장',
            'index.html의 <head> 태그에 다음 코드 추가:',
            '<link rel="stylesheet" href="style.css">'
          ]
        },
        {
          id: 'css-reset',
          title: 'CSS 초기화 및 기본 스타일',
          description: '브라우저 기본 스타일을 초기화하고 기본 스타일을 설정하세요',
          type: 'command' as const,
          command: `/* CSS 초기화 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 기본 스타일 */
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

/* 컨테이너 스타일 */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}`,
          tips: [
            '이 코드를 style.css 파일에 추가하세요',
            'CSS 초기화는 브라우저 간 일관성을 위해 필요합니다',
            'box-sizing: border-box는 크기 계산을 쉽게 해줍니다'
          ]
        },
        {
          id: 'header-styling',
          title: '헤더 스타일링',
          description: '헤더와 네비게이션 메뉴를 스타일링하세요',
          type: 'command' as const,
          command: `/* 헤더 스타일 */
header {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.logo h1 {
    font-size: 2rem;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-menu a:hover {
    color: #ffd700;
}

/* 메인 콘텐츠 상단 여백 */
main {
    margin-top: 80px;
}`,
          tips: [
            '이 코드를 style.css에 추가하세요',
            'gradient 배경으로 중국 음식점 느낌을 표현했습니다',
            'fixed position으로 헤더가 스크롤해도 고정됩니다'
          ]
        },
        {
          id: 'hero-section-styling',
          title: '히어로 섹션 스타일링',
          description: '메인 히어로 섹션을 스타일링하세요',
          type: 'command' as const,
          command: `.hero {
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200') center/cover;
    color: white;
    text-align: center;
    padding: 8rem 0 4rem;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.hero h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.cta-button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255,107,107,0.3);
}

.cta-button:hover {
    background: #ee5a24;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255,107,107,0.4);
}`,
          tips: [
            '히어로 섹션은 방문자의 첫 인상을 결정합니다',
            'Unsplash의 무료 이미지를 배경으로 사용했습니다',
            'text-shadow로 텍스트 가독성을 높였습니다'
          ]
        },
        {
          id: 'menu-section-styling',
          title: '메뉴 섹션 스타일링',
          description: '메뉴 섹션을 그리드 레이아웃으로 스타일링하세요',
          type: 'command' as const,
          command: `.menu-section {
    padding: 4rem 0;
    background: white;
    max-width: 1200px;
    margin: 0 auto;
}

.menu-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #333;
}

.menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 0 20px;
}

.menu-item {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #e9ecef;
}

.menu-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.menu-item h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ff6b6b;
}

.menu-item p {
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.6;
}

.price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #ee5a24;
    background: #fff3cd;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    display: inline-block;
}`,
          tips: [
            'Grid 레이아웃으로 반응형 메뉴판을 만들었습니다',
            'hover 효과로 사용자 경험을 향상시켰습니다',
            'auto-fit과 minmax로 자동 반응형 그리드를 구현했습니다'
          ]
        },
        {
          id: 'footer-styling',
          title: '푸터 스타일링',
          description: '푸터 섹션을 스타일링하세요',
          type: 'command' as const,
          command: `footer {
    background: #2c3e50;
    color: white;
    padding: 3rem 0 1rem;
    margin-top: 4rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.contact-info h3, .social-links h3 {
    margin-bottom: 1rem;
    color: #ff6b6b;
}

.contact-info p {
    margin-bottom: 0.5rem;
    color: #bdc3c7;
}

.social-links a {
    color: #bdc3c7;
    text-decoration: none;
    display: block;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
}

.social-links a:hover {
    color: #ff6b6b;
}

.copyright {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #34495e;
    color: #95a5a6;
    font-size: 0.9rem;
}`,
          tips: [
            '어두운 배경으로 전문적인 느낌을 연출했습니다',
            'Grid 레이아웃으로 반응형 푸터를 만들었습니다',
            'hover 효과로 링크의 상호작용을 표현했습니다'
          ]
        },
        {
          id: 'responsive-design',
          title: '반응형 디자인 적용',
          description: '모바일 기기에서도 잘 보이도록 미디어 쿼리를 추가하세요',
          type: 'command' as const,
          command: `/* 반응형 디자인 */
@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .hero {
        padding: 6rem 0 3rem;
    }
    
    .hero h2 {
        font-size: 2rem;
    }
    
    .menu-grid {
        grid-template-columns: 1fr;
    }
    
    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
}

@media (max-width: 480px) {
    .hero h2 {
        font-size: 1.5rem;
    }
    
    .menu-section h2 {
        font-size: 2rem;
    }
    
    .menu-item {
        padding: 1.5rem;
    }
}`,
          tips: [
            '768px 이하에서는 태블릿 스타일을 적용합니다',
            '480px 이하에서는 모바일 스타일을 적용합니다',
            '폰트 크기와 여백을 작은 화면에 맞게 조정했습니다'
          ]
        }
      ],
      'javascript': [
        {
          id: 'create-js-file',
          title: 'script.js 파일 생성',
          description: 'JavaScript 파일을 생성하고 HTML에 연결하세요',
          type: 'check' as const,
          tips: [
            'Cursor에서 새 파일을 생성하고 "script.js"로 저장',
            'index.html의 </body> 태그 바로 위에 다음 코드 추가:',
            '<script src="script.js"></script>'
          ]
        },
        {
          id: 'smooth-scrolling',
          title: '부드러운 스크롤 기능',
          description: '네비게이션 메뉴 클릭 시 부드럽게 스크롤되도록 만들어보세요',
          type: 'command' as const,
          command: `// 부드러운 스크롤 기능
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});`,
          tips: [
            'DOMContentLoaded 이벤트로 페이지 로드 완료 후 실행',
            'scrollIntoView API를 사용해 부드러운 스크롤 구현',
            'preventDefault()로 기본 링크 동작을 막습니다'
          ]
        },
        {
          id: 'menu-interaction',
          title: '메뉴 상호작용 기능',
          description: '메뉴 아이템에 클릭 시 상세 정보를 표시하는 기능을 추가하세요',
          type: 'command' as const,
          command: `// 메뉴 상호작용 기능
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        const menuName = this.querySelector('h3').textContent;
        const menuDescription = this.querySelector('p').textContent;
        const price = this.querySelector('.price').textContent;
        
        alert(\`\${menuName}\\n\\n\${menuDescription}\\n\\n가격: \${price}\`);
    });
    
    // 호버 효과 강화
    item.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
        this.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px)';
    });
});`,
          tips: [
            'forEach로 모든 메뉴 아이템에 이벤트 리스너 추가',
            'querySelector로 필요한 정보를 추출',
            'mouseenter/mouseleave로 향상된 호버 효과 구현'
          ]
        },
        {
          id: 'contact-form',
          title: '연락처 폼 추가',
          description: '연락처 섹션에 예약 폼을 추가하고 JavaScript로 처리하세요',
          type: 'command' as const,
          command: `// 먼저 HTML에 연락처 폼을 추가하세요 (index.html의 main 태그 안에)
/*
<section id="contact" class="contact-section">
    <h2>예약 문의</h2>
    <form id="reservationForm">
        <input type="text" id="name" placeholder="이름" required>
        <input type="tel" id="phone" placeholder="전화번호" required>
        <input type="date" id="date" required>
        <select id="people" required>
            <option value="">인원 선택</option>
            <option value="2">2명</option>
            <option value="4">4명</option>
            <option value="6">6명</option>
            <option value="8">8명</option>
        </select>
        <textarea id="message" placeholder="요청사항" rows="4"></textarea>
        <button type="submit">예약 신청</button>
    </form>
</section>
*/

// JavaScript 폼 처리
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                date: document.getElementById('date').value,
                people: document.getElementById('people').value,
                message: document.getElementById('message').value
            };
            
            // 간단한 유효성 검사
            if (!formData.name || !formData.phone || !formData.date || !formData.people) {
                alert('모든 필수 항목을 입력해주세요.');
                return;
            }
            
            // 예약 정보 확인
            const confirmMessage = \`예약 정보를 확인해주세요:
            
이름: \${formData.name}
전화번호: \${formData.phone}
날짜: \${formData.date}
인원: \${formData.people}명
요청사항: \${formData.message || '없음'}

예약을 신청하시겠습니까?\`;
            
            if (confirm(confirmMessage)) {
                alert('예약 신청이 완료되었습니다. 확인 후 연락드리겠습니다.');
                form.reset();
            }
        });
    }
});`,
          tips: [
            'HTML 폼을 먼저 추가한 후 JavaScript를 작성하세요',
            'preventDefault()로 폼 기본 제출 동작을 막습니다',
            'confirm()으로 사용자 확인을 받습니다'
          ]
        },
        {
          id: 'scroll-effects',
          title: '스크롤 효과 추가',
          description: '스크롤 시 요소가 나타나는 애니메이션 효과를 추가하세요',
          type: 'command' as const,
          command: `// 스크롤 애니메이션 효과
function animateOnScroll() {
    const elements = document.querySelectorAll('.menu-item, .contact-section');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 초기 스타일 설정
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.menu-item, .contact-section');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', animateOnScroll);
    
    // 초기 실행
    animateOnScroll();
});`,
          tips: [
            'getBoundingClientRect()로 요소의 위치를 감지합니다',
            'opacity와 transform으로 나타나는 효과를 구현',
            'transition으로 부드러운 애니메이션 적용'
          ]
        },
        {
          id: 'mobile-menu',
          title: '모바일 메뉴 기능',
          description: '모바일에서 햄버거 메뉴를 추가하고 토글 기능을 구현하세요',
          type: 'command' as const,
          command: `// 먼저 HTML에 햄버거 메뉴 버튼을 추가하세요 (nav 태그 안에)
/*
<button class="mobile-menu-toggle" id="mobileMenuToggle">
    <span></span>
    <span></span>
    <span></span>
</button>
*/

// CSS에 모바일 메뉴 스타일 추가
/*
.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}

.mobile-menu-toggle span {
    width: 25px;
    height: 3px;
    background: white;
    margin: 3px 0;
    transition: 0.3s;
}

@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: flex;
    }
    
    .nav-menu {
        position: fixed;
        top: 80px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 80px);
        background: #ff6b6b;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        transition: left 0.3s ease;
        padding-top: 2rem;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-menu li {
        margin: 1rem 0;
    }
}
*/

// JavaScript 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // 햄버거 메뉴 애니메이션
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // 메뉴 항목 클릭 시 메뉴 닫기
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                
                // 햄버거 메뉴 원래 상태로
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});`,
          tips: [
            'HTML과 CSS를 먼저 추가한 후 JavaScript를 작성하세요',
            'classList.toggle()로 클래스 추가/제거를 쉽게 처리',
            'transform으로 햄버거 메뉴 애니메이션 구현'
          ]
        }
      ],
      'deploy': [
        {
          id: 'github-account',
          title: 'GitHub 계정 생성',
          description: 'GitHub 계정을 생성하고 로그인하세요',
          type: 'browser' as const,
          url: 'https://github.com/signup',
          tips: [
            'GitHub은 코드 저장소 서비스입니다',
            '무료 계정으로 충분합니다',
            '사용자명을 신중하게 선택하세요'
          ]
        },
        {
          id: 'git-init',
          title: 'Git 저장소 초기화',
          description: '프로젝트 폴더에서 Git 저장소를 초기화하세요',
          type: 'command' as const,
          command: 'git init',
          tips: [
            '프로젝트 폴더에서 터미널을 열고 실행하세요',
            '.git 폴더가 생성되면 성공입니다',
            'git status로 상태를 확인할 수 있습니다'
          ]
        },
        {
          id: 'create-gitignore',
          title: '.gitignore 파일 생성',
          description: '불필요한 파일들을 Git에서 제외하기 위한 .gitignore 파일을 생성하세요',
          type: 'command' as const,
          command: `# .gitignore 파일 내용
.DS_Store
Thumbs.db
*.log
node_modules/
.env
.vscode/
dist/
build/`,
          tips: [
            '프로젝트 루트에 .gitignore 파일을 생성하세요',
            '운영체제별 불필요한 파일들을 제외합니다',
            'node_modules 폴더는 반드시 제외해야 합니다'
          ]
        },
        {
          id: 'git-add-commit',
          title: '파일 추가 및 첫 커밋',
          description: '프로젝트 파일들을 Git에 추가하고 첫 커밋을 만드세요',
          type: 'command' as const,
          command: `git add .
git commit -m "신승반점 웹사이트 초기 버전 완성"`,
          tips: [
            'git add .는 모든 파일을 추가합니다',
            'git status로 추가된 파일을 확인하세요',
            '커밋 메시지는 한글로 작성해도 됩니다'
          ]
        },
        {
          id: 'github-repo-create',
          title: 'GitHub 저장소 생성',
          description: 'GitHub에서 새 저장소를 생성하세요',
          type: 'browser' as const,
          url: 'https://github.com/new',
          tips: [
            '저장소 이름을 "shinseung-restaurant"로 설정하세요',
            'Public 저장소로 설정하세요',
            'README.md는 체크하지 마세요 (이미 있으니까)'
          ]
        },
        {
          id: 'git-remote-push',
          title: '원격 저장소 연결 및 푸시',
          description: '로컬 저장소를 GitHub 원격 저장소와 연결하고 코드를 업로드하세요',
          type: 'command' as const,
          command: `git remote add origin https://github.com/YOUR_USERNAME/shinseung-restaurant.git
git branch -M main
git push -u origin main`,
          tips: [
            'YOUR_USERNAME을 실제 GitHub 사용자명으로 바꾸세요',
            'GitHub 페이지에서 정확한 URL을 복사하세요',
            '처음 푸시시 GitHub 로그인이 필요할 수 있습니다'
          ]
        },
        {
          id: 'vercel-signup',
          title: 'Vercel 계정 생성',
          description: 'Vercel에서 계정을 생성하고 GitHub과 연결하세요',
          type: 'browser' as const,
          url: 'https://vercel.com/signup',
          tips: [
            'GitHub 계정으로 로그인하는 것이 편리합니다',
            'Vercel은 무료 배포 서비스입니다',
            'GitHub 저장소와 자동으로 연결됩니다'
          ]
        },
        {
          id: 'vercel-deploy',
          title: 'Vercel 배포',
          description: 'Vercel에서 프로젝트를 배포하세요',
          type: 'browser' as const,
          url: 'https://vercel.com/new',
          tips: [
            '"Import Git Repository"를 클릭하세요',
            '방금 생성한 저장소를 선택하세요',
            'Deploy 버튼을 클릭하면 자동으로 배포됩니다'
          ]
        },
        {
          id: 'test-deployment',
          title: '배포 테스트',
          description: '배포된 웹사이트가 정상적으로 작동하는지 확인하세요',
          type: 'input' as const,
          tips: [
            'Vercel에서 제공하는 URL을 확인하세요',
            '모든 기능이 정상적으로 작동하는지 테스트하세요',
            'URL을 다른 사람과 공유해보세요'
          ]
        },
        {
          id: 'domain-setup',
          title: '도메인 설정 (선택사항)',
          description: '원한다면 커스텀 도메인을 설정할 수 있습니다',
          type: 'check' as const,
          tips: [
            'Vercel 대시보드에서 도메인을 추가할 수 있습니다',
            '무료 도메인이나 구매한 도메인을 사용할 수 있습니다',
            'DNS 설정이 필요할 수 있습니다'
          ]
        }
      ]
    };

    return actionSets[stepId] || [];
  };

  const actions = getActionsForStep(stepId);
  const currentAction = actions[currentActionIndex];

  const renderActionContent = (action: ActionItem) => {
    switch (action.type) {
      case 'command':
        return (
          <div className="space-y-4">
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
              <pre className="whitespace-pre-wrap">{action.command}</pre>
            </div>
            <Button
              onClick={() => copyToClipboard(action.command!)}
              variant="outline"
              className="w-full"
            >
              <Copy className="w-4 h-4 mr-2" />
              코드 복사
            </Button>
            {action.validation && (
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertDescription>
                  확인: <code>{action.validation}</code>
                </AlertDescription>
              </Alert>
            )}
          </div>
        );
      
      case 'browser':
        return (
          <div className="space-y-4">
            <Button
              onClick={() => window.open(action.url, '_blank')}
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {action.url?.includes('github') ? 'GitHub' : 
               action.url?.includes('nodejs.org') ? 'Node.js' :
               action.url?.includes('cursor.com') ? 'Cursor' :
               action.url?.includes('anthropic.com') ? 'Claude' : 'Vercel'} 열기
            </Button>
            <Alert>
              <Globe className="h-4 w-4" />
              <AlertDescription>
                새 창에서 열리는 페이지에서 진행하세요
              </AlertDescription>
            </Alert>
          </div>
        );
      
      case 'input':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="deployment-url">배포된 웹사이트 URL</Label>
              <Input
                id="deployment-url"
                value={userInputs['deployment-url'] || ''}
                onChange={(e) => setUserInputs(prev => ({ ...prev, 'deployment-url': e.target.value }))}
                placeholder="https://your-site.vercel.app"
                className="mt-1"
              />
            </div>
            {userInputs['deployment-url'] && (
              <Button
                onClick={() => window.open(userInputs['deployment-url'], '_blank')}
                variant="outline"
                className="w-full"
              >
                <Eye className="w-4 h-4 mr-2" />
                웹사이트 확인
              </Button>
            )}
          </div>
        );
      
      case 'check':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`action-${action.id}`}
                checked={completedActions.includes(action.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleActionComplete(action.id);
                  }
                }}
              />
              <Label htmlFor={`action-${action.id}`}>
                이 단계를 완료했습니다
              </Label>
            </div>
          </div>
        );
      
      case 'expandable':
        return (
          <div className="space-y-4">
            <Button
              onClick={() => setExpandedActions(prev => ({ ...prev, [action.id]: !prev[action.id] }))}
              variant="outline"
              className="w-full"
            >
              {expandedActions[action.id] ? (
                <>
                  <ArrowRight className="w-4 h-4 mr-2 rotate-90" />
                  접기
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {action.id === 'easynext-cli-setup' ? 'CLI 도구 사용법 보기' : 'AI API 설정 가이드 보기'}
                </>
              )}
            </Button>
            
            {expandedActions[action.id] && action.expandedContent && (
              <div className="space-y-6 mt-4">
                <h3 className="text-lg font-semibold">{action.expandedContent?.title}</h3>
                
                {/* CLI 도구 사용법 */}
                {action.id === 'easynext-cli-setup' && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">사용 단계:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        {action.expandedContent?.steps?.map((step, index) => (
                          <li key={index} className="text-gray-700">{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="grid gap-4">
                      <h4 className="font-medium">명령어 예시:</h4>
                      {action.expandedContent?.commands?.map((cmd, index) => (
                        <Card key={index} className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h5 className="font-semibold">{cmd.title}</h5>
                              <Button
                                onClick={() => navigator.clipboard.writeText(cmd.command)}
                                variant="outline"
                                size="sm"
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                복사
                              </Button>
                            </div>
                            <p className="text-sm text-gray-600">{cmd.description}</p>
                            <div className="bg-gray-100 p-2 rounded font-mono text-sm">
                              {cmd.command}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* AI API 설정 가이드 */}
                {action.id === 'setup-ai-apis' && (
                  <div className="grid gap-6">
                    {action.expandedContent?.apis?.map((api, index) => (
                      <Card key={index} className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-lg">{api.name}</h4>
                              <p className="text-sm text-gray-600">{api.description}</p>
                            </div>
                            <Button
                              onClick={() => window.open(api.url, '_blank')}
                              variant="outline"
                              size="sm"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              API 키 받기
                            </Button>
                          </div>
                          
                          <div className="space-y-2">
                            <h5 className="font-medium text-sm">설정 단계:</h5>
                            <ol className="list-decimal list-inside space-y-1 text-sm">
                              {api.steps?.map((step, stepIndex) => (
                                <li key={stepIndex} className="text-gray-700">{step}</li>
                              ))}
                            </ol>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              가격: {api.pricing}
                            </Badge>
                            {api.features?.map((feature, featureIndex) => (
                              <Badge key={featureIndex} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox
                    id={`action-${action.id}-expanded`}
                    checked={completedActions.includes(action.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleActionComplete(action.id);
                      }
                    }}
                  />
                  <Label htmlFor={`action-${action.id}-expanded`}>
                    AI API 설정을 완료했습니다 (선택사항)
                  </Label>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5 text-primary-500" />
            실습 가이드: {stepId.toUpperCase()}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {currentActionIndex + 1} / {actions.length}
            </Badge>
            <Badge variant="secondary">
              {Math.round(((currentActionIndex + 1) / actions.length) * 100)}% 완료
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {currentAction && (
            <div className="space-y-6">
              {/* 현재 액션 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {currentActionIndex + 1}
                    </div>
                    {currentAction.title}
                  </CardTitle>
                  <p className="text-gray-600">{currentAction.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {renderActionContent(currentAction)}
                  
                  {/* 팁 섹션 */}
                  {currentAction.tips && (
                    <div className="space-y-2">
                      <Button
                        onClick={() => setShowTips(prev => ({ ...prev, [currentAction.id]: !prev[currentAction.id] }))}
                        variant="outline"
                        size="sm"
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        {showTips[currentAction.id] ? '팁 숨기기' : '팁 보기'}
                      </Button>
                      
                      {showTips[currentAction.id] && (
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            <ul className="list-disc list-inside space-y-1">
                              {currentAction.tips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 네비게이션 */}
              <div className="flex justify-between">
                <Button
                  onClick={() => setCurrentActionIndex(Math.max(0, currentActionIndex - 1))}
                  disabled={currentActionIndex === 0}
                  variant="outline"
                >
                  이전 단계
                </Button>
                <Button
                  onClick={() => {
                    if (currentActionIndex < actions.length - 1) {
                      setCurrentActionIndex(currentActionIndex + 1);
                    }
                  }}
                  disabled={currentActionIndex >= actions.length - 1}
                  className="flex items-center gap-2"
                >
                  다음 단계
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* 진행 상황 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">진행 상황</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">완료된 단계</span>
                      <span className="text-sm text-gray-600">
                        {completedActions.filter(id => actions.some(a => a.id === id)).length} / {actions.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {actions.map((action, index) => (
                        <div key={action.id} className="flex items-center gap-2">
                          {completedActions.includes(action.id) ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : index === currentActionIndex ? (
                            <Play className="w-4 h-4 text-blue-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400" />
                          )}
                          <span className={`text-sm ${
                            completedActions.includes(action.id) ? 'text-green-600' :
                            index === currentActionIndex ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {action.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionGuide; 