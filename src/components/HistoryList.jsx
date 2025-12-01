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
    <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-white">Histórico de Reflexões</h3>
        </div>
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`px-4 py-2 rounded-xl transition-all duration-300 font-semibold ${
            showFavoritesOnly 
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' 
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
        className="w-full p-3 mb-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        aria-label="Filtrar reflexões"
      />

      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredHistory.length === 0 ? (
          <p className="text-white/50 text-center py-8">Nenhuma reflexão encontrada</p>
        ) : (
          filteredHistory.map((entry) => (
            <div key={entry.id} className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-sm">📅</span>
                  <p className="text-white/70 text-sm font-medium">{entry.date}</p>
                  {entry.isFavorite && <span className="text-yellow-400">⭐</span>}
                </div>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all duration-300 px-2 py-1 rounded hover:bg-red-500/20"
                  aria-label="Deletar reflexão"
                >
                  🗑️
                </button>
              </div>
              <p className="text-white/80 text-sm italic mb-3 bg-white/5 rounded-lg p-3">
                "{entry.verse.text}" - <span className="text-yellow-400 font-semibold">{entry.verse.reference}</span>
              </p>
              <p className="text-white leading-relaxed">{entry.reflection}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
