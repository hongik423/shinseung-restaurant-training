'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Send, 
  Bot, 
  User, 
  Code, 
  Bug, 
  Settings, 
  Terminal,
  X,
  Minimize2,
  Maximize2,
  RefreshCw,
  Copy,
  AlertTriangle,
  Zap,
  MessageSquare,
  Star,
  HelpCircle
} from 'lucide-react';
import { analyzeError, handleGeneralQuestion, reviewCode, generateLearningGuide, resolveEnvironmentError, optimizePrompt, ChatMessage } from '@/lib/gemini';

interface ErrorInfo {
  message: string;
  stack?: string;
  timestamp: Date;
  source?: string;
}

interface ErrorSupportChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
  pendingError?: ErrorInfo | null;
}

const ErrorSupportChatbot: React.FC<ErrorSupportChatbotProps> = ({ 
  isOpen, 
  onClose, 
  onMinimize, 
  isMinimized, 
  pendingError 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '👋 안녕하세요! 저는 **오류수정 전문 AI 챗봇**입니다! 🤖\n\n🔧 **전문 분야**:\n• 환경설정 오류 해결\n• 프롬프터 최적화 및 수정\n• 코드 에러 디버깅\n• 빌드/배포 문제 해결\n\n⚡ **빠른 도움**:\n오류 메시지나 문제 상황을 알려주시면 즉시 해결 방법을 제안해드립니다!\n\n❓ 어떤 문제로 도움이 필요하신가요?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<'environment' | 'prompter' | 'code' | 'general'>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 대기 중인 오류가 있을 때 자동으로 처리
  useEffect(() => {
    if (pendingError && isOpen) {
      setChatMode('code');
      const errorMessage = `🚨 자동 감지된 오류:\n\n${pendingError.message}\n\n📍 소스: ${pendingError.source || 'Unknown'}\n⏰ 시간: ${pendingError.timestamp.toLocaleString()}`;
      setInputMessage(errorMessage);
      
      // 자동으로 메시지 전송
      setTimeout(() => {
        if (errorMessage) {
          addMessage('user', errorMessage);
          setInputMessage('');
          setIsLoading(true);
          
          analyzeError(pendingError.message, pendingError.stack)
            .then(response => {
              addMessage('assistant', response);
            })
            .catch(() => {
              addMessage('assistant', '오류 분석 중 문제가 발생했습니다. 다시 시도해주세요.');
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      }, 500);
    }
  }, [pendingError, isOpen]);

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // 사용자 메시지 추가
    addMessage('user', userMessage);

    try {
      let response = '';
      
      // 오류수정 전용 프롬프트 강화
      const specializedPrompt = getSpecializedPrompt(chatMode, userMessage, codeInput);
      
      switch (chatMode) {
        case 'environment':
          response = await resolveEnvironmentError(userMessage, codeInput || undefined);
          break;
        case 'prompter':
          response = await optimizePrompt(userMessage, codeInput || undefined);
          break;
        case 'code':
          if (!codeInput.trim()) {
            response = await analyzeError(specializedPrompt, undefined);
          } else {
            response = await reviewCode(codeInput, 'javascript');
          }
          break;
        default:
          response = await handleGeneralQuestion(specializedPrompt);
      }

      // AI 응답 추가
      addMessage('assistant', response);
    } catch (error) {
      addMessage('assistant', '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
      setCodeInput('');
    }
  };

  const getSpecializedPrompt = (mode: string, message: string, code?: string) => {
    const baseContext = `
당신은 초보 개발자를 위한 오류수정 전문 AI 어시스턴트입니다.
문제 해결에 특화되어 있으며, 구체적이고 실행 가능한 해결 방법을 제공합니다.

답변 방식:
1. 문제 원인 즉시 파악
2. 단계별 해결 방법 제시
3. 예방 방법 안내
4. 관련 참고 자료 제공

모든 답변은 한국어로 작성하고, 초보자도 이해할 수 있도록 친절하게 설명해주세요.
`;

    switch (mode) {
      case 'environment':
        return `${baseContext}
        
전문 분야: 환경설정 오류 해결
- Node.js, npm, yarn 설치 및 버전 문제
- 개발 서버 실행 오류
- 포트 충돌 및 네트워크 문제
- 패키지 의존성 문제
- 환경 변수 설정 오류

사용자 문제: ${message}
${code ? `관련 코드: ${code}` : ''}
`;

      case 'prompter':
        return `${baseContext}
        
전문 분야: 프롬프터 최적화 및 수정
- Cursor AI 프롬프트 작성법
- 효과적인 AI 질문 방법
- 프롬프트 개선 및 최적화
- AI 모델별 적절한 프롬프트 구성
- 개발 작업에 맞는 프롬프트 템플릿

사용자 문제: ${message}
${code ? `프롬프트 예시: ${code}` : ''}
`;

      case 'code':
        return `${baseContext}
        
전문 분야: 코드 에러 디버깅
- JavaScript/TypeScript 오류 해결
- React/Next.js 에러 디버깅
- 빌드 오류 및 컴파일 문제
- 런타임 에러 분석
- 성능 최적화 및 메모리 누수 해결

사용자 문제: ${message}
${code ? `오류 코드: ${code}` : ''}
`;

      default:
        return `${baseContext}
        
일반 개발 문제 해결 및 오류 수정 지원

사용자 문제: ${message}
${code ? `관련 코드: ${code}` : ''}
`;
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: '🔄 채팅이 초기화되었습니다.\n\n새로운 오류나 문제가 있으시면 언제든 말씀해주세요! 🚀',
        timestamp: new Date()
      }
    ]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatMessage = (content: string) => {
    // 코드 블록 처리
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = content.split(codeBlockRegex);
    
    return parts.map((part, index) => {
      if (index % 3 === 2) {
        // 코드 블록 내용
        return (
          <div key={index} className="bg-gray-900 text-gray-100 p-3 rounded-lg my-2 relative">
            <Button
              onClick={() => copyToClipboard(part)}
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
              <code>{part}</code>
            </pre>
          </div>
        );
      } else if (index % 3 === 0) {
        // 일반 텍스트
        return (
          <div key={index} className="whitespace-pre-wrap">
            {part.split('\n').map((line, i) => (
              <p key={i} className="mb-1">
                {line}
              </p>
            ))}
          </div>
        );
      }
      return null;
    });
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'environment': return <Settings className="w-3 h-3" />;
      case 'prompter': return <Zap className="w-3 h-3" />;
      case 'code': return <Code className="w-3 h-3" />;
      default: return <HelpCircle className="w-3 h-3" />;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'environment': return 'bg-green-500';
      case 'prompter': return 'bg-purple-500';
      case 'code': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  if (!isOpen) return null;

  return (
          <div className="fixed top-26 right-4 z-50">
      <Card className={`w-96 transition-all duration-300 shadow-xl border-2 ${
        isMinimized ? 'h-14' : 'h-[500px]'
      }`}>
        <CardHeader className="pb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="relative">
                <Bot className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
              <span className="font-bold">오류수정 전문 AI</span>
              <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                전문가
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                onClick={onMinimize}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {!isMinimized && (
            <div className="flex gap-1 mt-2">
              <Button
                onClick={() => setChatMode('environment')}
                variant={chatMode === 'environment' ? 'secondary' : 'ghost'}
                size="sm"
                className="text-xs h-7 text-white hover:bg-white/20"
              >
                {getModeIcon('environment')}
                <span className="ml-1">환경설정</span>
              </Button>
              <Button
                onClick={() => setChatMode('prompter')}
                variant={chatMode === 'prompter' ? 'secondary' : 'ghost'}
                size="sm"
                className="text-xs h-7 text-white hover:bg-white/20"
              >
                {getModeIcon('prompter')}
                <span className="ml-1">프롬프터</span>
              </Button>
              <Button
                onClick={() => setChatMode('code')}
                variant={chatMode === 'code' ? 'secondary' : 'ghost'}
                size="sm"
                className="text-xs h-7 text-white hover:bg-white/20"
              >
                {getModeIcon('code')}
                <span className="ml-1">코드오류</span>
              </Button>
            </div>
          )}
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="flex flex-col h-[420px] p-4">
            {/* 현재 모드 표시 */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${getModeColor(chatMode)} animate-pulse`} />
              <span className="text-sm font-medium text-gray-600">
                {chatMode === 'environment' && '환경설정 오류 해결 모드'}
                {chatMode === 'prompter' && '프롬프터 최적화 모드'}
                {chatMode === 'code' && '코드 에러 디버깅 모드'}
                {chatMode === 'general' && '일반 문제 해결 모드'}
              </span>
            </div>

            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 bg-gray-50 rounded-lg p-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-900 border'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <div className="flex items-center gap-1">
                          <Bot className="w-4 h-4 text-blue-600" />
                          <Star className="w-3 h-3 text-yellow-500" />
                        </div>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {message.timestamp.toLocaleTimeString()}
                      </Badge>
                    </div>
                    <div className="text-sm">
                      {message.role === 'assistant' ? formatMessage(message.content) : message.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">분석 중...</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 코드 입력 영역 (코드 모드일 때만) */}
            {chatMode === 'code' && (
              <div className="mb-2">
                <Textarea
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="오류가 발생한 코드를 입력하세요..."
                  className="min-h-[60px] text-sm font-mono border-red-200 focus:border-red-400"
                />
              </div>
            )}

            {/* 입력 영역 */}
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  chatMode === 'environment' ? '환경설정 오류를 설명해주세요...' :
                  chatMode === 'prompter' ? '프롬프트 관련 질문을 해주세요...' :
                  chatMode === 'code' ? '코드 오류를 설명해주세요...' :
                  '문제 상황을 자세히 설명해주세요...'
                }
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
              <Button onClick={handleClearChat} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ErrorSupportChatbot; 