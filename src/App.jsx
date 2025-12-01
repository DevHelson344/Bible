import { useState, useEffect } from 'react'
import { useVerse } from './hooks/useVerse'
import { useReflections } from './hooks/useReflections'
import Toast from './components/Toast'
import VerseCard from './components/VerseCard'
import ReflectionForm from './components/ReflectionForm'
import SearchBox from './components/SearchBox'
import HistoryList from './components/HistoryList'

function App() {
  const { verse, loading, error, loadTodayVerse, getNewVerse, handleSearch } = useVerse()
  const { history, favorites, saveReflection, deleteReflection, toggleFavoriteVerse } = useReflections()
  
  const [reflection, setReflection] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    loadTodayVerse()
  }, [])

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

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

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={getNewVerse}
                disabled={loading}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Buscar versículo aleatório"
              >
                🎲 Versículo Aleatório
              </button>
              <button
                onClick={loadTodayVerse}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Carregar versículo do dia"
              >
                🌅 Versículo do Dia
              </button>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold flex items-center gap-2"
                aria-label="Abrir busca de versículo"
              >
                🔍 Buscar Versículo
              </button>
              <button
                onClick={handleShare}
                disabled={!verse}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Compartilhar versículo"
              >
                📤 Compartilhar
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
