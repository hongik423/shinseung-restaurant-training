'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Terminal, Copy, CheckCircle, X, AlertCircle, RefreshCw } from 'lucide-react';

interface TerminalCheckerProps {
  command: string;
  expectedOutput?: string;
  title: string;
  description: string;
  onResult: (success: boolean, output: string) => void;
}

const TerminalChecker: React.FC<TerminalCheckerProps> = ({
  command,
  expectedOutput,
  title,
  description,
  onResult,
}) => {
  const [userOutput, setUserOutput] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const checkOutput = async () => {
    setIsChecking(true);
    
    // 간단한 유효성 검사
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isValid = validateOutput(userOutput);
    setResult(isValid ? 'success' : 'error');
    onResult(isValid, userOutput);
    
    setIsChecking(false);
  };

  const validateOutput = (output: string): boolean => {
    if (!output.trim()) return false;
    
    // 명령어별 유효성 검사
    switch (command) {
      case 'node --version':
        return /^v\d+\.\d+\.\d+/.test(output.trim());
      case 'npm --version':
        return /^\d+\.\d+\.\d+/.test(output.trim());
      case 'git --version':
        return /git version/.test(output.toLowerCase());
      default:
        return true;
    }
  };

  const getHelpMessage = () => {
    switch (command) {
      case 'node --version':
        return {
          notInstalled: '설치되어 있지 않다면 https://nodejs.org 에서 다운로드하세요.',
          expectedFormat: '예상 출력 형식: v18.17.0',
          troubleshooting: [
            '1. 설치 후 터미널/명령 프롬프트를 다시 시작하세요',
            '2. 환경 변수 PATH에 Node.js가 추가되었는지 확인하세요',
            '3. 관리자 권한으로 설치를 시도해보세요'
          ]
        };
      case 'npm --version':
        return {
          notInstalled: 'npm은 Node.js와 함께 자동으로 설치됩니다.',
          expectedFormat: '예상 출력 형식: 9.6.7',
          troubleshooting: [
            '1. Node.js가 제대로 설치되었는지 확인하세요',
            '2. 터미널을 완전히 종료하고 다시 시작하세요',
            '3. Windows에서 "npm.cmd --version"을 시도해보세요',
            '4. 환경 변수 PATH에 Node.js 경로가 포함되어 있는지 확인하세요',
            '5. npm cache clean --force 명령어를 실행해보세요',
            '6. Node.js를 재설치해보세요'
          ]
        };
      case 'git --version':
        return {
          notInstalled: '설치되어 있지 않다면 https://git-scm.com 에서 다운로드하세요.',
          expectedFormat: '예상 출력 형식: git version 2.41.0',
          troubleshooting: [
            '1. 설치 후 터미널/명령 프롬프트를 다시 시작하세요',
            '2. 환경 변수 PATH에 Git이 추가되었는지 확인하세요',
            '3. Git Bash를 사용해보세요 (Windows)'
          ]
        };
      default:
        return {
          notInstalled: '해당 프로그램을 설치해주세요.',
          expectedFormat: '올바른 출력 형식을 확인해주세요.',
          troubleshooting: ['문제가 지속되면 지원팀에 문의하세요.']
        };
    }
  };

  const helpMessage = getHelpMessage();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          {title}
        </CardTitle>
        <p className="text-sm text-secondary-600">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Command to execute */}
        <div>
          <Label htmlFor="command">실행할 명령어</Label>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 bg-black text-green-400 p-3 rounded-lg font-mono text-sm">
              {command}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(command)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* User input for output */}
        <div>
          <Label htmlFor="output">터미널 출력 결과를 붙여넣기 하세요</Label>
          <Textarea
            id="output"
            value={userOutput}
            onChange={(e) => setUserOutput(e.target.value)}
            placeholder="터미널에서 위 명령어를 실행한 결과를 여기에 붙여넣기 하세요..."
            className="mt-1 font-mono text-sm"
            rows={3}
          />
        </div>

        {/* Check button */}
        <Button
          onClick={checkOutput}
          disabled={!userOutput.trim() || isChecking}
          className="w-full"
        >
          {isChecking ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              확인 중...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              설치 확인
            </>
          )}
        </Button>

        {/* Result display */}
        {result && (
          <Alert className={result === 'success' ? 'border-green-500' : 'border-red-500'}>
            <div className="flex items-center gap-2">
              {result === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    설치 확인 완료
                  </Badge>
                </>
              ) : (
                <>
                  <X className="w-4 h-4 text-red-500" />
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    설치 확인 실패
                  </Badge>
                </>
              )}
            </div>
            <AlertDescription className="mt-2">
              {result === 'success' ? (
                <div className="text-green-700">
                  ✅ 올바르게 설치되었습니다! 다음 단계로 진행할 수 있습니다.
                </div>
              ) : (
                <div className="text-red-700">
                  ❌ 설치가 확인되지 않았습니다. 아래 도움말을 참고하세요.
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Help section */}
        <div className="bg-secondary-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            도움말
          </h4>
          <div className="text-sm text-secondary-600 space-y-2">
            <p>• {helpMessage.notInstalled}</p>
            <p>• {helpMessage.expectedFormat}</p>
            
            {result === 'error' && (
              <div className="mt-3">
                <p className="font-medium text-secondary-800">문제 해결 방법:</p>
                <ul className="mt-1 space-y-1">
                  {helpMessage.troubleshooting.map((tip, index) => (
                    <li key={index} className="text-xs">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Quick install links */}
        <div className="flex gap-2">
          {command === 'node --version' && (
            <Button variant="outline" size="sm" asChild>
              <a href="https://nodejs.org" target="_blank" rel="noopener">
                Node.js 다운로드
              </a>
            </Button>
          )}
          {command === 'git --version' && (
            <Button variant="outline" size="sm" asChild>
              <a href="https://git-scm.com" target="_blank" rel="noopener">
                Git 다운로드
              </a>
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <a href="/guide" target="_blank" rel="noopener">
              상세 설치 가이드
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TerminalChecker; 