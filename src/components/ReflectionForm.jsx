export default function ReflectionForm({ reflection, onChange, onSave, saving }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">💭</span>
        <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          Sua Reflexão
        </span>
      </h3>
      <textarea
        value={reflection}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Compartilhe seus pensamentos sobre este versículo..."
        className="w-full p-4 bg-white/5 backdrop-blur border border-white/10 rounded-2xl text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300 hover:bg-white/10"
        rows="4"
        aria-label="Campo de reflexão"
      />
      <button
        onClick={onSave}
        disabled={saving || !reflection.trim()}
        className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
      >
        {saving ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
            Salvando...
          </>
        ) : (
          <>💾 Salvar Reflexão</>
        )}
      </button>
    </div>
  )
}
