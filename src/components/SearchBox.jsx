export default function SearchBox({ searchQuery, onChange, onSearch, loading }) {
  return (
    <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
        <span className="text-indigo-400">🔍</span>
        Buscar Versículo Específico
      </h4>
      <div className="flex gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ex: João 3:16, Salmos 23:1, Romanos 8:28"
          className="flex-1 p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          aria-label="Campo de busca de versículo"
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
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
