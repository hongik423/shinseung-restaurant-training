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
  MessageCircle, 
  BookOpen,
  X,
  Minimize2,
  Maximize2,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { analyzeError, handleGeneralQuestion, reviewCode, generateLearningGuide, ChatMessage } from '@/lib/gemini';

interface ErrorInfo {
  message: string;
  stack?: string;
  timestamp: Date;
  source?: string;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
  pendingError?: ErrorInfo | null;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onClose, onMinimize, isMinimized, pendingError }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요! 저는 **AI 상담 챗봇**입니다. 🤖✨\n\n**개발 관련 모든 질문을 도와드립니다:**\n• 🔍 오류 분석 및 해결 방법\n• 📝 코드 리뷰 및 개선 제안\n• 💡 개발 관련 질문 답변\n• 📚 학습 가이드 생성\n\n**무엇을 도와드릴까요?** 편하게 질문해주세요! 😊',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<'general' | 'error' | 'code' | 'guide'>('general');
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
      setChatMode('error');
      const errorMessage = `자동 감지된 오류:\n\n${pendingError.message}\n\n소스: ${pendingError.source || 'Unknown'}\n시간: ${pendingError.timestamp.toLocaleString()}`;
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
      
      switch (chatMode) {
        case 'error':
          response = await analyzeError(userMessage, codeInput || undefined);
          break;
        case 'code':
          if (!codeInput.trim()) {
            response = '코드를 입력해주세요. 코드 리뷰를 위해서는 분석할 코드가 필요합니다.';
          } else {
            response = await reviewCode(codeInput, 'javascript');
          }
          break;
        case 'guide':
          response = await generateLearningGuide(userMessage);
          break;
        default:
          response = await handleGeneralQuestion(userMessage);
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

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: '채팅이 초기화되었습니다. 새로운 질문을 해주세요!',
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

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`w-96 h-96 ${isMinimized ? 'h-12' : 'h-96'} transition-all duration-300 shadow-lg`}>
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="relative">
                <Bot className="w-6 h-6 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">AI 상담 챗봇</span>
                <span className="text-xs text-gray-500 font-normal">개발 도우미</span>
              </div>
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                onClick={onMinimize}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {!isMinimized && (
            <div className="flex gap-1 mt-2">
              <Button
                onClick={() => setChatMode('general')}
                variant={chatMode === 'general' ? 'default' : 'outline'}
                size="sm"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                일반
              </Button>
              <Button
                onClick={() => setChatMode('error')}
                variant={chatMode === 'error' ? 'default' : 'outline'}
                size="sm"
              >
                <Bug className="w-3 h-3 mr-1" />
                오류
              </Button>
              <Button
                onClick={() => setChatMode('code')}
                variant={chatMode === 'code' ? 'default' : 'outline'}
                size="sm"
              >
                <Code className="w-3 h-3 mr-1" />
                코드
              </Button>
              <Button
                onClick={() => setChatMode('guide')}
                variant={chatMode === 'guide' ? 'default' : 'outline'}
                size="sm"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                학습
              </Button>
            </div>
          )}
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="flex flex-col h-80">
            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
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
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                  placeholder="리뷰할 코드를 입력하세요..."
                  className="min-h-[60px] text-sm font-mono"
                />
              </div>
            )}

            {/* 입력 영역 */}
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  chatMode === 'error' ? '오류 메시지를 입력하세요...' :
                  chatMode === 'code' ? '코드에 대한 질문을 입력하세요...' :
                  chatMode === 'guide' ? '학습하고 싶은 주제를 입력하세요...' :
                  '질문을 입력하세요...'
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
              <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
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

export default AIChatbot; 