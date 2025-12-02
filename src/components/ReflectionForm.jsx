export default function ReflectionForm({ reflection, onChange, onSave, saving }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">💭</span>
        <span>Sua Reflexão</span>
      </h3>
      <textarea
        value={reflection}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Compartilhe seus pensamentos sobre este versículo..."
        className="w-full p-4 bg-white border border-purple-100 rounded-2xl text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-purple-300 focus:border-transparent resize-none transition-all duration-300 hover:border-purple-200"
        rows="4"
        aria-label="Campo de reflexão"
      />
      <button
        onClick={onSave}
        disabled={saving || !reflection.trim()}
        className="mt-4 bg-gradient-to-r from-purple-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
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
