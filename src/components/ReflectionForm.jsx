export default function ReflectionForm({ reflection, onChange, onSave, saving }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-yellow-400">💭</span>
        Sua Reflexão
      </h3>
      <textarea
        value={reflection}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Compartilhe seus pensamentos sobre este versículo..."
        className="w-full p-4 bg-white/10 backdrop-blur border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none transition-all duration-300"
        rows="4"
        aria-label="Campo de reflexão"
      />
      <button
        onClick={onSave}
        disabled={saving || !reflection.trim()}
        className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
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
