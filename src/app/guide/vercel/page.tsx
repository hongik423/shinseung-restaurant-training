'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Copy, Star, BookOpen, Globe, Rocket, Settings, GitBranch } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const VercelGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const vercelFeatures = [
    // 기본 배포
    {
      category: 'deployment',
      title: 'Vercel 계정 생성 및 GitHub 연동',
      difficulty: 'beginner',
      description: 'Vercel 계정을 만들고 GitHub 저장소와 연동하는 방법',
      steps: [
        'https://vercel.com 접속',
        'Sign up with GitHub 클릭',
        'GitHub 계정으로 로그인',
        'Vercel 권한 승인',
        'Dashboard 접근 확인'
      ],
      tips: [
        'GitHub, GitLab, Bitbucket 모두 연동 가능',
        '개인 프로젝트는 무료 요금제로 충분',
        'Pro 요금제는 팀 협업 시 고려',
        'Vercel CLI 설치로 로컬에서 배포 가능',
        '다중 Git 계정 사용 시 주의'
      ],
      benefits: [
        '무료 SSL 인증서 자동 적용',
        '글로벌 CDN으로 빠른 로딩',
        'GitHub 푸시 시 자동 배포',
        '미리보기 URL 자동 생성',
        '롤백 및 버전 관리 기능'
      ],
      useCase: '개인 포트폴리오, 랜딩페이지, 정적 사이트'
    },
    {
      category: 'deployment',
      title: '첫 번째 프로젝트 배포',
      difficulty: 'beginner',
      description: 'GitHub 저장소의 프로젝트를 Vercel로 배포하는 기본 과정',
      steps: [
        'Vercel Dashboard에서 "New Project" 클릭',
        'Import Git Repository 선택',
        '배포할 저장소 선택',
        '프로젝트 설정 확인 (Framework: Next.js, Vite 등)',
        'Deploy 버튼 클릭'
      ],
      tips: [
        'package.json의 build 스크립트 확인',
        'output 디렉토리 설정 (보통 dist, build)',
        'Node.js 버전 지정 가능',
        'Environment Variables 미리 설정',
        '배포 후 도메인 확인'
      ],
      benefits: [
        '자동 빌드 및 배포',
        '실시간 로그 확인',
        '에러 발생 시 자동 롤백',
        'HTTPS 기본 적용',
        '무료 .vercel.app 도메인 제공'
      ],
      useCase: '정적 사이트, React 앱, Next.js 프로젝트'
    },
    {
      category: 'deployment',
      title: '커스텀 도메인 연결',
      difficulty: 'intermediate',
      description: '자신만의 도메인을 Vercel 프로젝트에 연결하는 방법',
      steps: [
        'Project Settings > Domains 메뉴 이동',
        'Add Domain 클릭',
        '구매한 도메인 입력 (예: shinseung.com)',
        'DNS 설정 확인',
        'Nameservers 또는 A/CNAME 레코드 설정'
      ],
      tips: [
        '도메인 구매는 Namecheap, GoDaddy 등 이용',
        'DNS 전파는 최대 24시간 소요',
        'www와 non-www 모두 설정 권장',
        'SSL 인증서는 자동 발급',
        'Redirect 설정으로 도메인 통합'
      ],
      benefits: [
        '전문적인 웹사이트 URL',
        '브랜딩 강화',
        'SEO 최적화',
        '사용자 신뢰도 향상',
        '이메일 계정 연동 가능'
      ],
      useCase: '비즈니스 사이트, 전문 포트폴리오, 브랜딩'
    },

    // 고급 설정
    {
      category: 'advanced',
      title: '환경 변수 관리',
      difficulty: 'intermediate',
      description: 'API 키 등 민감한 정보를 안전하게 관리하는 방법',
      steps: [
        'Project Settings > Environment Variables 이동',
        'Name: API_KEY, Value: 실제 키 값 입력',
        'Environment 선택 (Production, Preview, Development)',
        'Add 버튼 클릭',
        '코드에서 process.env.API_KEY로 사용'
      ],
      tips: [
        '.env.local 파일은 로컬 개발용',
        'public 변수는 NEXT_PUBLIC_ prefix 사용',
        'Production과 Preview 환경 분리',
        'Database URL 등 민감 정보 관리',
        'Vercel CLI로 환경 변수 동기화'
      ],
      benefits: [
        '민감 정보 보안',
        '환경별 설정 분리',
        '팀 협업 시 일관성',
        'CI/CD 파이프라인 최적화',
        '설정 변경 시 재배포 불필요'
      ],
      useCase: 'API 연동, 데이터베이스 연결, 외부 서비스 통합'
    },
    {
      category: 'advanced',
      title: '브랜치별 배포 설정',
      difficulty: 'intermediate',
      description: '개발, 스테이징, 프로덕션 환경을 브랜치별로 분리하는 방법',
      steps: [
        'Project Settings > Git 메뉴 이동',
        'Production Branch를 main으로 설정',
        'Preview Deployments 활성화',
        'feature/* 브랜치 푸시',
        '자동 생성된 미리보기 URL 확인'
      ],
      tips: [
        'main 브랜치는 항상 프로덕션 배포',
        'develop 브랜치는 스테이징 환경',
        'feature 브랜치는 미리보기 생성',
        'PR 생성 시 자동 미리보기 댓글',
        'Ignore Build Step으로 불필요한 빌드 방지'
      ],
      benefits: [
        '안전한 배포 프로세스',
        '변경사항 미리 확인',
        '팀 협업 효율성',
        '리뷰 과정 간소화',
        'A/B 테스트 가능'
      ],
      useCase: '팀 프로젝트, 기능 개발, 품질 관리'
    },
    {
      category: 'advanced',
      title: 'Edge Functions 활용',
      difficulty: 'advanced',
      description: '서버리스 함수를 사용한 동적 기능 구현',
      steps: [
        'api 폴더 생성',
        'api/hello.js 파일 생성',
        'export default function handler(req, res) { ... }',
        'git push로 배포',
        'yoursite.com/api/hello 접속 확인'
      ],
      tips: [
        '함수 실행 시간 제한 (Hobby: 10초)',
        'Cold start 최소화를 위한 최적화',
        'Edge Runtime 사용으로 성능 향상',
        'Database 연결 시 connection pooling',
        'Error handling 및 로깅 필수'
      ],
      benefits: [
        '서버 없는 백엔드 구현',
        '글로벌 엣지 실행',
        '자동 스케일링',
        '비용 효율성',
        'API 응답 속도 향상'
      ],
      useCase: '폼 처리, 인증, 데이터 처리, 외부 API 연동'
    },

    // 성능 최적화
    {
      category: 'performance',
      title: '빌드 최적화',
      difficulty: 'intermediate',
      description: '빌드 시간을 단축하고 성능을 향상시키는 방법',
      steps: [
        'package.json의 dependencies 정리',
        'Dynamic import 사용으로 코드 분할',
        'Image 최적화 (Next.js Image 컴포넌트)',
        'Bundle analyzer로 크기 분석',
        'Tree shaking으로 불필요한 코드 제거'
      ],
      tips: [
        'devDependencies와 dependencies 구분',
        'lodash → lodash-es 변경으로 tree shaking',
        'Preload/Prefetch 태그 적절히 사용',
        'Critical CSS 인라인으로 포함',
        'Service Worker 캐싱 전략'
      ],
      benefits: [
        '빠른 페이지 로딩',
        '낮은 대역폭 사용',
        '좋은 사용자 경험',
        'SEO 점수 향상',
        'Core Web Vitals 개선'
      ],
      useCase: '성능 개선, 사용자 경험 향상, SEO 최적화'
    },
    {
      category: 'performance',
      title: 'CDN 및 캐싱 설정',
      difficulty: 'advanced',
      description: '전 세계 사용자에게 빠른 콘텐츠 전달을 위한 최적화',
      steps: [
        'vercel.json 파일 생성',
        'headers 설정으로 캐시 정책 정의',
        'static 파일 캐시 최적화',
        'API 응답 캐시 전략',
        'ISR (Incremental Static Regeneration) 활용'
      ],
      tips: [
        'Static 파일은 긴 캐시 시간 설정',
        'HTML 파일은 짧은 캐시 또는 no-cache',
        'API 응답은 적절한 캐시 헤더',
        'CDN 퍼지 기능 이해',
        'Edge Network 활용'
      ],
      benefits: [
        '전 세계 빠른 접속',
        '서버 부하 감소',
        '대역폭 절약',
        '가용성 향상',
        '사용자 경험 개선'
      ],
      useCase: '글로벌 서비스, 트래픽 최적화, 성능 향상'
    },
    {
      category: 'performance',
      title: '모니터링 및 분석',
      difficulty: 'intermediate',
      description: '웹사이트 성능과 사용자 행동을 분석하는 방법',
      steps: [
        'Vercel Analytics 활성화',
        'Google Analytics 연동',
        'Web Vitals 모니터링',
        'Error Tracking 설정',
        'Real User Monitoring 구현'
      ],
      tips: [
        'Speed Insights로 성능 측정',
        'Audience Insights로 사용자 분석',
        'A/B 테스트 도구 활용',
        'Lighthouse 점수 정기 확인',
        'Error boundary 설정'
      ],
      benefits: [
        '성능 병목 지점 파악',
        '사용자 행동 분석',
        '비즈니스 인사이트',
        '개선 방향 결정',
        'ROI 측정 가능'
      ],
      useCase: '성능 모니터링, 사용자 분석, 비즈니스 인텔리전스'
    },

    // 협업 및 운영
    {
      category: 'collaboration',
      title: '팀 협업 설정',
      difficulty: 'intermediate',
      description: '여러 개발자가 함께 작업할 수 있는 환경 구성',
      steps: [
        'Vercel Team 생성',
        '팀 멤버 초대',
        'Project 권한 설정',
        '배포 승인 프로세스 설정',
        'Slack 등 알림 연동'
      ],
      tips: [
        '역할별 권한 차등 부여',
        'Protected deployments 활용',
        'Preview deployments 공유',
        'Code review 프로세스 통합',
        'Deployment hooks 설정'
      ],
      benefits: [
        '체계적인 협업',
        '안전한 배포',
        '효율적인 리뷰',
        '투명한 프로세스',
        '품질 관리 향상'
      ],
      useCase: '팀 프로젝트, 기업 개발, 품질 관리'
    },
    {
      category: 'collaboration',
      title: 'CI/CD 파이프라인',
      difficulty: 'advanced',
      description: '자동화된 테스트와 배포 파이프라인 구축',
      steps: [
        'GitHub Actions 워크플로우 생성',
        'Jest 테스트 자동 실행',
        'ESLint/Prettier 검사',
        'Vercel 배포 전 품질 검사',
        '배포 성공/실패 알림'
      ],
      tips: [
        'Pull Request 시 자동 테스트',
        'Master 브랜치 보호 규칙',
        'Semantic versioning 적용',
        'Changelog 자동 생성',
        'Rollback 전략 수립'
      ],
      benefits: [
        '자동화된 품질 관리',
        '안전한 배포',
        '개발 속도 향상',
        '인적 오류 감소',
        '일관된 프로세스'
      ],
      useCase: '대규모 프로젝트, 엔터프라이즈, 품질 보증'
    },

    // 보안 및 최적화
    {
      category: 'security',
      title: '보안 헤더 설정',
      difficulty: 'intermediate',
      description: '웹사이트 보안을 강화하는 HTTP 헤더 설정',
      steps: [
        'vercel.json에 headers 섹션 추가',
        'CSP (Content Security Policy) 설정',
        'X-Frame-Options 헤더 추가',
        'X-Content-Type-Options 설정',
        'Referrer-Policy 적용'
      ],
      tips: [
        'CSP는 점진적으로 강화',
        'HTTPS 강제 리디렉션',
        'Security.txt 파일 생성',
        'Subresource Integrity 적용',
        '정기적인 보안 감사'
      ],
      benefits: [
        'XSS 공격 방어',
        'Clickjacking 방지',
        'MIME 타입 공격 차단',
        'Mixed content 보호',
        '보안 표준 준수'
      ],
      useCase: '보안 강화, 기업 사이트, 개인정보 보호'
    },
    {
      category: 'security',
      title: '접근 제어 및 인증',
      difficulty: 'advanced',
      description: '사용자 인증과 접근 권한 관리 구현',
      steps: [
        'NextAuth.js 또는 Auth0 연동',
        'JWT 토큰 관리',
        'Role-based access control',
        'API 라우트 보호',
        'Session 관리'
      ],
      tips: [
        'OAuth 공급자 다중 지원',
        'JWT 보안 설정',
        'Password hashing (bcrypt)',
        'Rate limiting 적용',
        '2FA 구현 고려'
      ],
      benefits: [
        '사용자 계정 관리',
        '접근 권한 제어',
        '개인화된 경험',
        '보안 강화',
        '사용자 데이터 보호'
      ],
      useCase: '회원제 사이트, 관리자 패널, 개인화 서비스'
    }
  ];

  const categories = [
    { id: 'all', name: '전체', icon: '📋' },
    { id: 'deployment', name: '배포', icon: '🚀' },
    { id: 'advanced', name: '고급 설정', icon: '⚙️' },
    { id: 'performance', name: '성능', icon: '⚡' },
    { id: 'collaboration', name: '협업', icon: '👥' },
    { id: 'security', name: '보안', icon: '🔒' }
  ];

  const difficulties = [
    { id: 'beginner', name: '초급', color: 'bg-green-100 text-green-800' },
    { id: 'intermediate', name: '중급', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'advanced', name: '고급', color: 'bg-red-100 text-red-800' }
  ];

  const filteredFeatures = vercelFeatures.filter(feature => {
    const matchesSearch = feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <span className="text-secondary-700">Vercel 배포 가이드</span>
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl font-bold text-secondary-900 mb-4">
                🚀 Vercel 배포 가이드
              </h1>
              <p className="text-xl text-secondary-600 mb-8">
                웹사이트를 몇 분 만에 전 세계에 배포하고 운영하는 완벽한 가이드
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <Badge variant="secondary" className="text-sm">
                  <Star className="w-4 h-4 mr-1" />
                  4.9점 (2,789개 평가)
                </Badge>
                <Badge variant="outline" className="text-sm">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {vercelFeatures.length}개 기능
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
                placeholder="Vercel 기능 검색..."
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

        {/* Vercel Features */}
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
                      <Rocket className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>
                  <p className="text-secondary-600 mb-2">{feature.description}</p>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {feature.useCase}
                  </Badge>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="steps" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="steps">단계</TabsTrigger>
                      <TabsTrigger value="tips">팁</TabsTrigger>
                      <TabsTrigger value="benefits">장점</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="steps" className="mt-4">
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-secondary-700 mb-3">
                          📋 실행 단계:
                        </h4>
                        <div className="space-y-2">
                          {feature.steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                {i + 1}
                              </div>
                              <p className="text-sm text-secondary-700 pt-1">{step}</p>
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
                    
                    <TabsContent value="benefits" className="mt-4">
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-secondary-700 mb-3">
                          ✨ 핵심 장점:
                        </h4>
                        <div className="space-y-2">
                          {feature.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-green-500 text-sm">✓</span>
                              <p className="text-sm text-secondary-700">{benefit}</p>
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

        {/* Quick Start Guide */}
        <section className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Rocket className="w-6 h-6 text-blue-600" />
                빠른 배포 가이드
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-secondary-900">1단계: 프로젝트 준비</h3>
                    <div className="bg-white p-4 rounded-lg">
                      <code className="text-sm text-secondary-700">
                        npm run build<br/>
                        # 빌드 성공 확인
                      </code>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-secondary-900">2단계: GitHub 푸시</h3>
                    <div className="bg-white p-4 rounded-lg">
                      <code className="text-sm text-secondary-700">
                        git add .<br/>
                        git commit -m &quot;Ready for deployment&quot;<br/>
                        git push origin main
                      </code>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-block bg-primary-500 text-white px-6 py-3 rounded-lg">
                    <Globe className="w-5 h-5 inline mr-2" />
                    3단계: Vercel에서 Import → Deploy → 완료! 🎉
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pricing */}
        <section className="mt-12 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">💰 Vercel 요금제</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Hobby</h3>
                  <div className="text-3xl font-bold text-primary-600 mb-4">무료</div>
                  <ul className="text-sm text-secondary-600 space-y-2">
                    <li>• 개인 프로젝트</li>
                    <li>• 100GB 대역폭</li>
                    <li>• 무제한 사이트</li>
                    <li>• HTTPS 포함</li>
                  </ul>
                </div>
                <div className="text-center p-6 border rounded-lg bg-primary-50">
                  <h3 className="text-lg font-semibold mb-2">Pro</h3>
                  <div className="text-3xl font-bold text-primary-600 mb-4">$20/월</div>
                  <ul className="text-sm text-secondary-600 space-y-2">
                    <li>• 팀 협업</li>
                    <li>• 1TB 대역폭</li>
                    <li>• Password protection</li>
                    <li>• Analytics</li>
                  </ul>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold text-primary-600 mb-4">문의</div>
                  <ul className="text-sm text-secondary-600 space-y-2">
                    <li>• 대규모 팀</li>
                    <li>• 무제한 대역폭</li>
                    <li>• SAML SSO</li>
                    <li>• 24/7 지원</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices */}
        <section className="mt-12 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">🎯 Vercel 모범 사례</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-3">✅ 권장 사항</h3>
                  <ul className="space-y-2 text-sm text-secondary-600">
                    <li>• 환경 변수로 API 키 관리</li>
                    <li>• 이미지 최적화 및 압축</li>
                    <li>• 적절한 캐싱 전략 수립</li>
                    <li>• 브랜치별 배포 환경 분리</li>
                    <li>• 성능 모니터링 설정</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-3">❌ 피해야 할 실수</h3>
                  <ul className="space-y-2 text-sm text-secondary-600">
                    <li>• 민감한 정보 하드코딩</li>
                    <li>• 불필요한 의존성 포함</li>
                    <li>• 빌드 최적화 소홀</li>
                    <li>• 에러 처리 미흡</li>
                    <li>• 백업 및 롤백 계획 부재</li>
                  </ul>
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
                  <Link href="/guide/github">
                    <div>
                      <div className="font-medium">GitHub 사용법</div>
                      <div className="text-sm text-secondary-600">소스 코드 관리</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="justify-start h-auto p-4">
                  <Link href="/guide/responsive">
                    <div>
                      <div className="font-medium">반응형 디자인</div>
                      <div className="text-sm text-secondary-600">모바일 최적화</div>
                    </div>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="justify-start h-auto p-4">
                  <Link href="/learning/deploy">
                    <div>
                      <div className="font-medium">배포 실습</div>
                      <div className="text-sm text-secondary-600">직접 배포해보기</div>
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

export default VercelGuide; 