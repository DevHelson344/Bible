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
    { name: 'Gênesis', id: 'genesis', chapters: 50 },
    { name: 'Êxodo', id: 'exodus', chapters: 40 },
    { name: 'Levítico', id: 'leviticus', chapters: 27 },
    { name: 'Números', id: 'numbers', chapters: 36 },
    { name: 'Deuteronômio', id: 'deuteronomy', chapters: 34 },
    { name: 'Josué', id: 'joshua', chapters: 24 },
    { name: 'Juízes', id: 'judges', chapters: 21 },
    { name: 'Rute', id: 'ruth', chapters: 4 },
    { name: '1 Samuel', id: '1samuel', chapters: 31 },
    { name: '2 Samuel', id: '2samuel', chapters: 24 },
    { name: '1 Reis', id: '1kings', chapters: 22 },
    { name: '2 Reis', id: '2kings', chapters: 25 },
    { name: 'Salmos', id: 'psalms', chapters: 150 },
    { name: 'Provérbios', id: 'proverbs', chapters: 31 },
    { name: 'Eclesiastes', id: 'ecclesiastes', chapters: 12 },
    { name: 'Isaías', id: 'isaiah', chapters: 66 },
    { name: 'Jeremias', id: 'jeremiah', chapters: 52 },
    { name: 'Mateus', id: 'matthew', chapters: 28 },
    { name: 'Marcos', id: 'mark', chapters: 16 },
    { name: 'Lucas', id: 'luke', chapters: 24 },
    { name: 'João', id: 'john', chapters: 21 },
    { name: 'Atos', id: 'acts', chapters: 28 },
    { name: 'Romanos', id: 'romans', chapters: 16 },
    { name: '1 Coríntios', id: '1corinthians', chapters: 16 },
    { name: '2 Coríntios', id: '2corinthians', chapters: 13 },
    { name: 'Gálatas', id: 'galatians', chapters: 6 },
    { name: 'Efésios', id: 'ephesians', chapters: 6 },
    { name: 'Filipenses', id: 'philippians', chapters: 4 },
    { name: 'Colossenses', id: 'colossians', chapters: 4 },
    { name: '1 Tessalonicenses', id: '1thessalonians', chapters: 5 },
    { name: '2 Tessalonicenses', id: '2thessalonians', chapters: 3 },
    { name: '1 Timóteo', id: '1timothy', chapters: 6 },
    { name: '2 Timóteo', id: '2timothy', chapters: 4 },
    { name: 'Tito', id: 'titus', chapters: 3 },
    { name: 'Filemom', id: 'philemon', chapters: 1 },
    { name: 'Hebreus', id: 'hebrews', chapters: 13 },
    { name: 'Tiago', id: 'james', chapters: 5 },
    { name: '1 Pedro', id: '1peter', chapters: 5 },
    { name: '2 Pedro', id: '2peter', chapters: 3 },
    { name: '1 João', id: '1john', chapters: 5 },
    { name: '2 João', id: '2john', chapters: 1 },
    { name: '3 João', id: '3john', chapters: 1 },
    { name: 'Judas', id: 'jude', chapters: 1 },
    { name: 'Apocalipse', id: 'revelation', chapters: 22 }
  ]

  useEffect(() => {
    setBooks(bibleBooks)
  }, [])

  const loadChapter = async (book, chapter) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://bible-api.com/${book}+${chapter}?translation=almeida`,
        { timeout: 8000 }
      )
      setChapterContent(response.data)
      setShowBookList(false)
    } catch (error) {
      console.error('Erro ao carregar capítulo:', error)
      alert('Erro ao carregar capítulo. Tente novamente.')
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-white/10">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex items-center justify-between">
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
          <div className={`${showBookList ? 'w-full md:w-80' : 'w-0 md:w-80'} transition-all duration-300 overflow-hidden border-r border-white/10`}>
            <div className="p-4 bg-white/5">
              <input
                type="text"
                placeholder="Buscar livro..."
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="overflow-y-auto h-full custom-scrollbar p-4">
              {books.map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleBookSelect(book)}
                  className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition-all ${
                    selectedBook?.id === book.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white/5 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <div className="font-semibold">{book.name}</div>
                  <div className="text-xs opacity-70">{book.chapters} capítulos</div>
                </button>
              ))}
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="flex-1 flex flex-col">
            {selectedBook && !showBookList && (
              <>
                {/* Navegação de Capítulos */}
                <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setShowBookList(true)}
                    className="md:hidden text-white hover:bg-white/10 rounded-lg px-3 py-2"
                  >
                    ← Livros
                  </button>
                  <div className="flex items-center gap-2 flex-1 justify-center">
                    <button
                      onClick={() => handleChapterChange(selectedChapter - 1)}
                      disabled={selectedChapter === 1}
                      className="bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all"
                    >
                      ← Anterior
                    </button>
                    <span className="text-white font-semibold px-4">
                      Cap. {selectedChapter} / {selectedBook.chapters}
                    </span>
                    <button
                      onClick={() => handleChapterChange(selectedChapter + 1)}
                      disabled={selectedChapter === selectedBook.chapters}
                      className="bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all"
                    >
                      Próximo →
                    </button>
                  </div>
                </div>

                {/* Texto do Capítulo */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-purple-500 mx-auto mb-4"></div>
                        <p className="text-white/70">Carregando capítulo...</p>
                      </div>
                    </div>
                  ) : chapterContent ? (
                    <div className="max-w-3xl mx-auto">
                      <h3 className="text-2xl font-bold text-white mb-6">
                        {chapterContent.reference}
                      </h3>
                      <div className="space-y-4">
                        {chapterContent.verses.map((verse) => (
                          <p key={verse.verse} className="text-white/90 leading-relaxed text-lg">
                            <span className="text-purple-400 font-semibold mr-2">
                              {verse.verse}
                            </span>
                            {verse.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-white/50 text-lg">Selecione um livro para começar</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {!selectedBook && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl mb-4 block">📖</span>
                  <p className="text-white/70 text-xl">Selecione um livro para começar a leitura</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
