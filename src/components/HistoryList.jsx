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
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-purple-100 p-8 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-orange-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-slate-800">
            Histórico de Reflexões
          </h3>
        </div>
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`px-4 py-2 rounded-xl transition-all duration-300 font-semibold shadow-md hover:scale-105 ${
            showFavoritesOnly 
              ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
        className="w-full p-3 mb-4 bg-white border border-purple-100 rounded-xl text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all hover:border-purple-200"
        aria-label="Filtrar reflexões"
      />

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredHistory.length === 0 ? (
          <p className="text-slate-400 text-center py-12">Nenhuma reflexão encontrada</p>
        ) : (
          filteredHistory.map((entry) => (
            <div key={entry.id} className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl p-5 border border-purple-100 hover:border-purple-200 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  <p className="text-slate-600 text-sm font-medium">{entry.date}</p>
                  {entry.isFavorite && <span className="text-orange-500 text-lg">⭐</span>}
                </div>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-all duration-300 px-2 py-1 rounded-lg hover:bg-red-100"
                  aria-label="Deletar reflexão"
                >
                  🗑️
                </button>
              </div>
              <p className="text-slate-600 text-sm italic mb-3 bg-white/60 rounded-xl p-3 border border-purple-100">
                "{entry.verse.text}" - <span className="text-purple-600 font-semibold">{entry.verse.reference}</span>
              </p>
              <p className="text-slate-700 leading-relaxed">{entry.reflection}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
