'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, AlertTriangle, Zap, MessageCircle, Settings, Code, X, HelpCircle } from 'lucide-react';
import ErrorSupportChatbot from './ErrorSupportChatbot';
import ErrorDetector from './ErrorDetector';

interface ErrorInfo {
  message: string;
  stack?: string;
  timestamp: Date;
  source?: string;
}

const FloatingErrorSupportButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [pendingError, setPendingError] = useState<ErrorInfo | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  // 5초 후 펄스 애니메이션 중지
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPulse(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = () => {
    setIsChatOpen(true);
    setIsMinimized(false);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setIsMinimized(false);
    setPendingError(null);
  };

  const handleMinimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const handleErrorDetected = (error: ErrorInfo) => {
    setPendingError(error);
    setIsChatOpen(true);
    setIsMinimized(false);
  };

  return (
    <>
      <ErrorDetector onErrorDetected={handleErrorDetected} />
      
      {!isChatOpen && (
        <div 
          className="fixed top-22 right-20 z-40"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 메인 오류수정 버튼 */}
          <div className="relative group">
            <Button
              onClick={handleOpenChat}
              className={`h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 
                bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700
                ${showPulse ? 'animate-pulse' : ''}
                transform hover:scale-110 active:scale-95
              `}
              size="lg"
            >
              <AlertTriangle className="w-6 h-6 text-white animate-bounce" />
            </Button>

            {/* 상태 표시 점 */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white">
              <div className="w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
            </div>

            {/* 호버 시 나타나는 정보 카드 */}
            {isHovered && (
              <div className="absolute bottom-14 right-0 bg-white rounded-lg shadow-xl border-2 border-gray-200 p-4 w-80 z-50 transform transition-all duration-300 animate-in slide-in-from-top">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Bot className="w-8 h-8 text-purple-600" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">🚨 오류수정 전문 AI</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      개발 중 발생하는 모든 오류를 즉시 해결해드립니다!
                    </p>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-green-50 p-2 rounded flex items-center gap-1">
                        <Settings className="w-3 h-3 text-green-600" />
                        <span className="text-green-700">환경설정</span>
                      </div>
                      <div className="bg-purple-50 p-2 rounded flex items-center gap-1">
                        <Zap className="w-3 h-3 text-purple-600" />
                        <span className="text-purple-700">프롬프터</span>
                      </div>
                      <div className="bg-red-50 p-2 rounded flex items-center gap-1">
                        <Code className="w-3 h-3 text-red-600" />
                        <span className="text-red-700">코드오류</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-500">
                      💡 클릭하면 즉시 도움을 받을 수 있습니다!
                    </div>
                  </div>
                </div>
                
                {/* 화살표 */}
                <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
              </div>
            )}
          </div>

          {/* 빠른 액세스 버튼들 */}
          <div className="flex flex-col gap-2 mt-3">
            <div className="relative group">
              <Button
                onClick={() => {
                  setIsChatOpen(true);
                  setIsMinimized(false);
                }}
                className="h-8 w-8 rounded-full bg-green-500 hover:bg-green-600 shadow-md transition-all duration-200 opacity-80 hover:opacity-100"
                size="sm"
              >
                <Settings className="w-4 h-4 text-white" />
              </Button>
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                환경설정 오류
              </div>
            </div>

            <div className="relative group">
              <Button
                onClick={() => {
                  setIsChatOpen(true);
                  setIsMinimized(false);
                }}
                className="h-8 w-8 rounded-full bg-purple-500 hover:bg-purple-600 shadow-md transition-all duration-200 opacity-80 hover:opacity-100"
                size="sm"
              >
                <Zap className="w-4 h-4 text-white" />
              </Button>
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                프롬프터 최적화
              </div>
            </div>

            <div className="relative group">
              <Button
                onClick={() => {
                  setIsChatOpen(true);
                  setIsMinimized(false);
                }}
                className="h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 shadow-md transition-all duration-200 opacity-80 hover:opacity-100"
                size="sm"
              >
                <Code className="w-4 h-4 text-white" />
              </Button>
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                코드 에러 디버깅
              </div>
            </div>
          </div>
        </div>
      )}
      
      <ErrorSupportChatbot
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        onMinimize={handleMinimizeChat}
        isMinimized={isMinimized}
        pendingError={pendingError}
      />
    </>
  );
};

export default FloatingErrorSupportButton; 