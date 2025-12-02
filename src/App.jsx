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
    loadVerseOfDay()
    getNewVerse() // Carrega um versículo aleatório para explorar
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
      
      // Gera um versículo fixo baseado na data
      const { getRandomVerse } = await import('./bibleService')
      const verse = await getRandomVerse()
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
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-orange-100 to-pink-100 relative overflow-hidden">
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

      <div className="absolute inset-0 opacity-30" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-200/30 via-orange-200/30 to-pink-200/30"></div>
      
      <div className="relative z-10 p-4 min-h-screen flex flex-col">
        <div className="max-w-6xl mx-auto w-full">
          <header className="text-center mb-8 pt-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-orange-500 rounded-2xl mb-4 shadow-xl animate-float">
              <span className="text-3xl">📖</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 via-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Devocional Diário
            </h1>
            <p className="text-slate-700 text-sm font-medium">
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
            <div className="mb-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-2 border-purple-300 p-6 hover:shadow-2xl transition-all duration-300 relative">
              <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                📌 Fixo
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌅</span>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Versículo do Dia</h2>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-orange-100 rounded-2xl p-6 border border-purple-200">
                <p className="text-lg md:text-xl text-slate-800 font-light italic leading-relaxed mb-4">
                  "{verseOfDay.text}"
                </p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                  <span>✨</span>
                  {verseOfDay.reference}
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3 text-center">
                Este versículo permanece o mesmo durante todo o dia
              </p>
            </div>
          )}

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-purple-100 p-8 mb-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-orange-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-800">Explorar Versículos</h2>
              </div>
              <button
                onClick={() => setShowBibleReader(true)}
                className="bg-gradient-to-r from-purple-500 to-orange-500 text-white px-4 py-2 rounded-xl hover:from-purple-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-semibold flex items-center gap-2 text-sm"
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
                className="bg-gradient-to-br from-purple-400 to-purple-500 text-white px-4 py-3 rounded-xl hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Buscar versículo aleatório"
              >
                <span className="text-xl">🎲</span>
                <span className="hidden sm:inline">Aleatório</span>
              </button>
              <button
                onClick={loadTodayVerse}
                disabled={loading}
                className="bg-gradient-to-br from-orange-400 to-orange-500 text-white px-4 py-3 rounded-xl hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Carregar versículo do dia"
              >
                <span className="text-xl">🔄</span>
                <span className="hidden sm:inline">Atualizar</span>
              </button>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="bg-gradient-to-br from-purple-400 to-orange-400 text-white px-4 py-3 rounded-xl hover:from-purple-500 hover:to-orange-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold flex items-center justify-center gap-2"
                aria-label="Abrir busca de versículo"
              >
                <span className="text-xl">🔍</span>
                <span className="hidden sm:inline">Buscar</span>
              </button>
              <button
                onClick={handleShare}
                disabled={!verse}
                className="bg-gradient-to-br from-slate-500 to-slate-600 text-white px-4 py-3 rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
