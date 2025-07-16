'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  User, 
  Settings, 
  Download, 
  Github, 
  Terminal,
  Clock,
  Target,
  Star
} from 'lucide-react';

const UserGuide = () => {
  const steps = [
    {
      id: 1,
      title: '회원가입 및 로그인',
      icon: User,
      color: 'bg-blue-500',
      time: '2분',
      description: '학습 진행상황 추적을 위한 계정 생성',
      instructions: [
        '이름을 정확히 입력하세요 (완료증에 표시됩니다)',
        '실제 사용하는 이메일 주소를 입력하세요',
        '8자 이상의 안전한 비밀번호를 설정하세요',
        '비밀번호 확인란에 동일한 비밀번호를 입력하세요',
        'GitHub 사용자명은 선택사항입니다 (나중에 추가 가능)',
        '&quot;회원가입하고 시작하기&quot; 버튼을 클릭하세요'
      ],
      tips: [
        '💡 비밀번호는 영문, 숫자, 특수문자를 조합하면 더 안전합니다',
        '💡 모든 정보는 브라우저에만 저장되며 외부로 전송되지 않습니다',
        '💡 GitHub 사용자명을 미리 입력하면 5단계에서 더 쉽게 연결됩니다'
      ],
      commonIssues: [
        {
          issue: '이메일 형식이 올바르지 않습니다',
          solution: '@가 포함된 올바른 이메일 형식을 입력해주세요'
        },
        {
          issue: '비밀번호가 일치하지 않습니다',
          solution: '비밀번호와 비밀번호 확인이 동일한지 확인해주세요'
        }
      ]
    },
    {
      id: 2,
      title: '시스템 요구사항 체크',
      icon: Settings,
      color: 'bg-green-500',
      time: '1분',
      description: '개발 환경 적합성 자동 확인',
      instructions: [
        '로그인 후 자동으로 나타나는 &quot;시스템 체크 시작&quot; 버튼을 클릭하세요',
        '시스템이 자동으로 다음 항목들을 확인합니다:',
        '  - 운영체제 정보',
        '  - 브라우저 종류와 버전',
        '  - 메모리 용량',
        '  - 인터넷 연결 상태',
        '결과를 검토하고 문제가 있으면 권장사항을 확인하세요',
        '모든 항목이 정상이면 자동으로 다음 단계로 진행됩니다'
      ],
      tips: [
        '💡 Chrome이나 Edge 브라우저를 사용하면 가장 안정적입니다',
        '💡 최소 4GB 메모리가 권장됩니다',
        '💡 안정적인 인터넷 연결이 필요합니다'
      ],
      commonIssues: [
        {
          issue: '브라우저가 지원되지 않습니다',
          solution: 'Chrome, Edge, Firefox 최신 버전을 사용해주세요'
        },
        {
          issue: '메모리가 부족합니다',
          solution: '다른 프로그램을 종료하거나 메모리를 추가해주세요'
        }
      ]
    },
    {
      id: 3,
      title: 'Node.js 설치 확인',
      icon: Download,
      color: 'bg-purple-500',
      time: '5분',
      description: 'JavaScript 실행 환경 확인',
      instructions: [
        '터미널(명령 프롬프트)을 열어주세요',
        '  - Windows: Windows키 + R → &quot;cmd&quot; 입력 → Enter',
        '  - Mac: Command + Space → &quot;터미널&quot; 입력',
        '표시된 명령어 &quot;node --version&quot;을 복사하세요',
        '터미널에 명령어를 붙여넣고 Enter를 누르세요',
        '출력된 결과를 모두 선택하여 복사하세요',
        '웹페이지의 텍스트 영역에 결과를 붙여넣으세요',
        '"설치 확인" 버튼을 클릭하세요'
      ],
      tips: [
        '💡 Node.js 18.0.0 이상 버전을 권장합니다',
        '💡 설치 후 터미널을 재시작해야 할 수 있습니다',
        '💡 &quot;복사&quot; 버튼을 클릭하면 명령어가 자동으로 복사됩니다'
      ],
      commonIssues: [
        {
          issue: 'node를 찾을 수 없습니다',
          solution: 'Node.js 공식 사이트(https://nodejs.org)에서 다운로드하여 설치해주세요'
        },
        {
          issue: '버전이 너무 낮습니다',
          solution: '최신 LTS 버전으로 업데이트해주세요'
        }
      ]
    },
    {
      id: 4,
      title: 'Git 설치 확인',
      icon: Download,
      color: 'bg-orange-500',
      time: '3분',
      description: '버전 관리 시스템 확인',
      instructions: [
        '터미널(명령 프롬프트)을 열어주세요',
        '표시된 명령어 &quot;git --version&quot;을 복사하세요',
        '터미널에 명령어를 붙여넣고 Enter를 누르세요',
        '출력된 결과를 모두 선택하여 복사하세요',
        '웹페이지의 텍스트 영역에 결과를 붙여넣으세요',
        '"설치 확인" 버튼을 클릭하세요'
      ],
      tips: [
        '💡 Git 2.30.0 이상 버전을 권장합니다',
        '💡 Windows에서는 Git Bash도 함께 설치됩니다',
        '💡 Mac에서는 Xcode Command Line Tools가 필요할 수 있습니다'
      ],
      commonIssues: [
        {
          issue: 'git를 찾을 수 없습니다',
          solution: 'Git 공식 사이트(https://git-scm.com)에서 다운로드하여 설치해주세요'
        },
        {
          issue: 'Mac에서 개발자 도구가 없습니다',
          solution: '터미널에서 &quot;xcode-select --install&quot; 명령어를 실행하세요'
        }
      ]
    },
    {
      id: 5,
      title: 'GitHub 계정 연결',
      icon: Github,
      color: 'bg-gray-800',
      time: '3분',
      description: '코드 저장소 서비스 연결',
      instructions: [
        'GitHub 계정이 없다면 &quot;GitHub 계정 생성&quot; 버튼을 클릭하세요',
        '새 탭에서 GitHub 사이트가 열립니다',
        '다음 정보를 입력하여 계정을 생성하세요:',
        '  - 사용자명 (영문, 숫자, 하이픈만 사용)',
        '  - 이메일 주소',
        '  - 비밀번호',
        '이메일 인증을 완료하세요',
        '계정 생성 후 원래 페이지로 돌아와서 &quot;GitHub 계정 연결 완료&quot; 버튼을 클릭하세요'
      ],
      tips: [
        '💡 GitHub 사용자명은 영문, 숫자, 하이픈(-)만 사용 가능합니다',
        '💡 무료 계정으로도 모든 기능을 사용할 수 있습니다',
        '💡 이메일 인증을 완료하면 더 많은 기능을 사용할 수 있습니다'
      ],
      commonIssues: [
        {
          issue: '사용자명이 이미 존재합니다',
          solution: '다른 사용자명을 시도해보세요'
        },
        {
          issue: '이메일 인증이 오지 않습니다',
          solution: '스팸 폴더를 확인하거나 다른 이메일을 사용해보세요'
        }
      ]
    }
  ];

  const totalTime = steps.reduce((acc, step) => acc + parseInt(step.time), 0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">
          🔧 환경설정 완벽 가이드
        </h1>
        <p className="text-lg text-secondary-600 mb-6">
          수강생들이 단계별로 따라할 수 있는 상세한 설정 가이드입니다
        </p>
        <div className="flex items-center justify-center gap-6">
          <Badge variant="secondary" className="px-4 py-2">
            <Clock className="w-4 h-4 mr-2" />
            총 소요시간: {totalTime}분
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Target className="w-4 h-4 mr-2" />
            5단계 완료
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            초보자 친화적
          </Badge>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {steps.map((step, index) => (
          <Card key={step.id} className="overflow-hidden">
            <CardHeader className={`${step.color} text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      {step.id}단계. {step.title}
                    </CardTitle>
                    <p className="text-white/90 text-sm">{step.description}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  <Clock className="w-3 h-3 mr-1" />
                  {step.time}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Instructions */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Play className="w-5 h-5 text-blue-500" />
                    진행 방법
                  </h4>
                  <ol className="space-y-2">
                    {step.instructions.map((instruction, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {idx + 1}
                        </span>
                        <span className="text-secondary-700">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    유용한 팁
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {step.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Common Issues */}
                {step.commonIssues.length > 0 && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      자주 발생하는 문제
                    </h4>
                    <div className="space-y-2">
                      {step.commonIssues.map((issue, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="font-medium text-red-700">❌ {issue.issue}</div>
                          <div className="text-red-600 ml-4">✅ {issue.solution}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Success Indicator */}
                <Alert className="border-green-500">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <AlertDescription>
                    <strong>완료 확인:</strong> 이 단계가 완료되면 초록색 체크 표시가 나타나고 
                    자동으로 다음 단계로 진행됩니다.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Final Success */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            🎉 축하합니다!
          </h3>
          <p className="text-green-700 mb-6">
            모든 환경설정이 완료되었습니다. 이제 HTML 기초 학습을 시작할 수 있습니다.
          </p>
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">다음 학습 내용</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• HTML 기본 문법과 태그</li>
              <li>• 신승반점 웹사이트 구조 만들기</li>
              <li>• CSS 스타일링 기초</li>
              <li>• JavaScript 인터랙션 추가</li>
              <li>• 웹사이트 배포하기</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">💬 도움이 더 필요하신가요?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <h4 className="font-medium mb-2">이메일 지원</h4>
              <p className="text-sm text-secondary-600 mb-2">
                설치 관련 문제나 기술적인 질문이 있으시면 언제든 문의하세요.
              </p>
              <Button variant="outline" size="sm">
                📧 support@shinseung-learning.com
              </Button>
            </div>
            <div className="text-center">
              <h4 className="font-medium mb-2">커뮤니티 지원</h4>
              <p className="text-sm text-secondary-600 mb-2">
                다른 수강생들과 함께 문제를 해결하고 경험을 나누어보세요.
              </p>
              <Button variant="outline" size="sm">
                💬 커뮤니티 참여하기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserGuide; 