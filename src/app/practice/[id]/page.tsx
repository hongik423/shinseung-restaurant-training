'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  Play, 
  Code, 
  BookOpen, 
  Download,
  ArrowLeft,
  Target,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const PracticeDetailPage = () => {
  const params = useParams();
  const projectId = params.id as string;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const projects = [
    {
      id: '1',
      title: '🍜 신승반점 랜딩페이지',
      description: '인천 차이나타운의 전통 중식당 랜딩페이지를 만들어보세요. HTML, CSS, JavaScript의 기본기를 모두 익힐 수 있습니다.',
      level: 'beginner',
      duration: '3시간',
      difficulty: 1,
      participants: 1234,
      rating: 4.9,
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: 'https://picsum.photos/800/400?random=1',
      skills: ['웹 기초', '레이아웃', '반응형 디자인'],
      objectives: [
        'HTML의 기본 구조와 시맨틱 태그 활용',
        'CSS를 이용한 스타일링과 레이아웃 구성',
        'JavaScript로 인터랙티브 기능 구현',
        '반응형 디자인 적용'
      ],
      steps: [
        {
          id: 1,
          title: '프로젝트 설정 및 기본 구조',
          description: '프로젝트 폴더를 생성하고 기본 HTML 구조를 만들어보세요.',
          content: `
# 1단계: 프로젝트 설정

## 🎯 목표
- 프로젝트 폴더 구조 생성
- 기본 HTML 파일 작성
- 프로젝트 초기 설정 완료

## 📝 실습 내용

### 1. 프로젝트 폴더 생성
\`\`\`bash
mkdir shinseung-restaurant
cd shinseung-restaurant
\`\`\`

### 2. 기본 파일 생성
\`\`\`bash
touch index.html
touch style.css
touch script.js
\`\`\`

### 3. HTML 기본 구조 작성
\`\`\`html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>신승반점 - 인천 차이나타운 전통 중식당</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
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
    </header>
    
    <main>
        <section id="home" class="hero">
            <h2>인천 차이나타운의 전통 맛</h2>
            <p>3대째 이어온 전통 중식당의 진짜 맛을 경험해보세요</p>
            <button class="cta-button">메뉴 보기</button>
        </section>
    </main>
    
    <script src="script.js"></script>
</body>
</html>
\`\`\`
          `,
          estimatedTime: '30분',
          resources: [
            { type: 'video', title: 'HTML 기본 구조 설명', url: '#' },
            { type: 'doc', title: 'HTML 태그 참고서', url: '#' }
          ]
        },
        {
          id: 2,
          title: 'CSS 스타일링 기초',
          description: 'CSS를 이용해 기본적인 스타일링을 적용해보세요.',
          content: `
# 2단계: CSS 스타일링 기초

## 🎯 목표
- 기본 CSS 스타일 적용
- 네비게이션 메뉴 스타일링
- 히어로 섹션 디자인

## 📝 실습 내용

### 1. 기본 스타일 설정
\`\`\`css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

/* 헤더 스타일 */
header {
    background-color: #d32f2f;
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
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
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: #ffeb3b;
}
\`\`\`

### 2. 히어로 섹션 스타일링
\`\`\`css
.hero {
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                url('hero-bg.jpg') center/cover;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    padding-top: 80px;
}

.hero h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    max-width: 600px;
}

.cta-button {
    background-color: #ff5722;
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.cta-button:hover {
    background-color: #e64a19;
}
\`\`\`
          `,
          estimatedTime: '45분',
          resources: [
            { type: 'video', title: 'CSS 기초 강의', url: '#' },
            { type: 'doc', title: 'CSS 속성 참고서', url: '#' }
          ]
        },
        {
          id: 3,
          title: '메뉴 섹션 구현',
          description: '음식점 메뉴를 보여주는 섹션을 만들어보세요.',
          content: `
# 3단계: 메뉴 섹션 구현

## 🎯 목표
- 메뉴 섹션 HTML 구조 작성
- 그리드 레이아웃으로 메뉴 카드 배치
- 호버 효과 추가

## 📝 실습 내용

### 1. HTML 구조 추가
\`\`\`html
<section id="menu" class="menu-section">
    <div class="container">
        <h2>대표 메뉴</h2>
        <div class="menu-grid">
            <div class="menu-item">
                <img src="jjajangmyeon.jpg" alt="짜장면">
                <h3>짜장면</h3>
                <p>3대째 내려온 비법 소스로 만든 정통 짜장면</p>
                <span class="price">7,000원</span>
            </div>
            <div class="menu-item">
                <img src="jjamppong.jpg" alt="짬뽕">
                <h3>짬뽕</h3>
                <p>신선한 해산물과 야채가 듬뿍 들어간 얼큰한 짬뽕</p>
                <span class="price">8,000원</span>
            </div>
            <div class="menu-item">
                <img src="tangsuyuk.jpg" alt="탕수육">
                <h3>탕수육</h3>
                <p>바삭한 겉과 부드러운 속살의 완벽한 조화</p>
                <span class="price">25,000원</span>
            </div>
        </div>
    </div>
</section>
\`\`\`

### 2. CSS 스타일링
\`\`\`css
.menu-section {
    padding: 80px 0;
    background-color: #f5f5f5;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.menu-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #d32f2f;
}

.menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.menu-item {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.menu-item:hover {
    transform: translateY(-5px);
}

.menu-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.menu-item h3 {
    padding: 1rem 1.5rem 0.5rem;
    font-size: 1.5rem;
    color: #333;
}

.menu-item p {
    padding: 0 1.5rem;
    color: #666;
    line-height: 1.5;
}

.price {
    display: block;
    padding: 1rem 1.5rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #d32f2f;
}
\`\`\`
          `,
          estimatedTime: '60분',
          resources: [
            { type: 'video', title: 'CSS Grid 레이아웃', url: '#' },
            { type: 'doc', title: '이미지 최적화 가이드', url: '#' }
          ]
        },
        {
          id: 4,
          title: 'JavaScript 인터랙션 추가',
          description: 'JavaScript를 이용해 인터랙티브한 기능을 추가해보세요.',
          content: `
# 4단계: JavaScript 인터랙션 추가

## 🎯 목표
- 스크롤 네비게이션 구현
- 모바일 메뉴 토글 기능
- 부드러운 스크롤 효과

## 📝 실습 내용

### 1. 기본 JavaScript 설정
\`\`\`javascript
// DOM 요소 선택
const navMenu = document.querySelector('.nav-menu');
const ctaButton = document.querySelector('.cta-button');
const menuItems = document.querySelectorAll('.menu-item');

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('페이지가 로드되었습니다.');
    initializeEventListeners();
});

function initializeEventListeners() {
    // CTA 버튼 클릭 이벤트
    ctaButton.addEventListener('click', function() {
        document.getElementById('menu').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // 네비게이션 메뉴 클릭 이벤트
    navMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
}
\`\`\`

### 2. 스크롤 이벤트 처리
\`\`\`javascript
// 스크롤 이벤트 리스너
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    
    // 헤더 배경 변경
    if (scrollY > 50) {
        header.style.backgroundColor = 'rgba(211, 47, 47, 0.95)';
    } else {
        header.style.backgroundColor = '#d32f2f';
    }
    
    // 메뉴 아이템 애니메이션
    animateMenuItems();
});

function animateMenuItems() {
    menuItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
}
\`\`\`

### 3. 모바일 반응형 기능
\`\`\`javascript
// 모바일 메뉴 토글 기능
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenuMobile = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        navMenuMobile.classList.toggle('active');
    });
}

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navMenuMobile.classList.remove('active');
    }
});
\`\`\`
          `,
          estimatedTime: '45분',
          resources: [
            { type: 'video', title: 'JavaScript 기초', url: '#' },
            { type: 'doc', title: 'DOM 조작 가이드', url: '#' }
          ]
        },
        {
          id: 5,
          title: '반응형 디자인 완성',
          description: '모바일과 태블릿에서도 완벽하게 보이도록 반응형 디자인을 적용해보세요.',
          content: `
# 5단계: 반응형 디자인 완성

## 🎯 목표
- 모바일 우선 설계 적용
- 다양한 화면 크기 대응
- 터치 인터페이스 최적화

## 📝 실습 내용

### 1. 모바일 기본 스타일
\`\`\`css
/* 모바일 우선 (기본 스타일) */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 70px;
        right: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background-color: #d32f2f;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2rem;
        transition: right 0.3s;
    }
    
    .nav-menu.active {
        right: 0;
    }
    
    .mobile-menu-btn {
        display: block;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    .hero h2 {
        font-size: 2rem;
    }
    
    .hero p {
        font-size: 1.2rem;
        padding: 0 1rem;
    }
    
    .menu-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
\`\`\`

### 2. 태블릿 스타일
\`\`\`css
/* 태블릿 */
@media (min-width: 769px) and (max-width: 1024px) {
    .container {
        padding: 0 1rem;
    }
    
    .menu-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .hero h2 {
        font-size: 2.5rem;
    }
}
\`\`\`

### 3. 데스크톱 최적화
\`\`\`css
/* 데스크톱 */
@media (min-width: 1025px) {
    .container {
        max-width: 1200px;
    }
    
    .menu-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .hero h2 {
        font-size: 3rem;
    }
    
    /* 호버 효과 강화 */
    .menu-item:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    }
}
\`\`\`
          `,
          estimatedTime: '40분',
          resources: [
            { type: 'video', title: '반응형 디자인 완벽 가이드', url: '#' },
            { type: 'doc', title: '모바일 최적화 체크리스트', url: '#' }
          ]
        }
      ]
    }
    // 다른 프로젝트들도 비슷한 구조로 추가할 수 있습니다
  ];

  const project = projects.find(p => p.id === projectId);

  useEffect(() => {
    if (!project) return;
    
    // 로컬 스토리지에서 진행 상황 불러오기
    const savedProgress = localStorage.getItem(`project-${projectId}-progress`);
    if (savedProgress) {
      const { currentStep: savedStep, completedSteps: savedCompleted } = JSON.parse(savedProgress);
      setCurrentStep(savedStep);
      setCompletedSteps(savedCompleted);
    }
  }, [projectId, project]);

  const handleStepComplete = (stepId: number) => {
    const newCompleted = [...completedSteps, stepId];
    setCompletedSteps(newCompleted);
    
    // 다음 단계로 진행
    if (stepId === currentStep + 1) {
      setCurrentStep(stepId);
    }
    
    // 진행 상황 저장
    localStorage.setItem(`project-${projectId}-progress`, JSON.stringify({
      currentStep: Math.max(currentStep, stepId),
      completedSteps: newCompleted
    }));
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">프로젝트를 찾을 수 없습니다</h1>
          <Button asChild>
            <Link href="/practice">실습 목록으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    );
  }

  const progress = (completedSteps.length / project.steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link href="/practice">
                <ArrowLeft className="w-4 h-4 mr-2" />
                실습 목록
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{project.level}</Badge>
              <Badge variant="outline">{project.duration}</Badge>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-secondary-600 mb-6">
                {project.description}
              </p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-secondary-600" />
                  <span className="text-sm">{project.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-secondary-600" />
                  <span className="text-sm">{project.participants}명 참여</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm">{project.rating}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-secondary-900 mb-2">학습 목표</h3>
                <ul className="space-y-1">
                  {project.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-secondary-600">
                      <Target className="w-4 h-4 mt-0.5 text-primary-500 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-secondary-900 mb-2">진행 상황</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Progress value={progress} className="flex-1" />
                  <span className="text-sm text-secondary-600">{Math.round(progress)}%</span>
                </div>
                <p className="text-sm text-secondary-600">
                  {completedSteps.length} / {project.steps.length} 단계 완료
                </p>
              </div>
            </div>
            
            <div>
              <Image 
                src={project.image} 
                alt={project.title}
                width={600}
                height={256}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="steps" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="steps">학습 단계</TabsTrigger>
            <TabsTrigger value="resources">학습 자료</TabsTrigger>
            <TabsTrigger value="community">커뮤니티</TabsTrigger>
          </TabsList>
          
          <TabsContent value="steps" className="mt-8">
            <div className="space-y-6">
              {project.steps.map((step, index) => (
                <Card key={step.id} className={`${completedSteps.includes(step.id) ? 'border-green-200 bg-green-50' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          completedSteps.includes(step.id) 
                            ? 'bg-green-500 text-white' 
                            : 'bg-secondary-200 text-secondary-600'
                        }`}>
                          {completedSteps.includes(step.id) ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-secondary-900">
                            {step.title}
                          </h3>
                          <p className="text-sm text-secondary-600">
                            {step.description}
                          </p>
                        </div>
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.estimatedTime}
                        </Badge>
                        {!completedSteps.includes(step.id) && (
                          <Button
                            size="sm"
                            onClick={() => handleStepComplete(step.id)}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            시작하기
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-secondary-700 bg-secondary-50 p-4 rounded-lg">
                        {step.content}
                      </pre>
                    </div>
                    
                    {step.resources && step.resources.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-secondary-900 mb-2">관련 자료</h4>
                        <div className="flex flex-wrap gap-2">
                          {step.resources.map((resource, idx) => (
                            <Button key={idx} variant="outline" size="sm" asChild>
                              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                {resource.type === 'video' && <Play className="w-4 h-4 mr-1" />}
                                {resource.type === 'doc' && <BookOpen className="w-4 h-4 mr-1" />}
                                {resource.title}
                              </a>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary-500" />
                    코드 예제
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-secondary-600 mb-4">
                    완성된 프로젝트의 소스 코드를 다운로드하실 수 있습니다.
                  </p>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    소스 코드 다운로드
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    추가 학습 자료
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <BookOpen className="w-4 h-4 mr-2" />
                      HTML/CSS 참고 문서
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Play className="w-4 h-4 mr-2" />
                      JavaScript 기초 영상
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Code className="w-4 h-4 mr-2" />
                      반응형 디자인 가이드
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="community" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>프로젝트 커뮤니티</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-600 mb-4">
                  다른 학습자들과 함께 프로젝트를 진행하고 도움을 주고받아보세요.
                </p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/community">
                      <Users className="w-4 h-4 mr-2" />
                      커뮤니티 참여
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/support">
                      도움 요청
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PracticeDetailPage; 