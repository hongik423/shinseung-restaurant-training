'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Code, 
  Play, 
  Save, 
  Copy, 
  FileText, 
  Palette, 
  Zap,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface CodeEditorProps {
  onCodeChange?: (code: { html: string; css: string; js: string }) => void;
  initialCode?: {
    html: string;
    css: string;
    js: string;
  };
  isVisible: boolean;
  onToggle: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  onCodeChange, 
  initialCode = { html: '', css: '', js: '' },
  isVisible,
  onToggle
}) => {
  const [code, setCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState('html');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [isAutoSave, setIsAutoSave] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  // 기본 템플릿 코드
  const defaultTemplates = {
    html: `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>내 첫 번째 웹페이지</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🏮 신승반점에 오신 것을 환영합니다!</h1>
            <p>정통 중화요리의 맛을 경험해보세요</p>
        </header>
        
        <nav>
            <ul>
                <li><a href="#menu">메뉴</a></li>
                <li><a href="#about">소개</a></li>
                <li><a href="#contact">연락처</a></li>
            </ul>
        </nav>
        
        <main>
            <section id="menu">
                <h2>인기 메뉴</h2>
                <div class="menu-grid">
                    <div class="menu-item">
                        <h3>짜장면</h3>
                        <p>7,000원</p>
                    </div>
                    <div class="menu-item">
                        <h3>짬뽕</h3>
                        <p>8,000원</p>
                    </div>
                    <div class="menu-item">
                        <h3>탕수육</h3>
                        <p>15,000원</p>
                    </div>
                </div>
            </section>
        </main>
        
        <footer>
            <p>&copy; 2024 신승반점. 모든 권리 보유.</p>
        </footer>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
    css: `/* 기본 스타일 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    margin-top: 50px;
}

header {
    text-align: center;
    padding: 2rem 0;
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    border-radius: 10px;
    margin-bottom: 2rem;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

nav ul {
    display: flex;
    justify-content: center;
    list-style: none;
    margin-bottom: 2rem;
}

nav ul li {
    margin: 0 1rem;
}

nav ul li a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: all 0.3s ease;
}

nav ul li a:hover {
    background: #ff6b6b;
    color: white;
}

.menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
}

.menu-item {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 10px;
    text-align: center;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.menu-item:hover {
    border-color: #ff6b6b;
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.menu-item h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #2c3e50;
}

.menu-item p {
    font-size: 1.2rem;
    color: #e74c3c;
    font-weight: bold;
}

footer {
    text-align: center;
    padding: 1rem;
    margin-top: 2rem;
    border-top: 1px solid #eee;
    color: #666;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
    .container {
        margin: 10px;
        padding: 15px;
    }
    
    header h1 {
        font-size: 2rem;
    }
    
    nav ul {
        flex-direction: column;
        align-items: center;
    }
    
    nav ul li {
        margin: 0.5rem 0;
    }
}`,
    js: `// 신승반점 웹페이지 JavaScript

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('신승반점 웹페이지가 로드되었습니다!');
    
    // 메뉴 아이템에 클릭 이벤트 추가
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const menuName = this.querySelector('h3').textContent;
            const menuPrice = this.querySelector('p').textContent;
            
            alert(\`\${menuName}을(를) 선택하셨습니다! 가격: \${menuPrice}\`);
        });
        
        // 호버 효과 강화
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 네비게이션 스무스 스크롤
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 시간에 따른 인사말 변경
    const now = new Date();
    const hour = now.getHours();
    const header = document.querySelector('header p');
    
    if (hour < 12) {
        header.textContent = '아침 식사로 든든한 중화요리는 어떠세요?';
    } else if (hour < 18) {
        header.textContent = '점심 특선 메뉴를 확인해보세요!';
    } else {
        header.textContent = '저녁 식사로 정통 중화요리를 즐겨보세요!';
    }
    
    // 간단한 애니메이션 효과
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // 메뉴 아이템들에 스크롤 애니메이션 적용
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// 주문 기능 (간단한 버전)
function orderMenu(menuName, price) {
    const confirmed = confirm(\`\${menuName}을(를) 주문하시겠습니까?\\n가격: \${price}\`);
    
    if (confirmed) {
        alert('주문이 완료되었습니다! 맛있게 드세요 🍜');
    }
}

// 현재 시간 표시
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ko-KR');
    console.log('현재 시간:', timeString);
}

// 5초마다 시간 업데이트
setInterval(updateTime, 5000);`
  };

  // 코드 변경 시 실행
  useEffect(() => {
    if (initialCode.html === '' && initialCode.css === '' && initialCode.js === '') {
      setCode(defaultTemplates);
    }
  }, [defaultTemplates, initialCode.html, initialCode.css, initialCode.js]);

  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(code);
    }
    
    if (isAutoSave) {
      setSaveStatus('saving');
      setTimeout(() => setSaveStatus('saved'), 1000);
    }
  }, [code, onCodeChange, isAutoSave]);

  const handleCodeChange = (type: 'html' | 'css' | 'js', value: string) => {
    setCode(prev => ({
      ...prev,
      [type]: value
    }));
    setSaveStatus('unsaved');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code[activeTab as keyof typeof code]);
    alert('코드가 클립보드에 복사되었습니다!');
  };

  const handleSave = () => {
    // 실제 저장 로직 구현
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      alert('코드가 저장되었습니다!');
    }, 1000);
  };

  const handleLoadTemplate = () => {
    const confirmed = confirm('기본 템플릿을 로드하시겠습니까? 현재 코드는 사라집니다.');
    if (confirmed) {
      setCode(defaultTemplates);
    }
  };

  const getLineNumbers = (text: string) => {
    const lines = text.split('\n');
    return lines.map((_, index) => index + 1).join('\n');
  };

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'saving':
        return <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />;
      case 'unsaved':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-40 w-96 max-h-[90vh] overflow-hidden">
      <Card className="bg-white shadow-xl border-r-4 border-r-green-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Code className="w-5 h-5 text-green-600" />
              코드 편집기
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {getSaveStatusIcon()}
                <span className="text-xs text-gray-500">
                  {saveStatus === 'saved' ? '저장됨' : saveStatus === 'saving' ? '저장 중...' : '저장되지 않음'}
                </span>
              </div>
              <Button
                onClick={() => setIsMinimized(!isMinimized)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                onClick={onToggle}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                ×
              </Button>
            </div>
          </div>
          
          {!isMinimized && (
            <div className="flex items-center gap-2 mt-2">
              <Button
                onClick={handleSave}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Save className="w-3 h-3" />
                저장
              </Button>
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                복사
              </Button>
              <Button
                onClick={handleLoadTemplate}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                템플릿
              </Button>
            </div>
          )}
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="html" className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  HTML
                </TabsTrigger>
                <TabsTrigger value="css" className="flex items-center gap-1">
                  <Palette className="w-4 h-4" />
                  CSS
                </TabsTrigger>
                <TabsTrigger value="js" className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  JS
                </TabsTrigger>
              </TabsList>
              
              <div className="h-96 overflow-hidden">
                <TabsContent value="html" className="h-full m-0">
                  <div className="relative h-full">
                    {showLineNumbers && (
                      <div className="absolute left-0 top-0 w-12 h-full bg-gray-100 border-r text-xs text-gray-500 p-2 font-mono overflow-hidden">
                        <pre>{getLineNumbers(code.html)}</pre>
                      </div>
                    )}
                    <textarea
                      value={code.html}
                      onChange={(e) => handleCodeChange('html', e.target.value)}
                      className={`w-full h-full resize-none border-0 outline-none p-2 font-mono text-sm ${
                        showLineNumbers ? 'pl-14' : 'pl-2'
                      }`}
                      style={{ fontSize: `${fontSize}px` }}
                      placeholder="HTML 코드를 입력하세요..."
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="css" className="h-full m-0">
                  <div className="relative h-full">
                    {showLineNumbers && (
                      <div className="absolute left-0 top-0 w-12 h-full bg-gray-100 border-r text-xs text-gray-500 p-2 font-mono overflow-hidden">
                        <pre>{getLineNumbers(code.css)}</pre>
                      </div>
                    )}
                    <textarea
                      value={code.css}
                      onChange={(e) => handleCodeChange('css', e.target.value)}
                      className={`w-full h-full resize-none border-0 outline-none p-2 font-mono text-sm ${
                        showLineNumbers ? 'pl-14' : 'pl-2'
                      }`}
                      style={{ fontSize: `${fontSize}px` }}
                      placeholder="CSS 코드를 입력하세요..."
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="js" className="h-full m-0">
                  <div className="relative h-full">
                    {showLineNumbers && (
                      <div className="absolute left-0 top-0 w-12 h-full bg-gray-100 border-r text-xs text-gray-500 p-2 font-mono overflow-hidden">
                        <pre>{getLineNumbers(code.js)}</pre>
                      </div>
                    )}
                    <textarea
                      value={code.js}
                      onChange={(e) => handleCodeChange('js', e.target.value)}
                      className={`w-full h-full resize-none border-0 outline-none p-2 font-mono text-sm ${
                        showLineNumbers ? 'pl-14' : 'pl-2'
                      }`}
                      style={{ fontSize: `${fontSize}px` }}
                      placeholder="JavaScript 코드를 입력하세요..."
                    />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
            
            <div className="p-2 bg-gray-50 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setShowLineNumbers(!showLineNumbers)}
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                  >
                    {showLineNumbers ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </Button>
                  <Button
                    onClick={() => setIsAutoSave(!isAutoSave)}
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                  >
                    {isAutoSave ? '자동저장 ON' : '자동저장 OFF'}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setFontSize(Math.max(10, fontSize - 1))}
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                  >
                    A-
                  </Button>
                  <span className="text-xs text-gray-500">{fontSize}px</span>
                  <Button
                    onClick={() => setFontSize(Math.min(20, fontSize + 1))}
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                  >
                    A+
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default CodeEditor; 