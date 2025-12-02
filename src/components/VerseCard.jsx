export default function VerseCard({ verse, loading, onFavorite, isFavorite }) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="relative inline-block">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500/20 border-t-purple-500 mx-auto"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse blur-xl"></div>
        </div>
        <p className="mt-6 text-white/60 text-lg font-light">Carregando palavra sagrada...</p>
      </div>
    )
  }

  return (
    <div className="text-center py-6">
      <div className="bg-gradient-to-br from-white/5 via-purple-500/5 to-white/5 rounded-2xl p-8 mb-6 border border-white/10 relative backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 group">
        <button
          onClick={onFavorite}
          className="absolute top-4 right-4 text-3xl hover:scale-125 transition-all duration-300 filter drop-shadow-lg"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        <p className="text-xl md:text-2xl text-white/95 font-light italic leading-relaxed mb-6 pr-8 relative z-10">
          "{verse.text}"
        </p>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
          <span className="text-sm">✨</span>
          {verse.reference}
        </div>
      </div>
    </div>
  )
}
