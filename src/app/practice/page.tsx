'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Code, Zap, Palette } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const PracticePage = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  const practiceProjects = [
    {
      id: 1,
      title: '🍜 신승반점 랜딩페이지',
      description: '인천 차이나타운의 전통 중식당 랜딩페이지를 만들어보세요. HTML, CSS, JavaScript의 기본기를 모두 익힐 수 있습니다.',
      level: 'beginner',
      duration: '3시간',
      difficulty: 1,
      participants: 1234,
      rating: 4.9,
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: 'https://picsum.photos/400/250?random=1',
      skills: ['웹 기초', '레이아웃', '반응형 디자인'],
      completed: true
    },
    {
      id: 2,
      title: '🏢 기업 소개 페이지',
      description: '모던한 기업 소개 웹사이트를 제작해보세요. 회사 정보, 팀 소개, 서비스 안내 등을 포함한 완전한 웹사이트입니다.',
      level: 'intermediate',
      duration: '4시간',
      difficulty: 2,
      participants: 567,
      rating: 4.7,
      tags: ['HTML', 'CSS', 'JavaScript', 'Animation'],
      image: 'https://picsum.photos/400/250?random=2',
      skills: ['고급 레이아웃', '애니메이션', '폼 처리'],
      completed: false
    },
    {
      id: 3,
      title: '🔗 LinkTree 클론',
      description: '개인 브랜딩을 위한 링크 모음 페이지를 만들어보세요. 소셜 미디어 링크들을 한 곳에 모아 관리할 수 있습니다.',
      level: 'beginner',
      duration: '2시간',
      difficulty: 1,
      participants: 892,
      rating: 4.8,
      tags: ['HTML', 'CSS', 'Flexbox'],
      image: 'https://picsum.photos/400/250?random=3',
      skills: ['Flexbox', '아이콘 사용', '호버 효과'],
      completed: false
    },
    {
      id: 4,
      title: '📱 개인 포트폴리오',
      description: '개발자를 위한 포트폴리오 웹사이트를 제작해보세요. 프로젝트 쇼케이스, 스킬 차트, 연락처 등을 포함합니다.',
      level: 'intermediate',
      duration: '5시간',
      difficulty: 3,
      participants: 423,
      rating: 4.6,
      tags: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
      image: 'https://picsum.photos/400/250?random=4',
      skills: ['차트 라이브러리', '모달', '필터링'],
      completed: false
    },
    {
      id: 5,
      title: '🛍️ 쇼핑몰 메인페이지',
      description: '이커머스 쇼핑몰의 메인페이지를 구현해보세요. 상품 목록, 카테고리, 검색 기능 등을 포함합니다.',
      level: 'advanced',
      duration: '6시간',
      difficulty: 4,
      participants: 234,
      rating: 4.5,
      tags: ['HTML', 'CSS', 'JavaScript', 'API'],
      image: 'https://picsum.photos/400/250?random=5',
      skills: ['API 연동', '상태 관리', '검색 기능'],
      completed: false
    },
    {
      id: 6,
      title: '🎵 음악 플레이어',
      description: '웹 기반 음악 플레이어를 만들어보세요. 재생, 일시정지, 볼륨 조절 등의 기능을 구현합니다.',
      level: 'advanced',
      duration: '7시간',
      difficulty: 4,
      participants: 156,
      rating: 4.4,
      tags: ['HTML', 'CSS', 'JavaScript', 'Web Audio API'],
      image: 'https://picsum.photos/400/250?random=6',
      skills: ['Web Audio API', '드래그 앤 드롭', '커스텀 컨트롤'],
      completed: false
    }
  ];

  const levels = [
    { value: 'all', label: '전체', count: practiceProjects.length },
    { value: 'beginner', label: '초급', count: practiceProjects.filter(p => p.level === 'beginner').length },
    { value: 'intermediate', label: '중급', count: practiceProjects.filter(p => p.level === 'intermediate').length },
    { value: 'advanced', label: '고급', count: practiceProjects.filter(p => p.level === 'advanced').length }
  ];

  const filteredProjects = selectedLevel === 'all' 
    ? practiceProjects 
    : practiceProjects.filter(project => project.level === selectedLevel);

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-orange-500';
      case 4: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return '쉬움';
      case 2: return '보통';
      case 3: return '어려움';
      case 4: return '매우 어려움';
      default: return '알 수 없음';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner': return <Code className="w-4 h-4" />;
      case 'intermediate': return <Zap className="w-4 h-4" />;
      case 'advanced': return <Palette className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-secondary-900 mb-4">
              🎮 실습 프로젝트
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
              실제 프로젝트를 만들어보며 웹개발 실력을 키워보세요
            </p>
            
            {/* Level Filter */}
            <div className="flex justify-center gap-2 mb-8">
              {levels.map((level) => (
                <Button
                  key={level.value}
                  variant={selectedLevel === level.value ? 'default' : 'outline'}
                  onClick={() => setSelectedLevel(level.value)}
                  className="flex items-center gap-2"
                >
                  {getLevelIcon(level.value)}
                  {level.label}
                  <Badge variant="secondary" className="ml-1">
                    {level.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Practice Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover"
                />
                {project.completed && (
                  <Badge className="absolute top-2 left-2 bg-green-500">
                    완료
                  </Badge>
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge 
                    className={`${getDifficultyColor(project.difficulty)} text-white`}
                  >
                    {getDifficultyLabel(project.difficulty)}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-secondary-900">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{project.rating}</span>
                  </div>
                </div>
                
                <p className="text-secondary-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-secondary-900 mb-2">
                    배울 수 있는 스킬
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-secondary-600 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {project.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {project.participants}
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  asChild
                  variant={project.completed ? 'outline' : 'default'}
                >
                  <Link href={`/practice/${project.id}`}>
                    {project.completed ? '다시 하기' : '시작하기'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card className="bg-primary-50 border-primary-200">
            <CardContent className="p-8 text-center">
              <Code className="w-16 h-16 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                기초가 부족하신가요?
              </h3>
              <p className="text-secondary-600 mb-6">
                체계적인 학습 과정을 통해 기초부터 차근차근 배워보세요
              </p>
              <Button asChild>
                <Link href="/learning">
                  학습 과정 시작하기
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-secondary-50 border-secondary-200">
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 text-secondary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                함께 공부하고 싶으신가요?
              </h3>
              <p className="text-secondary-600 mb-6">
                스터디 그룹에 참여해서 동료들과 함께 성장해보세요
              </p>
              <Button variant="outline" asChild>
                <Link href="/community">
                  커뮤니티 참여하기
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PracticePage; 