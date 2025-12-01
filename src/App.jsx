import { useState, useEffect } from 'react'
import { getRandomVerse, getVerseOfTheDay, searchVerse } from './bibleService'

function App() {
  const [verse, setVerse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reflection, setReflection] = useState('')
  const [history, setHistory] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    loadTodayVerse()
    loadHistory()
  }, [])

  const loadTodayVerse = async () => {
    setLoading(true)
    const verseData = await getVerseOfTheDay()
    setVerse(verseData)
    setLoading(false)
  }

  const getNewVerse = async () => {
    setLoading(true)
    const verseData = await getRandomVerse()
    setVerse(verseData)
    setLoading(false)
  }

  const saveReflection = () => {
    if (!reflection.trim()) return
    
    const newEntry = {
      id: Date.now(),
      verse: verse,
      reflection: reflection,
      date: new Date().toLocaleDateString('pt-BR')
    }
    
    const updatedHistory = [newEntry, ...history]
    setHistory(updatedHistory)
    localStorage.setItem('devotional-history', JSON.stringify(updatedHistory))
    setReflection('')
    alert('Reflexão salva!')
  }

  const loadHistory = () => {
    const saved = localStorage.getItem('devotional-history')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }

  const shareVerse = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Versículo do Dia',
        text: `"${verse.text}" - ${verse.reference}`
      })
    } else {
      navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference}`)
      alert('Versículo copiado!')
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setLoading(true)
    try {
      const verseData = await searchVerse(searchQuery)
      setVerse(verseData)
    } catch (error) {
      alert('Versículo não encontrado. Tente: "João 3:16" ou "Salmos 23:1"')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent"></div>
      
      <div className="relative z-10 p-4 min-h-screen flex flex-col">
        <div className="max-w-4xl mx-auto w-full">
          <header className="text-center mb-12 pt-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl animate-float animate-glow">
              <span className="text-3xl">📖</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
              Devocional Diário
            </h1>
            <p className="text-white/80 text-lg font-light">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </header>

          <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">Versículo do Dia</h2>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-yellow-400 mx-auto"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 animate-pulse"></div>
                </div>
                <p className="mt-4 text-white/70 text-lg">Carregando palavra sagrada...</p>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 mb-6 border border-white/10">
                  <p className="text-xl md:text-2xl text-white font-light italic leading-relaxed mb-4">
                    "{verse.text}"
                  </p>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-semibold">
                    <span className="text-sm">✨</span>
                    {verse.reference}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-yellow-400">💭</span>
                Sua Reflexão
              </h3>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Compartilhe seus pensamentos sobre este versículo..."
                className="w-full p-4 bg-white/10 backdrop-blur border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none transition-all duration-300"
                rows="4"
              />
              <button
                onClick={saveReflection}
                className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
              >
                💾 Salvar Reflexão
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={getNewVerse}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold flex items-center gap-2"
              >
                🎲 Versículo Aleatório
              </button>
              <button
                onClick={loadTodayVerse}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold flex items-center gap-2"
              >
                🌅 Versículo do Dia
              </button>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold flex items-center gap-2"
              >
                🔍 Buscar Versículo
              </button>
              <button
                onClick={shareVerse}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold flex items-center gap-2"
              >
                📤 Compartilhar
              </button>
            </div>

            {showSearch && (
              <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span className="text-indigo-400">🔍</span>
                  Buscar Versículo Específico
                </h4>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ex: João 3:16, Salmos 23:1, Romanos 8:28"
                    className="flex-1 p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold"
                  >
                    Buscar
                  </button>
                </div>
              </div>
            )}
          </div>

          {history.length > 0 && (
            <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-white">Histórico de Reflexões</h3>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                {history.map((entry) => (
                  <div key={entry.id} className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-400 text-sm">📅</span>
                      <p className="text-white/70 text-sm font-medium">{entry.date}</p>
                    </div>
                    <p className="text-white/80 text-sm italic mb-3 bg-white/5 rounded-lg p-3">
                      "{entry.verse.text}" - <span className="text-yellow-400 font-semibold">{entry.verse.reference}</span>
                    </p>
                    <p className="text-white leading-relaxed">{entry.reflection}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App