import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import styles from './PokedexPage.module.css'

const POKEMON_API = 'https://pokeapi.co/api/v2'
const ITEMS_PER_PAGE = 24

const TYPE_COLORS = {
  normal: '#a8a878',
  fire: '#f08030',
  water: '#6890f0',
  electric: '#f8d030',
  grass: '#78c850',
  ice: '#98d8d8',
  fighting: '#c03028',
  poison: '#a040a0',
  ground: '#e0c068',
  flying: '#a890f0',
  psychic: '#f85888',
  bug: '#a8b820',
  rock: '#b8a038',
  ghost: '#705898',
  dragon: '#7038f8',
  dark: '#49291a',
  steel: '#b8b8d0',
  fairy: '#ee99ac'
}

const ALL_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
]

function PokedexPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [allPokemon, setAllPokemon] = useState([])
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '')

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true)
      setError(null)
      try {
        // Fetch the first 151 Pokémon
        const response = await fetch(`${POKEMON_API}/pokemon?limit=151`)
        if (!response.ok) throw new Error('Failed to fetch Pokémon')
        
        const data = await response.json()
        
        // Fetch details for each Pokémon
        const pokemonPromises = data.results.map(async (pokemon, index) => {
          const detailResponse = await fetch(pokemon.url)
          return detailResponse.json()
        })
        
        const pokemonDetails = await Promise.all(pokemonPromises)
        setAllPokemon(pokemonDetails)
        setFilteredPokemon(pokemonDetails)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching Pokémon:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllPokemon()
  }, [])

  useEffect(() => {
    // Filter Pokémon based on search and type
    let filtered = [...allPokemon]
    
    if (search) {
      filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    if (selectedType) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(type => type.type.name === selectedType)
      )
    }
    
    setFilteredPokemon(filtered)
    setCurrentPage(1)
    
    // Update URL params
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (selectedType) params.set('type', selectedType)
    setSearchParams(params)
  }, [search, selectedType, allPokemon])

  // Pagination
  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentPokemon = filteredPokemon.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value)
  }

  const renderPagination = () => {
    const pages = []
    const maxVisiblePages = 5
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.pageButton} ${i === currentPage ? styles.pageButtonActive : ''}`}
        >
          {i}
        </button>
      )
    }

    return (
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          ←
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          →
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={styles.pokedexPage}>
        <div className={styles.loadingContainer}>
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.pokedexPage}>
        <div className={styles.noResults}>
          <h2 className={styles.noResultsTitle}>Oops! Something went wrong</h2>
          <p className={styles.noResultsText}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
            style={{ marginTop: '1rem' }}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.pokedexPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Pokédex</h1>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={search}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterGroup}>
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className={styles.filterSelect}
          >
            <option value="">All Types</option>
            {ALL_TYPES.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentPokemon.length === 0 ? (
        <div className={styles.noResults}>
          <h2 className={styles.noResultsTitle}>No Pokémon Found</h2>
          <p className={styles.noResultsText}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <>
          <div className={styles.pokemonGrid}>
            {currentPokemon.map(pokemon => {
              const primaryType = pokemon.types[0].type.name
              return (
                <Link
                  to={`/pokemon/${pokemon.id}`}
                  key={pokemon.id}
                  className={`${styles.pokemonCard} type-${primaryType}`}
                >
                  <img
                    src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <span className={styles.cardId}>#{String(pokemon.id).padStart(3, '0')}</span>
                  <span className={styles.cardName}>{pokemon.name}</span>
                  <div className={styles.cardTypes}>
                    {pokemon.types.map(typeInfo => (
                      <span
                        key={typeInfo.type.name}
                        className={styles.typeBadge}
                        style={{ backgroundColor: TYPE_COLORS[typeInfo.type.name] }}
                      >
                        {typeInfo.type.name}
                      </span>
                    ))}
                  </div>
                </Link>
              )
            })}
          </div>

          {totalPages > 1 && renderPagination()}
        </>
      )}
    </div>
  )
}

export default PokedexPage
