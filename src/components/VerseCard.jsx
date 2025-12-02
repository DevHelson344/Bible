export default function VerseCard({ verse, loading, onFavorite, isFavorite }) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="relative inline-block">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-500 mx-auto"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200 to-orange-200 animate-pulse blur-xl"></div>
        </div>
        <p className="mt-6 text-slate-600 text-lg font-light">Carregando palavra sagrada...</p>
      </div>
    )
  }

  return (
    <div className="text-center py-6">
      <div className="bg-gradient-to-br from-purple-50 to-orange-50 rounded-2xl p-8 mb-6 border border-purple-100 relative hover:border-purple-200 transition-all duration-300 group">
        <button
          onClick={onFavorite}
          className="absolute top-4 right-4 text-3xl hover:scale-125 transition-all duration-300 filter drop-shadow-sm"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-100/0 via-orange-100/30 to-purple-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        <p className="text-xl md:text-2xl text-slate-700 font-light italic leading-relaxed mb-6 pr-8 relative z-10">
          "{verse.text}"
        </p>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-orange-500 text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
          <span className="text-sm">✨</span>
          {verse.reference}
        </div>
      </div>
    </div>
  )
}
