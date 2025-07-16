'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Eye, Users, Award, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('gallery');

  const featuredWorks = [
    {
      id: 1,
      title: '모던 카페 랜딩페이지',
      author: '김개발',
      avatar: 'https://github.com/shadcn.png',
      image: 'https://picsum.photos/400/300?random=1',
      likes: 24,
      comments: 8,
      views: 156,
      tags: ['HTML', 'CSS', 'JavaScript'],
      description: '깔끔한 디자인의 카페 소개 페이지입니다.',
      isNew: true
    },
    {
      id: 2,
      title: '개인 포트폴리오 사이트',
      author: '박웹개발',
      avatar: 'https://github.com/shadcn.png',
      image: 'https://picsum.photos/400/300?random=2',
      likes: 42,
      comments: 15,
      views: 298,
      tags: ['React', 'Next.js', 'TailwindCSS'],
      description: '디자이너를 위한 포트폴리오 웹사이트입니다.',
      isNew: false
    },
    {
      id: 3,
      title: '온라인 쇼핑몰 메인페이지',
      author: '이코더',
      avatar: 'https://github.com/shadcn.png',
      image: 'https://picsum.photos/400/300?random=3',
      likes: 31,
      comments: 12,
      views: 223,
      tags: ['Vue.js', 'SCSS', 'API'],
      description: '쇼핑몰 메인페이지 클론 코딩 작품입니다.',
      isNew: false
    },
    {
      id: 4,
      title: '날씨 앱 대시보드',
      author: '최프론트',
      avatar: 'https://github.com/shadcn.png',
      image: 'https://picsum.photos/400/300?random=4',
      likes: 18,
      comments: 6,
      views: 142,
      tags: ['JavaScript', 'Weather API', 'Chart.js'],
      description: '실시간 날씨 정보를 보여주는 대시보드입니다.',
      isNew: true
    }
  ];

  const qnaItems = [
    {
      id: 1,
      title: 'CSS Grid와 Flexbox 언제 사용해야 하나요?',
      author: '초보개발자',
      avatar: 'https://github.com/shadcn.png',
      category: 'CSS',
      replies: 5,
      views: 89,
      timeAgo: '2시간 전',
      isAnswered: true,
      isHot: true
    },
    {
      id: 2,
      title: 'JavaScript 비동기 처리 방법 질문',
      author: '배우는중',
      avatar: 'https://github.com/shadcn.png',
      category: 'JavaScript',
      replies: 3,
      views: 67,
      timeAgo: '4시간 전',
      isAnswered: false,
      isHot: false
    },
    {
      id: 3,
      title: 'React 컴포넌트 상태 관리 팁',
      author: '리액트러버',
      avatar: 'https://github.com/shadcn.png',
      category: 'React',
      replies: 8,
      views: 134,
      timeAgo: '1일 전',
      isAnswered: true,
      isHot: true
    },
    {
      id: 4,
      title: '반응형 웹 디자인 브레이크포인트 설정',
      author: '디자인코더',
      avatar: 'https://github.com/shadcn.png',
      category: 'CSS',
      replies: 12,
      views: 201,
      timeAgo: '2일 전',
      isAnswered: true,
      isHot: false
    }
  ];

  const tips = [
    {
      id: 1,
      title: '코드 에디터 생산성 향상 팁 5가지',
      author: '효율성킹',
      avatar: 'https://github.com/shadcn.png',
      category: '개발팁',
      likes: 45,
      bookmarks: 23,
      timeAgo: '3일 전',
      preview: 'VS Code 확장프로그램과 단축키를 활용한 개발 속도 향상 방법...'
    },
    {
      id: 2,
      title: 'Git 커밋 메시지 작성 규칙',
      author: '깃마스터',
      avatar: 'https://github.com/shadcn.png',
      category: 'Git',
      likes: 38,
      bookmarks: 19,
      timeAgo: '5일 전',
      preview: '좋은 커밋 메시지로 협업 효율성을 높이는 방법을 알아보세요...'
    },
    {
      id: 3,
      title: 'CSS 애니메이션 성능 최적화',
      author: '퍼포먼스개발',
      avatar: 'https://github.com/shadcn.png',
      category: 'CSS',
      likes: 52,
      bookmarks: 31,
      timeAgo: '1주 전',
      preview: '부드러운 애니메이션을 위한 CSS 속성 선택과 GPU 가속 활용법...'
    }
  ];

  const studyGroups = [
    {
      id: 1,
      title: '웹개발 초보자 스터디',
      description: '매주 토요일 오전 10시, 기초부터 차근차근 함께 배워요',
      members: 12,
      maxMembers: 15,
      level: '초급',
      schedule: '매주 토요일 10:00',
      tags: ['HTML', 'CSS', 'JavaScript'],
      leader: '스터디리더',
      isRecruiting: true
    },
    {
      id: 2,
      title: 'React 프로젝트 스터디',
      description: '실제 프로젝트를 만들어가며 React를 학습합니다',
      members: 8,
      maxMembers: 10,
      level: '중급',
      schedule: '매주 일요일 14:00',
      tags: ['React', 'Next.js', 'TypeScript'],
      leader: '리액트전문가',
      isRecruiting: true
    },
    {
      id: 3,
      title: '알고리즘 문제 해결 스터디',
      description: '개발자 면접 대비 알고리즘 문제를 함께 풀어봅시다',
      members: 10,
      maxMembers: 10,
      level: '중급',
      schedule: '매주 수요일 20:00',
      tags: ['Algorithm', 'JavaScript', 'Python'],
      leader: '알고리즘마스터',
      isRecruiting: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-secondary-900 mb-4">
              💬 커뮤니티
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
              함께 배우고 성장하는 웹개발 커뮤니티에 참여해보세요
            </p>
            
            {/* Stats */}
            <div className="flex justify-center items-center gap-8 text-sm text-secondary-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>1,234명의 개발자</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>567개의 질문</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>89개의 작품</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Community Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="gallery">🎨 작품 갤러리</TabsTrigger>
            <TabsTrigger value="qna">❓ Q&A</TabsTrigger>
            <TabsTrigger value="tips">💡 팁 & 노하우</TabsTrigger>
            <TabsTrigger value="study">🤝 스터디 그룹</TabsTrigger>
          </TabsList>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-secondary-900">
                최근 작품들
              </h2>
              <Button>
                내 작품 올리기
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredWorks.map((work) => (
                <Card key={work.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image 
                      src={work.image} 
                      alt={work.title}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover"
                    />
                    {work.isNew && (
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={work.avatar} />
                        <AvatarFallback>{work.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-secondary-700">
                        {work.author}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-secondary-900 mb-2 line-clamp-2">
                      {work.title}
                    </h3>
                    
                    <p className="text-sm text-secondary-600 mb-3 line-clamp-2">
                      {work.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {work.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-secondary-600">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {work.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {work.comments}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {work.views}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Q&A Tab */}
          <TabsContent value="qna" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-secondary-900">
                질문과 답변
              </h2>
              <Button>
                질문하기
              </Button>
            </div>
            
            <div className="space-y-4">
              {qnaItems.map((item) => (
                <Card key={item.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={item.avatar} />
                        <AvatarFallback>{item.author[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{item.category}</Badge>
                          {item.isAnswered && (
                            <Badge className="bg-green-500">답변완료</Badge>
                          )}
                          {item.isHot && (
                            <Badge className="bg-red-500">HOT</Badge>
                          )}
                        </div>
                        
                        <h3 className="font-semibold text-secondary-900 mb-2 hover:text-primary-600 cursor-pointer">
                          {item.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-secondary-600">
                          <span>{item.author}</span>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {item.replies}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {item.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.timeAgo}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-secondary-900">
                팁 & 노하우
              </h2>
              <Button>
                팁 공유하기
              </Button>
            </div>
            
            <div className="space-y-6">
              {tips.map((tip) => (
                <Card key={tip.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={tip.avatar} />
                        <AvatarFallback>{tip.author[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{tip.category}</Badge>
                          <span className="text-sm text-secondary-600">{tip.timeAgo}</span>
                        </div>
                        
                        <h3 className="font-semibold text-secondary-900 mb-2 hover:text-primary-600 cursor-pointer">
                          {tip.title}
                        </h3>
                        
                        <p className="text-secondary-600 mb-3">
                          {tip.preview}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-secondary-600">
                            <span>{tip.author}</span>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {tip.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              {tip.bookmarks}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            더 읽기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="study" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-secondary-900">
                스터디 그룹
              </h2>
              <Button>
                스터디 만들기
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-secondary-900 mb-2">
                          {group.title}
                        </h3>
                        <Badge variant="outline">{group.level}</Badge>
                      </div>
                      {group.isRecruiting && (
                        <Badge className="bg-green-500">모집중</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-secondary-600 mb-4">
                      {group.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-secondary-600" />
                        <span>{group.members}/{group.maxMembers}명</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-secondary-600" />
                        <span>{group.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-secondary-600">리더:</span>
                        <span>{group.leader}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {group.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      disabled={!group.isRecruiting}
                    >
                      {group.isRecruiting ? '참여하기' : '모집 완료'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityPage; 