'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink,
  Info,
  Settings,
  Copy,
  Key,
  Eye,
  EyeOff,
  Zap,
  Sparkles,
  Brain
} from 'lucide-react';

interface CursorAPIGuideProps {
  onComplete: () => void;
  onCancel: () => void;
}

const CursorAPIGuide: React.FC<CursorAPIGuideProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    anthropic: '',
    gemini: ''
  });
  const [showApiKeys, setShowApiKeys] = useState({
    openai: false,
    anthropic: false,
    gemini: false
  });
  const [activeTab, setActiveTab] = useState('openai');

  const apiProviders = {
    openai: {
      name: 'OpenAI (ChatGPT)',
      icon: Bot,
      color: 'green',
      signupUrl: 'https://platform.openai.com/signup',
      apiKeyUrl: 'https://platform.openai.com/api-keys',
      description: '가장 인기 있는 AI 모델, GPT-4o와 GPT-4o mini 사용 가능',
      pricing: '프리 티어: $5 크레딧, 유료: $20/월 (ChatGPT Plus)',
      steps: [
        {
          title: 'OpenAI 계정 생성',
          description: 'OpenAI 플랫폼에 계정을 생성하세요',
          content: (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🤖 OpenAI 계정 생성</h4>
                <p className="text-sm text-green-700 mb-3">
                  OpenAI 플랫폼에서 계정을 생성하여 API 키를 발급받으세요.
                </p>
                <Button 
                  onClick={() => window.open('https://platform.openai.com/signup', '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  OpenAI 계정 생성하기
                </Button>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📝 계정 생성 과정</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. 이메일 주소 입력</li>
                  <li>2. 비밀번호 설정</li>
                  <li>3. 이메일 인증 완료</li>
                  <li>4. 전화번호 인증 (SMS 또는 음성)</li>
                  <li>5. 사용 약관 동의</li>
                </ol>
              </div>
            </div>
          )
        },
        {
          title: 'API 키 생성',
          description: 'OpenAI API 키를 생성하세요',
          content: (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🔑 API 키 생성</h4>
                <p className="text-sm text-blue-700 mb-3">
                  OpenAI API 키 페이지에서 새로운 API 키를 생성하세요.
                </p>
                <Button 
                  onClick={() => window.open('https://platform.openai.com/api-keys', '_blank')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Key className="w-4 h-4 mr-2" />
                  API 키 생성 페이지로 이동
                </Button>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">⚙️ API 키 생성 단계</h4>
                <ol className="text-sm text-yellow-700 space-y-1">
                  <li>1. &quot;Create new secret key&quot; 버튼 클릭</li>
                  <li>2. 키 이름 입력 (예: &quot;Cursor IDE&quot;)</li>
                  <li>3. 권한 설정 (기본값 사용)</li>
                  <li>4. &quot;Create secret key&quot; 버튼 클릭</li>
                  <li>5. 생성된 키 복사 및 안전한 곳에 저장</li>
                </ol>
              </div>
              <Alert>
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>
                  <strong>중요:</strong> API 키는 생성 후 한 번만 표시됩니다. 
                  반드시 안전한 곳에 저장하세요.
                </AlertDescription>
              </Alert>
            </div>
          )
        },
        {
          title: 'API 키 입력',
          description: '발급받은 API 키를 입력하세요',
          content: (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🔐 API 키 입력</h4>
                <p className="text-sm text-green-700 mb-3">
                  OpenAI에서 발급받은 API 키를 입력하세요.
                </p>
                <div className="space-y-3">
                  <Label htmlFor="openai-key">OpenAI API 키</Label>
                  <div className="relative">
                    <Input
                      id="openai-key"
                      type={showApiKeys.openai ? "text" : "password"}
                      value={apiKeys.openai}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
                      placeholder="sk-..."
                      className="pr-20"
                    />
                    <div className="absolute right-1 top-1 flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApiKeys(prev => ({ ...prev, openai: !prev.openai }))}
                      >
                        {showApiKeys.openai ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(apiKeys.openai);
                          alert('API 키가 복사되었습니다!');
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Alert>
                <Info className="w-4 h-4" />
                <AlertDescription>
                  API 키는 "sk-"로 시작합니다. 예: sk-1234567890abcdef...
                </AlertDescription>
              </Alert>
            </div>
          )
        }
      ]
    },
    anthropic: {
      name: 'Anthropic (Claude)',
      icon: Brain,
      color: 'purple',
      signupUrl: 'https://console.anthropic.com/signup',
      apiKeyUrl: 'https://console.anthropic.com/settings/keys',
      description: '안전하고 유용한 AI 어시스턴트, Claude 3.5 Sonnet 사용 가능',
      pricing: '프리 티어: $5 크레딧, 유료: 사용량에 따라 과금',
      steps: [
        {
          title: 'Anthropic 계정 생성',
          description: 'Anthropic Console에 계정을 생성하세요',
          content: (
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🧠 Anthropic 계정 생성</h4>
                <p className="text-sm text-purple-700 mb-3">
                  Anthropic Console에서 계정을 생성하여 Claude API에 접근하세요.
                </p>
                <Button 
                  onClick={() => window.open('https://console.anthropic.com/signup', '_blank')}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Anthropic 계정 생성하기
                </Button>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📝 계정 생성 과정</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. 이메일 주소 입력</li>
                  <li>2. 비밀번호 설정</li>
                  <li>3. 이메일 인증 완료</li>
                  <li>4. 전화번호 인증</li>
                  <li>5. 사용 목적 설명</li>
                </ol>
              </div>
            </div>
          )
        },
        {
          title: 'API 키 생성',
          description: 'Anthropic API 키를 생성하세요',
          content: (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🔑 API 키 생성</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Anthropic Console에서 새로운 API 키를 생성하세요.
                </p>
                <Button 
                  onClick={() => window.open('https://console.anthropic.com/settings/keys', '_blank')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Key className="w-4 h-4 mr-2" />
                  API 키 생성 페이지로 이동
                </Button>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">⚙️ API 키 생성 단계</h4>
                <ol className="text-sm text-yellow-700 space-y-1">
                  <li>1. "Create Key" 버튼 클릭</li>
                  <li>2. 키 이름 입력 (예: "Cursor IDE")</li>
                  <li>3. 키 권한 선택 (기본값 사용)</li>
                  <li>4. "Create Key" 버튼 클릭</li>
                  <li>5. 생성된 키 복사 및 안전한 곳에 저장</li>
                </ol>
              </div>
            </div>
          )
        },
        {
          title: 'API 키 입력',
          description: '발급받은 API 키를 입력하세요',
          content: (
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🔐 API 키 입력</h4>
                <p className="text-sm text-purple-700 mb-3">
                  Anthropic에서 발급받은 API 키를 입력하세요.
                </p>
                <div className="space-y-3">
                  <Label htmlFor="anthropic-key">Anthropic API 키</Label>
                  <div className="relative">
                    <Input
                      id="anthropic-key"
                      type={showApiKeys.anthropic ? "text" : "password"}
                      value={apiKeys.anthropic}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, anthropic: e.target.value }))}
                      placeholder="sk-ant-..."
                      className="pr-20"
                    />
                    <div className="absolute right-1 top-1 flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApiKeys(prev => ({ ...prev, anthropic: !prev.anthropic }))}
                      >
                        {showApiKeys.anthropic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(apiKeys.anthropic);
                          alert('API 키가 복사되었습니다!');
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Alert>
                <Info className="w-4 h-4" />
                <AlertDescription>
                  API 키는 "sk-ant-"로 시작합니다. 예: sk-ant-api03-1234567890abcdef...
                </AlertDescription>
              </Alert>
            </div>
          )
        }
      ]
    },
    gemini: {
      name: 'Google (Gemini)',
      icon: Sparkles,
      color: 'blue',
      signupUrl: 'https://makersuite.google.com/app/apikey',
      apiKeyUrl: 'https://makersuite.google.com/app/apikey',
      description: '구글의 최신 AI 모델, Gemini Pro 사용 가능',
      pricing: '프리 티어: 월 60 요청/분, 유료: 사용량에 따라 과금',
      steps: [
        {
          title: 'Google AI Studio 접속',
          description: 'Google AI Studio에 접속하세요',
          content: (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">✨ Google AI Studio 접속</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Google AI Studio에서 Gemini API 키를 생성하세요.
                </p>
                <Button 
                  onClick={() => window.open('https://makersuite.google.com/app/apikey', '_blank')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Google AI Studio 접속하기
                </Button>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📝 로그인 과정</h4>
                <ol className="text-sm text-green-700 space-y-1">
                  <li>1. Google 계정으로 로그인</li>
                  <li>2. 서비스 약관 동의</li>
                  <li>3. 국가/지역 선택</li>
                  <li>4. AI Studio 대시보드 접속</li>
                </ol>
              </div>
            </div>
          )
        },
        {
          title: 'API 키 생성',
          description: 'Gemini API 키를 생성하세요',
          content: (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🔑 API 키 생성</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Google AI Studio에서 새로운 API 키를 생성하세요.
                </p>
                <Button 
                  onClick={() => window.open('https://makersuite.google.com/app/apikey', '_blank')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Key className="w-4 h-4 mr-2" />
                  API 키 생성 페이지로 이동
                </Button>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">⚙️ API 키 생성 단계</h4>
                <ol className="text-sm text-yellow-700 space-y-1">
                  <li>1. "Create API key" 버튼 클릭</li>
                  <li>2. 프로젝트 선택 또는 새 프로젝트 생성</li>
                  <li>3. API 키 이름 입력 (선택사항)</li>
                  <li>4. "Create" 버튼 클릭</li>
                  <li>5. 생성된 키 복사 및 안전한 곳에 저장</li>
                </ol>
              </div>
            </div>
          )
        },
        {
          title: 'API 키 입력',
          description: '발급받은 API 키를 입력하세요',
          content: (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">🔐 API 키 입력</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Google AI Studio에서 발급받은 API 키를 입력하세요.
                </p>
                <div className="space-y-3">
                  <Label htmlFor="gemini-key">Gemini API 키</Label>
                  <div className="relative">
                    <Input
                      id="gemini-key"
                      type={showApiKeys.gemini ? "text" : "password"}
                      value={apiKeys.gemini}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, gemini: e.target.value }))}
                      placeholder="AIza..."
                      className="pr-20"
                    />
                    <div className="absolute right-1 top-1 flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApiKeys(prev => ({ ...prev, gemini: !prev.gemini }))}
                      >
                        {showApiKeys.gemini ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(apiKeys.gemini);
                          alert('API 키가 복사되었습니다!');
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Alert>
                <Info className="w-4 h-4" />
                <AlertDescription>
                  API 키는 "AIza"로 시작합니다. 예: AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q...
                </AlertDescription>
              </Alert>
            </div>
          )
        }
      ]
    }
  };

  const cursorSetupSteps = [
    {
      title: 'Cursor 설정 열기',
      description: 'Cursor IDE에서 설정 페이지를 엽니다',
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">⚙️ Cursor 설정 접근</h4>
            <p className="text-sm text-gray-700 mb-3">
              다음 중 하나의 방법으로 Cursor 설정을 엽니다:
            </p>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded border">
                <div className="font-medium">방법 1: 키보드 단축키</div>
                <div className="text-sm text-gray-600">
                  <kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl</kbd> + 
                  <kbd className="px-2 py-1 bg-gray-100 rounded ml-1">Shift</kbd> + 
                  <kbd className="px-2 py-1 bg-gray-100 rounded ml-1">P</kbd>
                  → "Cursor Settings" 검색
                </div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-medium">방법 2: 메뉴 바</div>
                <div className="text-sm text-gray-600">File → Preferences → Settings</div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-medium">방법 3: 톱니바퀴 아이콘</div>
                <div className="text-sm text-gray-600">왼쪽 하단 톱니바퀴 아이콘 클릭</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Models 탭으로 이동',
      description: 'Cursor 설정에서 Models 탭을 찾아 클릭합니다',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">🤖 Models 설정</h4>
            <p className="text-sm text-blue-700 mb-3">
              Cursor 설정 페이지에서 "Models" 탭을 클릭하세요.
            </p>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded border">
                <div className="font-medium">찾는 방법</div>
                <div className="text-sm text-gray-600">
                  1. 설정 페이지 왼쪽 메뉴에서 "Models" 클릭<br/>
                  2. 또는 검색창에 "API key" 또는 "Models" 입력
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'API 키 설정',
      description: '발급받은 API 키들을 Cursor에 설정합니다',
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">🔐 API 키 입력</h4>
            <p className="text-sm text-green-700 mb-3">
              Models 탭에서 각 AI 모델의 API 키를 설정하세요.
            </p>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border">
                <div className="font-medium text-green-800">OpenAI API Key</div>
                <div className="text-sm text-gray-600 mt-1">
                  "OpenAI API Key" 필드에 발급받은 키 입력
                </div>
                <div className="mt-2 p-2 bg-gray-100 rounded font-mono text-sm">
                  {apiKeys.openai || 'sk-...'}
                </div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-medium text-purple-800">Anthropic API Key</div>
                <div className="text-sm text-gray-600 mt-1">
                  "Anthropic API Key" 필드에 발급받은 키 입력
                </div>
                <div className="mt-2 p-2 bg-gray-100 rounded font-mono text-sm">
                  {apiKeys.anthropic || 'sk-ant-...'}
                </div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-medium text-blue-800">Google API Key</div>
                <div className="text-sm text-gray-600 mt-1">
                  "Google API Key" 필드에 발급받은 키 입력
                </div>
                <div className="mt-2 p-2 bg-gray-100 rounded font-mono text-sm">
                  {apiKeys.gemini || 'AIza...'}
                </div>
              </div>
            </div>
          </div>
          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription>
              API 키를 설정한 후 Cursor를 재시작하면 설정이 완료됩니다.
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    {
      title: '설정 완료 및 테스트',
      description: 'API 키 설정이 올바르게 되었는지 확인합니다',
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">✅ 설정 완료</h4>
            <p className="text-sm text-green-700 mb-3">
              API 키 설정이 완료되었습니다. 이제 Cursor에서 AI 기능을 사용할 수 있습니다.
            </p>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded border">
                <div className="font-medium">테스트 방법</div>
                <div className="text-sm text-gray-600">
                  1. <kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl</kbd> + 
                  <kbd className="px-2 py-1 bg-gray-100 rounded ml-1">K</kbd> 로 AI 채팅 열기<br/>
                  2. 간단한 질문 입력 (예: "Hello, how are you?")<br/>
                  3. AI 응답 확인
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">🚀 사용 가능한 기능</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• AI 채팅 및 질문 답변</li>
              <li>• 코드 생성 및 수정</li>
              <li>• 코드 설명 및 리뷰</li>
              <li>• 버그 수정 제안</li>
              <li>• 리팩토링 도움</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const handleStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
    if (stepIndex < cursorSetupSteps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const allApiKeysSet = apiKeys.openai && apiKeys.anthropic && apiKeys.gemini;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                Cursor AI API 설정 가이드
              </CardTitle>
              <p className="text-secondary-600 mt-2">
                ChatGPT, Claude, Gemini API를 발급받고 Cursor에 설정하는 완벽한 가이드입니다
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                무료 크레딧 제공
              </Badge>
              <Button variant="outline" onClick={onCancel}>
                닫기
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* API Providers */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">🤖 지원되는 AI 모델</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(apiProviders).map(([key, provider]) => (
                <Card key={key} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full bg-${provider.color}-100 flex items-center justify-center`}>
                        <provider.icon className={`w-5 h-5 text-${provider.color}-600`} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{provider.name}</h4>
                        <Badge variant="outline" className="text-xs">{provider.pricing}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{provider.description}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(provider.signupUrl, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        가입
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(provider.apiKeyUrl, '_blank')}
                      >
                        <Key className="w-3 h-3 mr-1" />
                        API 키
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* API Key Setup */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">🔑 API 키 발급 및 설정</h3>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="openai" className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  OpenAI
                </TabsTrigger>
                <TabsTrigger value="anthropic" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Anthropic
                </TabsTrigger>
                <TabsTrigger value="gemini" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Gemini
                </TabsTrigger>
              </TabsList>
              
              {Object.entries(apiProviders).map(([key, provider]) => (
                <TabsContent key={key} value={key} className="mt-6">
                  <div className="space-y-6">
                    {provider.steps.map((step, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            {step.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </CardHeader>
                        <CardContent>
                          {step.content}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Cursor Setup */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">⚙️ Cursor IDE 설정</h3>
            <div className="space-y-6">
              {cursorSetupSteps.map((step, index) => (
                <Card key={index} className={`transition-all duration-200 ${
                  currentStep === index ? 'ring-2 ring-blue-500' : ''
                } ${completedSteps.includes(index) ? 'bg-green-50 border-green-200' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          completedSteps.includes(index) ? 'bg-green-500 text-white' : 
                          currentStep === index ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}>
                          {completedSteps.includes(index) ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <p className="text-sm text-secondary-600">{step.description}</p>
                        </div>
                      </div>
                      {currentStep === index && (
                        <Button
                          onClick={() => handleStepComplete(index)}
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          완료
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  {(currentStep === index || completedSteps.includes(index)) && (
                    <CardContent>
                      {step.content}
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Completion */}
          {completedSteps.length === cursorSetupSteps.length && allApiKeysSet && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    🎉 Cursor AI 설정 완료!
                  </h3>
                  <p className="text-green-700 mb-4">
                    모든 API 키가 설정되었습니다. 이제 Cursor에서 AI 기능을 자유롭게 사용하세요!
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button 
                      onClick={onComplete}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      다음 단계로 진행
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        alert('Cursor를 재시작하여 설정을 완료하세요!');
                      }}
                    >
                      Cursor 재시작 방법 보기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CursorAPIGuide; 