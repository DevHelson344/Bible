import { useState } from 'react'

export default function HistoryList({ history, onDelete }) {
  const [filter, setFilter] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const filteredHistory = history.filter(entry => {
    const matchesFilter = entry.reflection.toLowerCase().includes(filter.toLowerCase()) ||
                         entry.verse.text.toLowerCase().includes(filter.toLowerCase()) ||
                         entry.verse.reference.toLowerCase().includes(filter.toLowerCase())
    const matchesFavorite = !showFavoritesOnly || entry.isFavorite
    return matchesFilter && matchesFavorite
  })

  if (history.length === 0) return null

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-8 hover:border-purple-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Histórico de Reflexões
          </h3>
        </div>
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`px-4 py-2 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:scale-105 ${
            showFavoritesOnly 
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-amber-500/50' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          ⭐ {showFavoritesOnly ? 'Todos' : 'Favoritos'}
        </button>
      </div>

      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="🔍 Filtrar reflexões..."
        className="w-full p-3 mb-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-white/10"
        aria-label="Filtrar reflexões"
      />

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredHistory.length === 0 ? (
          <p className="text-white/40 text-center py-12">Nenhuma reflexão encontrada</p>
        ) : (
          filteredHistory.map((entry) => (
            <div key={entry.id} className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur rounded-2xl p-5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  <p className="text-white/60 text-sm font-medium">{entry.date}</p>
                  {entry.isFavorite && <span className="text-amber-400 text-lg">⭐</span>}
                </div>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all duration-300 px-2 py-1 rounded-lg hover:bg-red-500/20"
                  aria-label="Deletar reflexão"
                >
                  🗑️
                </button>
              </div>
              <p className="text-white/80 text-sm italic mb-3 bg-black/20 rounded-xl p-3 border border-white/5">
                "{entry.verse.text}" - <span className="text-purple-400 font-semibold">{entry.verse.reference}</span>
              </p>
              <p className="text-white/90 leading-relaxed">{entry.reflection}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
