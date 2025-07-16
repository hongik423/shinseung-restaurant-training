import { ArrowRight, Star, Check } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 헤더 */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">내 랜딩페이지</h1>
        <nav className="space-x-6">
          <a href="#features" className="text-gray-600 hover:text-blue-600">기능</a>
          <a href="#pricing" className="text-gray-600 hover:text-blue-600">가격</a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600">연락처</a>
        </nav>
      </header>

      {/* 히어로 섹션 */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          당신의 <span className="text-blue-600">꿈을 현실로</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          혁신적인 솔루션으로 더 나은 미래를 만들어보세요. 
          간단하고 효과적인 도구로 성공을 향한 첫 걸음을 내딛으세요.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
            지금 시작하기
            <ArrowRight size={20} />
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            더 알아보기
          </button>
        </div>
      </section>

      {/* 기능 섹션 */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">주요 기능</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Star className="text-blue-600" size={24} />
            </div>
            <h4 className="text-xl font-semibold mb-2">간편한 사용</h4>
            <p className="text-gray-600">직관적인 인터페이스로 누구나 쉽게 사용할 수 있습니다.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Check className="text-green-600" size={24} />
            </div>
            <h4 className="text-xl font-semibold mb-2">검증된 품질</h4>
            <p className="text-gray-600">수많은 사용자들이 검증한 안정적인 서비스입니다.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <ArrowRight className="text-purple-600" size={24} />
            </div>
            <h4 className="text-xl font-semibold mb-2">빠른 성장</h4>
            <p className="text-gray-600">효율적인 도구로 목표를 빠르게 달성하세요.</p>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">지금 바로 시작하세요</h3>
          <p className="text-xl mb-8">더 나은 미래를 위한 첫 걸음을 내딛어보세요.</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            무료로 시작하기
          </button>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 내 랜딩페이지. 모든 권리 보유.</p>
        </div>
      </footer>
    </div>
  )
}
