import { useState } from 'react'
import { getRandomVerse, getVerseOfTheDay, searchVerse } from '../bibleService'

export function useVerse() {
  const [verse, setVerse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadTodayVerse = async () => {
    setLoading(true)
    setError(null)
    try {
      const verseData = await getVerseOfTheDay()
      setVerse(verseData)
    } catch (err) {
      setError('Erro ao carregar versículo do dia. Tente novamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getNewVerse = async () => {
    setLoading(true)
    setError(null)
    try {
      const verseData = await getRandomVerse()
      setVerse(verseData)
    } catch (err) {
      setError('Erro ao carregar versículo aleatório. Tente novamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query) => {
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    try {
      const verseData = await searchVerse(query)
      setVerse(verseData)
    } catch (err) {
      setError('Versículo não encontrado. Tente: "João 3:16" ou "Salmos 23:1"')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    verse,
    loading,
    error,
    loadTodayVerse,
    getNewVerse,
    handleSearch
  }
}
