import { useState, useEffect } from 'react'
import axios from 'axios'

export default function BibleReader({ onClose }) {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [selectedChapter, setSelectedChapter] = useState(1)
  const [chapterContent, setChapterContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showBookList, setShowBookList] = useState(true)

  const bibleBooks = [
    { name: 'Gênesis', id: 'Genesis', chapters: 50 },
    { name: 'Êxodo', id: 'Exodus', chapters: 40 },
    { name: 'Levítico', id: 'Leviticus', chapters: 27 },
    { name: 'Números', id: 'Numbers', chapters: 36 },
    { name: 'Deuteronômio', id: 'Deuteronomy', chapters: 34 },
    { name: 'Josué', id: 'Joshua', chapters: 24 },
    { name: 'Juízes', id: 'Judges', chapters: 21 },
    { name: 'Rute', id: 'Ruth', chapters: 4 },
    { name: '1 Samuel', id: '1Samuel', chapters: 31 },
    { name: '2 Samuel', id: '2Samuel', chapters: 24 },
    { name: '1 Reis', id: '1Kings', chapters: 22 },
    { name: '2 Reis', id: '2Kings', chapters: 25 },
    { name: 'Salmos', id: 'Psalms', chapters: 150 },
    { name: 'Provérbios', id: 'Proverbs', chapters: 31 },
    { name: 'Eclesiastes', id: 'Ecclesiastes', chapters: 12 },
    { name: 'Isaías', id: 'Isaiah', chapters: 66 },
    { name: 'Jeremias', id: 'Jeremiah', chapters: 52 },
    { name: 'Mateus', id: 'Matthew', chapters: 28 },
    { name: 'Marcos', id: 'Mark', chapters: 16 },
    { name: 'Lucas', id: 'Luke', chapters: 24 },
    { name: 'João', id: 'John', chapters: 21 },
    { name: 'Atos', id: 'Acts', chapters: 28 },
    { name: 'Romanos', id: 'Romans', chapters: 16 },
    { name: '1 Coríntios', id: '1Corinthians', chapters: 16 },
    { name: '2 Coríntios', id: '2Corinthians', chapters: 13 },
    { name: 'Gálatas', id: 'Galatians', chapters: 6 },
    { name: 'Efésios', id: 'Ephesians', chapters: 6 },
    { name: 'Filipenses', id: 'Philippians', chapters: 4 },
    { name: 'Colossenses', id: 'Colossians', chapters: 4 },
    { name: '1 Tessalonicenses', id: '1Thessalonians', chapters: 5 },
    { name: '2 Tessalonicenses', id: '2Thessalonians', chapters: 3 },
    { name: '1 Timóteo', id: '1Timothy', chapters: 6 },
    { name: '2 Timóteo', id: '2Timothy', chapters: 4 },
    { name: 'Tito', id: 'Titus', chapters: 3 },
    { name: 'Filemom', id: 'Philemon', chapters: 1 },
    { name: 'Hebreus', id: 'Hebrews', chapters: 13 },
    { name: 'Tiago', id: 'James', chapters: 5 },
    { name: '1 Pedro', id: '1Peter', chapters: 5 },
    { name: '2 Pedro', id: '2Peter', chapters: 3 },
    { name: '1 João', id: '1John', chapters: 5 },
    { name: '2 João', id: '2John', chapters: 1 },
    { name: '3 João', id: '3John', chapters: 1 },
    { name: 'Judas', id: 'Jude', chapters: 1 },
    { name: 'Apocalipse', id: 'Revelation', chapters: 22 }
  ]

  useEffect(() => {
    setBooks(bibleBooks)
  }, [])

  const loadChapter = async (book, chapter) => {
    setLoading(true)
    try {
      // Formata a requisição corretamente para a API
      const bookName = book.replace(/\s+/g, '')
      const response = await axios.get(
        `https://bible-api.com/${bookName}${chapter}?translation=almeida`,
        { timeout: 10000 }
      )
      setChapterContent(response.data)
      setShowBookList(false)
    } catch (error) {
      console.error('Erro ao carregar capítulo:', error)
      alert(`Erro ao carregar ${book} ${chapter}. Este livro pode não estar disponível na tradução Almeida.`)
    } finally {
      setLoading(false)
    }
  }

  const handleBookSelect = (book) => {
    setSelectedBook(book)
    setSelectedChapter(1)
    loadChapter(book.id, 1)
  }

  const handleChapterChange = (newChapter) => {
    if (newChapter >= 1 && newChapter <= selectedBook.chapters) {
      setSelectedChapter(newChapter)
      loadChapter(selectedBook.id, newChapter)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-purple-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-orange-500 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">📖</span>
            <div>
              <h2 className="text-2xl font-bold text-white">Bíblia Sagrada</h2>
              {selectedBook && (
                <p className="text-white/80 text-sm">
                  {selectedBook.name} - Capítulo {selectedChapter}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
            aria-label="Fechar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex h-[calc(90vh-100px)]">
          {/* Sidebar - Lista de Livros */}
          <div className={`${showBookList ? 'w-full md:w-80' : 'w-0 md:w-80'} transition-all duration-300 overflow-hidden border-r border-purple-100 bg-gradient-to-b from-purple-50 to-orange-50`}>
            <div className="p-4 bg-white/50">
              <input
                type="text"
                placeholder="Buscar livro..."
                className="w-full px-4 py-2 bg-white border border-purple-100 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
            <div className="overflow-y-auto h-full custom-scrollbar p-4">
              {books.map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleBookSelect(book)}
                  className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition-all ${
                    selectedBook?.id === book.id
                      ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white shadow-md'
                      : 'bg-white/60 text-slate-700 hover:bg-white'
                  }`}
                >
                  <div className="font-semibold">{book.name}</div>
                  <div className="text-xs opacity-70">{book.chapters} capítulos</div>
                </button>
              ))}
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="flex-1 flex flex-col bg-white">
            {selectedBook && !showBookList && (
              <>
                {/* Navegação de Capítulos */}
                <div className="p-4 bg-gradient-to-r from-purple-50 to-orange-50 border-b border-purple-100 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setShowBookList(true)}
                    className="md:hidden text-slate-700 hover:bg-white/60 rounded-lg px-3 py-2"
                  >
                    ← Livros
                  </button>
                  <div className="flex items-center gap-2 flex-1 justify-center">
                    <button
                      onClick={() => handleChapterChange(selectedChapter - 1)}
                      disabled={selectedChapter === 1}
                      className="bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 px-4 py-2 rounded-lg transition-all border border-purple-100"
                    >
                      ← Anterior
                    </button>
                    <span className="text-slate-700 font-semibold px-4">
                      Cap. {selectedChapter} / {selectedBook.chapters}
                    </span>
                    <button
                      onClick={() => handleChapterChange(selectedChapter + 1)}
                      disabled={selectedChapter === selectedBook.chapters}
                      className="bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 px-4 py-2 rounded-lg transition-all border border-purple-100"
                    >
                      Próximo →
                    </button>
                  </div>
                </div>

                {/* Texto do Capítulo */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gradient-to-b from-white to-purple-50/30">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-500 mx-auto mb-4"></div>
                        <p className="text-slate-600">Carregando capítulo...</p>
                      </div>
                    </div>
                  ) : chapterContent ? (
                    <div className="max-w-3xl mx-auto">
                      <h3 className="text-2xl font-bold text-slate-800 mb-6">
                        {chapterContent.reference}
                      </h3>
                      <div className="space-y-4">
                        {chapterContent.verses.map((verse) => (
                          <p key={verse.verse} className="text-slate-700 leading-relaxed text-lg">
                            <span className="text-purple-600 font-semibold mr-2">
                              {verse.verse}
                            </span>
                            {verse.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-slate-400 text-lg">Selecione um livro para começar</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {!selectedBook && (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-orange-50">
                <div className="text-center">
                  <span className="text-6xl mb-4 block">📖</span>
                  <p className="text-slate-600 text-xl">Selecione um livro para começar a leitura</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
