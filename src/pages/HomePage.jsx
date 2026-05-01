import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

const POKEMON_API = 'https://pokeapi.co/api/v2'

function HomePage() {
  const [featuredPokemon, setFeaturedPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Gotta Catch \'Em All!'

  useEffect(() => {
    // Typing effect
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchFeaturedPokemon = async () => {
      setLoading(true)
      try {
        // Fetch a few random Pokémon (using numbers 1, 4, 7, 25, 39, 52, 94, 133 for variety)
        const featuredIds = [1, 4, 7, 25, 39, 52, 94, 133]
        const promises = featuredIds.map(id => 
          fetch(`${POKEMON_API}/pokemon/${id}`).then(res => res.json())
        )
        const results = await Promise.all(promises)
        setFeaturedPokemon(results)
      } catch (error) {
        console.error('Error fetching featured Pokémon:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedPokemon()
  }, [])

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <svg className={styles.heroBackground} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#f7d52b" stroke="#0f1729" strokeWidth="8"/>
          <rect x="8" y="84" width="184" height="32" fill="#0f1729"/>
          <circle cx="100" cy="100" r="32" fill="#f0f0f0" stroke="#0f1729" strokeWidth="8"/>
          <circle cx="100" cy="100" r="16" fill="#0f1729"/>
        </svg>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Pokédex</h1>
          <p className={styles.heroSubtitle}>
            <span className={styles.typingText}>{displayText}</span>
            <span className={styles.typingCursor}></span>
          </p>
          
          <div className={styles.heroButtons}>
            <Link to="/pokedex" className="btn-primary">
              Explore Pokémon
            </Link>
            <Link to="/pokedex?search=pikachu" className="btn-secondary">
              Search
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>151</div>
          <div className={styles.statLabel}>Pokémon</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>18</div>
          <div className={styles.statLabel}>Types</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>6</div>
          <div className={styles.statLabel}>Generations</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>∞</div>
          <div className={styles.statLabel}>Possibilities</div>
        </div>
      </section>

      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Featured Pokémon</h2>
        
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <div className="spinner"></div>
          </div>
        ) : (
          <div className={styles.featuredGrid}>
            {featuredPokemon.map(pokemon => (
              <Link 
                to={`/pokemon/${pokemon.id}`} 
                key={pokemon.id}
                className={styles.featuredCard}
              >
                <img 
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className={styles.featuredImage}
                  loading="lazy"
                />
                <span className={styles.featuredName}>{pokemon.name}</span>
                <span className={styles.featuredId}>#{String(pokemon.id).padStart(3, '0')}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
