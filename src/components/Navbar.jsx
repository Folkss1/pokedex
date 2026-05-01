import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

function Navbar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/pokedex?search=${search.toLowerCase().trim()}`)
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const searchParam = params.get('search')
    if (searchParam) {
      setSearch(searchParam)
    }
  }, [])

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <Link to="/" className={styles.logo}>
          <svg className={styles.logoIcon} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#f7d52b" stroke="#0f1729" strokeWidth="4"/>
            <rect x="4" y="42" width="92" height="16" fill="#0f1729"/>
            <circle cx="50" cy="50" r="16" fill="#f0f0f0" stroke="#0f1729" strokeWidth="4"/>
            <circle cx="50" cy="50" r="8" fill="#0f1729"/>
          </svg>
          Pokédex
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/pokedex" 
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
            >
              Pokédex
            </NavLink>
          </li>
        </ul>

        <form onSubmit={handleSearch} className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
