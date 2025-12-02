export default function SearchBox({ searchQuery, onChange, onSearch, loading }) {
  return (
    <div className="mt-6 p-5 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
        <span className="text-2xl">🔍</span>
        <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
          Buscar Versículo Específico
        </span>
      </h4>
      <div className="flex gap-3 flex-col sm:flex-row">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ex: João 3:16, Salmos 23:1, Romanos 8:28"
          className="flex-1 p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:bg-white/10"
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          aria-label="Campo de busca de versículo"
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] shadow-lg hover:shadow-indigo-500/50 hover:scale-105"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mx-auto"></div>
          ) : (
            'Buscar'
          )}
        </button>
      </div>
    </div>
  )
}
