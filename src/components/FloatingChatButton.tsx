'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bot, X } from 'lucide-react';
import AIChatbot from './AIChatbot';
import ErrorDetector from './ErrorDetector';

interface ErrorInfo {
  message: string;
  stack?: string;
  timestamp: Date;
  source?: string;
}

const FloatingChatButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [pendingError, setPendingError] = useState<ErrorInfo | null>(null);

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
        <div className="fixed bottom-6 right-6 z-40">
          {/* AI 상담 챗봇 메인 버튼 */}
          <div className="group relative">
            <Button
              onClick={handleOpenChat}
              className="relative h-16 w-16 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-2 border-white/20 hover:border-white/40 overflow-hidden"
              size="lg"
            >
              {/* 펄스 애니메이션 */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse opacity-75"></div>
              
              {/* 글로우 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-50 animate-pulse"></div>
              
              {/* 아이콘 */}
              <div className="relative z-10 flex items-center justify-center">
                <Bot className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              
              {/* 온라인 상태 표시 */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-lg">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
              </div>
            </Button>
            
            {/* AI 상담 챗봇 라벨 */}
            <div className="absolute bottom-20 right-0 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-bold text-blue-200">AI 상담 챗봇</span>
              </div>
              <div className="text-xs text-gray-300 mt-1">
                개발 관련 질문을 도와드려요!
              </div>
              {/* 화살표 */}
              <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
            
            {/* 물결 효과 */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 animate-pulse"></div>
          </div>
          
          {/* 알림 배지 (새로운 기능) */}
          <div className="absolute -top-2 -left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-bounce">
            NEW
          </div>
          
          {/* 도움말 텍스트 */}
          <div className="absolute bottom-2 right-20 text-xs text-gray-600 font-medium opacity-75 animate-pulse">
            👆 클릭하여 AI 도움받기
          </div>
        </div>
      )}
      
      <AIChatbot
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        onMinimize={handleMinimizeChat}
        isMinimized={isMinimized}
        pendingError={pendingError}
      />
    </>
  );
};

export default FloatingChatButton; 