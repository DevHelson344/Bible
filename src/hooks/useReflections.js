import { useState, useEffect } from 'react'

const STORAGE_KEY = 'devotional-history'
const FAVORITES_KEY = 'devotional-favorites'

export function useReflections() {
  const [history, setHistory] = useState([])
  const [favorites, setFavorites] = useState(new Set())

  useEffect(() => {
    loadHistory()
    loadFavorites()
  }, [])

  const loadHistory = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }

  const loadFavorites = () => {
    const saved = localStorage.getItem(FAVORITES_KEY)
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)))
    }
  }

  const saveReflection = (verse, reflection) => {
    const newEntry = {
      id: Date.now(),
      verse: verse,
      reflection: reflection,
      date: new Date().toLocaleDateString('pt-BR'),
      isFavorite: false
    }
    
    const updatedHistory = [newEntry, ...history]
    setHistory(updatedHistory)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
    return newEntry
  }

  const deleteReflection = (id) => {
    const updatedHistory = history.filter(entry => entry.id !== id)
    setHistory(updatedHistory)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
  }

  const toggleFavoriteVerse = (reference) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(reference)) {
      newFavorites.delete(reference)
    } else {
      newFavorites.add(reference)
    }
    setFavorites(newFavorites)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...newFavorites]))
  }

  const toggleFavoriteReflection = (id) => {
    const updatedHistory = history.map(entry => 
      entry.id === id ? { ...entry, isFavorite: !entry.isFavorite } : entry
    )
    setHistory(updatedHistory)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
  }

  return {
    history,
    favorites,
    saveReflection,
    deleteReflection,
    toggleFavoriteVerse,
    toggleFavoriteReflection
  }
}
