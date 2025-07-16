import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini API 키 (환경 변수에서 가져오기)
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// API 키 검증 (빌드 시점에서는 오류를 던지지 않음)
let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

if (!GEMINI_API_KEY) {
  console.warn('⚠️ Gemini API 키가 설정되지 않았습니다.');
  console.warn('📋 설정 방법:');
  console.warn('1. https://aistudio.google.com/app/apikey 에서 API 키 생성');
  console.warn('2. .env.local 파일에 NEXT_PUBLIC_GEMINI_API_KEY=your_api_key 추가');
  console.warn('3. 개발 서버 재시작 (npm run dev)');
} else {
  // Gemini AI 인스턴스 생성
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  
  // 모델 설정
  model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
}

// 채팅 메시지 타입 정의
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// API 호출 재시도 함수
async function retryApiCall<T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error as Error;
      console.warn(`🔄 API 호출 실패 (${attempt}/${maxRetries}):`, error);
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // 지수 백오프 (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
    }
  }
  
  throw lastError!;
}

// 중앙 에러 메시지 관리 함수
function getErrorMessage(error: unknown, context: string): string {
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();
    
    if (errorMessage.includes('quota')) {
      return `🚨 **API 할당량 초과**

**문제**: Google Gemini API 무료 할당량을 초과했습니다.

**해결 방법**:
1. **잠시 기다리기** - 할당량이 재설정될 때까지 대기 (보통 1분)
2. **API 키 재생성** - [Google AI Studio](https://aistudio.google.com/app/apikey)에서 새 키 생성
3. **유료 플랜 고려** - 더 많은 할당량 필요 시 유료 플랜 업그레이드

**임시 해결책**: 
- 잠시 후 다시 시도해주세요
- 또는 일반적인 문제 해결 방법을 검색해보세요`;
    }
    
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return `🌐 **네트워크 연결 문제**

**문제**: 인터넷 연결이 불안정하거나 Google 서비스에 접근할 수 없습니다.

**해결 방법**:
1. **인터넷 연결 확인** - Wi-Fi 또는 이더넷 연결 상태 점검
2. **방화벽 확인** - 보안 프로그램이 API 호출을 차단하는지 확인
3. **VPN 해제** - VPN 사용 시 일시적으로 해제해보기
4. **DNS 변경** - 8.8.8.8 또는 1.1.1.1로 DNS 서버 변경

**재시도**: 잠시 후 다시 시도해주세요`;
    }
    
    if (errorMessage.includes('unauthorized') || errorMessage.includes('api key')) {
      return `🔑 **API 키 인증 실패**

**문제**: API 키가 유효하지 않거나 권한이 없습니다.

**해결 방법**:
1. **API 키 재확인** - [Google AI Studio](https://aistudio.google.com/app/apikey)에서 키 상태 확인
2. **새 키 생성** - 기존 키 삭제 후 새로운 키 생성
3. **환경 변수 설정** - \`.env.local\` 파일에 올바른 키 설정:
   \`\`\`
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   \`\`\`
4. **권한 확인** - API 키에 Gemini 사용 권한이 있는지 확인

**참고**: API 키는 비밀로 관리해야 합니다`;
    }
  }
  
  return `😔 **AI 서비스 일시적 장애**

죄송합니다. ${context} 중 일시적인 문제가 발생했습니다.

**해결 방법**:
1. **새로고침** - 페이지를 새로고침해주세요
2. **잠시 대기** - 1-2분 후 다시 시도해주세요
3. **브라우저 재시작** - 브라우저를 완전히 닫고 다시 열어주세요

문제가 계속되면 네트워크 연결을 확인해주세요.`;
}

// 오류 분석 및 해결 방법 제안
export async function analyzeError(errorMessage: string, codeContext?: string): Promise<string> {
  try {
    const prompt = `
당신은 초보 개발자를 위한 오류수정 전문 AI 어시스턴트입니다. 
환경설정, 프롬프터 최적화, 코드 에러 디버깅에 특화되어 있습니다.

🔍 오류 분석 요청:
${errorMessage}

${codeContext ? `
📝 코드 컨텍스트:
${codeContext}
` : ''}

⚡ 답변 형식:
1. 🎯 **문제 원인 즉시 파악** - 핵심 원인을 간단명료하게
2. 🔧 **단계별 해결 방법** - 실행 가능한 구체적인 단계
3. 🛡️ **예방 방법** - 같은 문제 재발 방지
4. 📚 **추가 참고 자료** - 관련 문서나 도구

특별 요청:
- 초보자도 이해할 수 있도록 친절하고 자세하게 설명
- 코드 예시는 실제 실행 가능한 형태로 제공
- 환경설정 문제는 OS별 해결 방법 제시
- 프롬프트 관련 문제는 개선된 프롬프트 예시 제공

답변은 한국어로 해주세요.
`;

    const result = await retryApiCall(async () => {
      return await model.generateContent(prompt);
    });
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API 오류:', error);
    return getErrorMessage(error, '오류 분석');
  }
}

// 환경설정 오류 해결 전문 함수
export async function resolveEnvironmentError(errorMessage: string, systemInfo?: string): Promise<string> {
  try {
    const prompt = `
당신은 개발 환경설정 오류 해결 전문가입니다.
Node.js, npm, 개발 서버, 패키지 관리, 포트 충돌 등 환경 관련 모든 문제를 해결할 수 있습니다.

🖥️ 환경설정 오류:
${errorMessage}

${systemInfo ? `
💻 시스템 정보:
${systemInfo}
` : ''}

🚀 해결 방법 (단계별):
1. **즉시 해결책** - 지금 당장 실행할 수 있는 명령어
2. **원인 분석** - 왜 이런 문제가 발생했는지
3. **상세 해결 과정** - 각 단계별 자세한 설명
4. **검증 방법** - 해결되었는지 확인하는 방법
5. **예방 조치** - 같은 문제 재발 방지

특별 요청:
- Windows/Mac/Linux 환경별 해결 방법 제시
- 터미널 명령어는 복사 가능한 형태로 제공
- 에러 메시지 해석 및 의미 설명
- 대안 해결 방법도 함께 제시

답변은 한국어로 해주세요.
`;

    const result = await retryApiCall(async () => {
      return await model.generateContent(prompt);
    });
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API 오류:', error);
    return getErrorMessage(error, '환경설정 오류 분석');
  }
}

// 프롬프터 최적화 전문 함수
export async function optimizePrompt(currentPrompt: string, context?: string): Promise<string> {
  try {
    const prompt = `
당신은 AI 프롬프터 최적화 전문가입니다.
Cursor AI, ChatGPT, Claude 등 다양한 AI 도구에서 효과적인 프롬프트 작성을 도와줍니다.

🎯 현재 프롬프트:
${currentPrompt}

${context ? `
📋 컨텍스트 정보:
${context}
` : ''}

⚡ 프롬프트 개선 방향:
1. **개선된 프롬프트** - 최적화된 버전 제공
2. **개선 포인트** - 어떤 부분이 개선되었는지
3. **효과적인 작성법** - 좋은 프롬프트 작성 원칙
4. **사용 팁** - 실제 사용 시 주의사항
5. **추가 변형** - 다른 상황에서 활용 가능한 변형

특별 요청:
- 구체적이고 실행 가능한 프롬프트 제공
- AI 모델별 최적화 방법 안내
- 개발 작업에 특화된 프롬프트 템플릿 제공
- 단계별 프롬프트 구성 방법 설명

답변은 한국어로 해주세요.
`;

    const result = await retryApiCall(async () => {
      return await model.generateContent(prompt);
    });
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API 오류:', error);
    return getErrorMessage(error, '프롬프트 최적화');
  }
}

// 일반 질문 처리
export async function handleGeneralQuestion(question: string): Promise<string> {
  try {
    const prompt = `
당신은 웹 개발(HTML, CSS, JavaScript, React, Next.js) 학습을 도와주는 친절한 AI 어시스턴트입니다. 
초보자도 쉽게 이해할 수 있도록 설명해주세요.

질문: ${question}

답변 조건:
- 한국어로 답변
- 초보자 수준에 맞춰 설명
- 실용적인 예시 포함
- 관련 학습 자료나 추천 사항 제공
- 단계별로 설명

답변:
`;

    const result = await retryApiCall(async () => {
      return await model.generateContent(prompt);
    });
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API 오류:', error);
    return getErrorMessage(error, '일반 질문 처리');
  }
}

// 코드 리뷰 및 개선 제안
export async function reviewCode(code: string, language: string = 'javascript'): Promise<string> {
  try {
    const prompt = `
당신은 코드 리뷰 전문가입니다. 다음 ${language} 코드를 분석하고 개선사항을 제안해주세요.

코드:
\`\`\`${language}
${code}
\`\`\`

다음 관점에서 분석해주세요:
1. 코드 품질 (가독성, 성능, 보안)
2. 베스트 프랙티스 준수
3. 잠재적 문제점
4. 개선 제안 (구체적인 코드 예시 포함)

답변은 한국어로 해주세요.
`;

    const result = await retryApiCall(async () => {
      return await model.generateContent(prompt);
    });
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API 오류:', error);
    return getErrorMessage(error, '코드 리뷰');
  }
}

// 학습 가이드 생성
export async function generateLearningGuide(topic: string): Promise<string> {
  try {
    const prompt = `
"${topic}"에 대한 초보자를 위한 학습 가이드를 만들어주세요.

가이드 구조:
1. 개념 설명
2. 기초 문법/사용법
3. 실습 예제 (코드 포함)
4. 자주 하는 실수와 해결방법
5. 다음 단계 학습 추천

답변은 한국어로 해주세요.
`;

    const result = await retryApiCall(async () => {
      return await model.generateContent(prompt);
    });
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API 오류:', error);
    return getErrorMessage(error, '학습 가이드 생성');
  }
} 