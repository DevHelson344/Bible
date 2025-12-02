import { useState, useEffect } from 'react'
import { useVerse } from './hooks/useVerse'
import { useReflections } from './hooks/useReflections'
import Toast from './components/Toast'
import VerseCard from './components/VerseCard'
import ReflectionForm from './components/ReflectionForm'
import SearchBox from './components/SearchBox'
import HistoryList from './components/HistoryList'
import BibleReader from './components/BibleReader'

function App() {
  const { verse, loading, error, loadTodayVerse, getNewVerse, handleSearch } = useVerse()
  const { history, favorites, saveReflection, deleteReflection, toggleFavoriteVerse } = useReflections()
  
  const [reflection, setReflection] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [showBibleReader, setShowBibleReader] = useState(false)
  const [verseOfDay, setVerseOfDay] = useState(null)

  useEffect(() => {
    loadTodayVerse()
    loadVerseOfDay()
  }, [])

  const loadVerseOfDay = async () => {
    try {
      const storedDate = localStorage.getItem('verseOfDayDate')
      const today = new Date().toDateString()
      
      if (storedDate === today) {
        const storedVerse = localStorage.getItem('verseOfDay')
        if (storedVerse) {
          setVerseOfDay(JSON.parse(storedVerse))
          return
        }
      }
      
      const { getVerseOfTheDay } = await import('./bibleService')
      const verse = await getVerseOfTheDay()
      setVerseOfDay(verse)
      localStorage.setItem('verseOfDay', JSON.stringify(verse))
      localStorage.setItem('verseOfDayDate', today)
    } catch (error) {
      console.error('Erro ao carregar versículo do dia:', error)
    }
  }

  useEffect(() => {
    if (error) {
      showToast(error, 'error')
    }
  }, [error])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const handleSaveReflection = async () => {
    if (!reflection.trim()) return
    
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    saveReflection(verse, reflection)
    setReflection('')
    setSaving(false)
    showToast('Reflexão salva com sucesso!', 'success')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Versículo do Dia',
        text: `"${verse.text}" - ${verse.reference}`
      })
    } else {
      navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference}`)
      showToast('Versículo copiado para área de transferência!', 'info')
    }
  }

  const handleSearchVerse = () => {
    handleSearch(searchQuery)
    setShowSearch(false)
    setSearchQuery('')
  }

  const handleDeleteReflection = (id) => {
    if (confirm('Deseja realmente deletar esta reflexão?')) {
      deleteReflection(id)
      showToast('Reflexão deletada', 'info')
    }
  }

  const isFavorite = verse ? favorites.has(verse.reference) : false

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {showBibleReader && (
        <BibleReader onClose={() => setShowBibleReader(false)} />
      )}

      <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-purple-900/10 to-black/30"></div>
      
      <div className="relative z-10 p-4 min-h-screen flex flex-col">
        <div className="max-w-6xl mx-auto w-full">
          <header className="text-center mb-8 pt-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 rounded-2xl mb-4 shadow-2xl animate-float">
              <span className="text-3xl">✨</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-200 via-orange-300 to-pink-300 bg-clip-text text-transparent mb-2">
              Devocional Diário
            </h1>
            <p className="text-white/60 text-sm font-light">
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </header>

          {/* Versículo do Dia Fixo */}
          {verseOfDay && (
            <div className="mb-8 backdrop-blur-xl bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-pink-500/20 rounded-3xl shadow-2xl border border-amber-500/30 p-6 hover:shadow-amber-500/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌅</span>
                <h2 className="text-xl font-bold text-amber-300">Versículo do Dia</h2>
              </div>
              <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-lg md:text-xl text-white font-light italic leading-relaxed mb-4">
                  "{verseOfDay.text}"
                </p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black px-4 py-2 rounded-full font-semibold text-sm">
                  <span>✨</span>
                  {verseOfDay.reference}
                </div>
              </div>
            </div>
          )}

          <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-8 mb-8 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Explorar Versículos</h2>
              </div>
              <button
                onClick={() => setShowBibleReader(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold flex items-center gap-2 text-sm"
              >
                📖 Abrir Bíblia
              </button>
            </div>
            
            <VerseCard 
              verse={verse} 
              loading={loading}
              onFavorite={() => toggleFavoriteVerse(verse.reference)}
              isFavorite={isFavorite}
            />

            <ReflectionForm
              reflection={reflection}
              onChange={setReflection}
              onSave={handleSaveReflection}
              saving={saving}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              <button
                onClick={getNewVerse}
                disabled={loading}
                className="bg-gradient-to-br from-purple-500 to-pink-600 text-white px-4 py-3 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Buscar versículo aleatório"
              >
                <span className="text-xl">🎲</span>
                <span className="hidden sm:inline">Aleatório</span>
              </button>
              <button
                onClick={loadTodayVerse}
                disabled={loading}
                className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white px-4 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Carregar versículo do dia"
              >
                <span className="text-xl">🔄</span>
                <span className="hidden sm:inline">Atualizar</span>
              </button>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center gap-2"
                aria-label="Abrir busca de versículo"
              >
                <span className="text-xl">🔍</span>
                <span className="hidden sm:inline">Buscar</span>
              </button>
              <button
                onClick={handleShare}
                disabled={!verse}
                className="bg-gradient-to-br from-orange-500 to-red-600 text-white px-4 py-3 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Compartilhar versículo"
              >
                <span className="text-xl">📤</span>
                <span className="hidden sm:inline">Compartilhar</span>
              </button>
            </div>

            {showSearch && (
              <SearchBox
                searchQuery={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearchVerse}
                loading={loading}
              />
            )}
          </div>

          <HistoryList 
            history={history}
            onDelete={handleDeleteReflection}
          />
        </div>
      </div>
    </div>
  )
}

export default App
