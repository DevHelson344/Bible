export default function VerseCard({ verse, loading, onFavorite, isFavorite }) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-yellow-400 mx-auto"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 animate-pulse"></div>
        </div>
        <p className="mt-4 text-white/70 text-lg">Carregando palavra sagrada...</p>
      </div>
    )
  }

  return (
    <div className="text-center py-6">
      <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 mb-6 border border-white/10 relative">
        <button
          onClick={onFavorite}
          className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
        <p className="text-xl md:text-2xl text-white font-light italic leading-relaxed mb-4 pr-8">
          "{verse.text}"
        </p>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-semibold">
          <span className="text-sm">✨</span>
          {verse.reference}
        </div>
      </div>
    </div>
  )
}
