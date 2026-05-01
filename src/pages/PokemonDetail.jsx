import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import styles from './PokemonDetail.module.css'

const POKEMON_API = 'https://pokeapi.co/api/v2'

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

const STAT_COLORS = {
  hp: '#ff5959',
  attack: '#f5ac78',
  defense: '#fae078',
  'special-attack': '#9db7f5',
  'special-defense': '#a7db8d',
  speed: '#fa92b2'
}

const STAT_NAMES = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPEED'
}

function PokemonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(null)
  const [species, setSpecies] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isShiny, setIsShiny] = useState(false)

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Fetch Pokémon data
        const pokemonResponse = await fetch(`${POKEMON_API}/pokemon/${id}`)
        if (!pokemonResponse.ok) throw new Error('Pokémon not found')
        const pokemonData = await pokemonResponse.json()
        setPokemon(pokemonData)

        // Fetch species data
        const speciesResponse = await fetch(`${POKEMON_API}/pokemon-species/${id}`)
        if (speciesResponse.ok) {
          const speciesData = await speciesResponse.json()
          setSpecies(speciesData)
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching Pokémon:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonData()
    // Scroll to top when Pokémon changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  // Get flavor text (English)
  const getFlavorText = () => {
    if (!species) return ''
    const englishEntry = species.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    )
    return englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : ''
  }

  // Format height (decimeters to meters)
  const formatHeight = (height) => {
    const meters = height / 10
    return meters.toFixed(1)
  }

  // Format weight (hectograms to kg)
  const formatWeight = (weight) => {
    const kg = weight / 10
    return kg.toFixed(1)
  }

  // Get stat bar color based on primary type
  const getStatBarColor = (statName) => {
    if (pokemon && STAT_COLORS[statName]) {
      return STAT_COLORS[statName]
    }
    return TYPE_COLORS[pokemon?.types[0]?.type?.name] || '#a8a878'
  }

  if (loading) {
    return (
      <div className={styles.detailPage}>
        <div className={styles.loadingContainer}>
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (error || !pokemon) {
    return (
      <div className={styles.detailPage}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Pokémon Not Found</h2>
          <p className={styles.errorText}>{error || 'Unknown error occurred'}</p>
          <button 
            onClick={() => navigate('/pokedex')} 
            className="btn-primary"
          >
            Back to Pokédex
          </button>
        </div>
      </div>
    )
  }

  const primaryType = pokemon.types[0].type.name

  return (
    <div className={styles.detailPage}>
      <button 
        onClick={() => navigate(-1)} 
        className={styles.backButton}
      >
        ← Back
      </button>

      <div className={styles.detailHeader}>
        <span className={styles.detailId}>#{String(pokemon.id).padStart(3, '0')}</span>
        <h1 className={styles.detailName}>{pokemon.name}</h1>
        <div className={styles.detailTypes}>
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
      </div>

      <div className={styles.detailContent}>
        <div className={styles.imageSection}>
          <div className={styles.spriteContainer}>
            <img
              src={
                isShiny
                  ? (pokemon.sprites.front_shiny || pokemon.sprites.front_default)
                  : (pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default)
              }
              alt={`${pokemon.name} ${isShiny ? 'shiny' : ''}`}
              className={styles.pokemonSprite}
            />
          </div>
          
          <label className={styles.shinyToggle}>
            <input
              type="checkbox"
              checked={isShiny}
              onChange={(e) => setIsShiny(e.target.checked)}
            />
            <span className={styles.shinyToggleLabel}>
              {isShiny ? '✓ Shiny' : 'Shiny'}
            </span>
          </label>
        </div>

        <div className={styles.infoSection}>
          {/* Base Stats */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Base Stats</h3>
            <div className={styles.statsGrid}>
              {pokemon.stats.map(stat => (
                <div key={stat.stat.name} className={styles.statRow}>
                  <span className={styles.statName}>
                    {STAT_NAMES[stat.stat.name] || stat.stat.name}
                  </span>
                  <div className={styles.statBarContainer}>
                    <div
                      className={styles.statBar}
                      style={{
                        width: `${Math.min(100, (stat.base_stat / 255) * 100)}%`,
                        backgroundColor: getStatBarColor(stat.stat.name)
                      }}
                    />
                  </div>
                  <span className={styles.statValue}>{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Physical Info */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Physical</h3>
            <div className={styles.physicalStats}>
              <div className={styles.physicalStat}>
                <div className={styles.physicalStatLabel}>Height</div>
                <div className={styles.physicalStatValue}>
                  {formatHeight(pokemon.height)} m
                </div>
              </div>
              <div className={styles.physicalStat}>
                <div className={styles.physicalStatLabel}>Weight</div>
                <div className={styles.physicalStatValue}>
                  {formatWeight(pokemon.weight)} kg
                </div>
              </div>
            </div>
          </div>

          {/* Abilities */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Abilities</h3>
            <div className={styles.abilitiesList}>
              {pokemon.abilities.map(abilityInfo => (
                <span
                  key={abilityInfo.ability.name}
                  className={styles.abilityBadge}
                >
                  {abilityInfo.ability.name.replace(/-/g, ' ')}
                  {abilityInfo.is_hidden && ' (Hidden)'}
                </span>
              ))}
            </div>
          </div>

          {/* Flavor Text */}
          {getFlavorText() && (
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Pokedex Entry</h3>
              <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                {getFlavorText()}
              </p>
            </div>
          )}
        </div>

        {/* Moves Preview */}
        {pokemon.moves && pokemon.moves.length > 0 && (
          <div className={styles.movesSection}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Moves ({pokemon.moves.length})</h3>
              <div className={styles.movesGrid}>
                {pokemon.moves.slice(0, 20).map(moveInfo => (
                  <div key={moveInfo.move.name} className={styles.moveCard}>
                    {moveInfo.move.name.replace(/-/g, ' ')}
                  </div>
                ))}
                {pokemon.moves.length > 20 && (
                  <div className={styles.moveCard} style={{ color: 'var(--text-secondary)' }}>
                    +{pokemon.moves.length - 20} more
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonDetail
