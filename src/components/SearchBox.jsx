export default function SearchBox({ searchQuery, onChange, onSearch, loading }) {
  return (
    <div className="mt-6 p-5 bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl border border-purple-100">
      <h4 className="text-slate-800 font-semibold mb-3 flex items-center gap-2">
        <span className="text-2xl">🔍</span>
        <span>Buscar Versículo Específico</span>
      </h4>
      <div className="flex gap-3 flex-col sm:flex-row">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ex: João 3:16, Salmos 23:1, Romanos 8:28"
          className="flex-1 p-3 bg-white border border-purple-100 rounded-xl text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all hover:border-purple-200"
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          aria-label="Campo de busca de versículo"
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-orange-600 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] shadow-md hover:shadow-lg hover:scale-105"
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
