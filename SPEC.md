# Pokémon Pokedex - Specification Document

## 1. Project Overview

**Project Name:** Pokémon Pokedex
**Type:** Single Page Application (SPA) with React
**Core Functionality:** A responsive Pokédex that consumes data from PokéAPI to display Pokémon information, stats, evolutions, and abilities with multiple internal pages via dynamic routing.
**Target Users:** Pokémon fans and developers who want to explore Pokémon data

---

## 2. Technical Stack

- **Framework:** React 18 with Vite
- **Routing:** React Router DOM v6
- **API:** PokéAPI (https://pokeapi.co/api/v2/)
- **Styling:** CSS Modules with custom properties
- **Deployment:** Netlify (free hosting service)

---

## 3. UI/UX Specification

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background | Dark Navy | `#0f1729` |
| Card Background | Slate Blue | `#1a2332` |
| Primary Accent | Electric Yellow | `#f7d52b` |
| Secondary Accent | Fire Red | `#e33539` |
| Water Type | Ocean Blue | `#4b92db` |
| Grass Type | Forest Green | `#77c755` |
| Electric Type | Lightning Yellow | `#f8d030` |
| Text Primary | Snow White | `#f0f0f0` |
| Text Secondary | Silver Gray | `#9ca3af` |
| Gradient Start | Deep Purple | `#2d1b4e` |
| Gradient End | Dark Blue | `#1a2332` |

### Typography

- **Primary Font:** "Rajdhani" (Google Fonts) - for headings
- **Secondary Font:** "Exo 2" (Google Fonts) - for body text
- **Heading Sizes:** 
  - H1: 3rem (48px)
  - H2: 2rem (32px)
  - H3: 1.5rem (24px)
- **Body:** 1rem (16px)
- **Small:** 0.875rem (14px)

### Layout Structure

#### Header/Navigation
- Fixed top navigation bar
- Logo on left: "Pokédex" with Pokéball icon
- Navigation links: Home, Pokédex (with filter dropdown for types)
- Search bar for Pokémon names
- Dark theme toggle button

#### Home Page
- Hero section with animated Pokéball background
- Welcome message with typing animation
- Featured Pokémon carousel (random selection)
- Quick stats cards (total Pokémon, types, generations)
- Call-to-action buttons to explore

#### Pokédex Page (List of Pokémon)
- Grid layout: 4 columns desktop, 3 tablet, 2 mobile, 1 small mobile
- Pokémon cards showing:
  - Sprite image (animated on hover)
  - Pokémon name
  - Pokémon ID (#001)
  - Type badges (colored)
- Pagination or infinite scroll
- Type filter dropdown
- Search functionality

#### Pokémon Detail Page (Dynamic Route)
- Large header with Pokémon name and ID
- Back button to navigate
- Two-column layout desktop / single column mobile:
  - Left: Large sprite, shiny variant toggle
  - Right: Stats, types, abilities, height/weight
- Evolution chain section with images
- Move list with filtering
- Flavor text from games

#### Footer
- Credits to PokéAPI
- GitHub repository link
- Copyright notice

### Responsive Breakpoints

| Breakpoint | Width | Grid Columns |
|------------|-------|-------------|
| Mobile | < 640px | 1 column |
| Tablet | 640px - 1024px | 2 columns |
| Desktop | 1024px - 1280px | 3 columns |
| Large Desktop | > 1280px | 4 columns |

### Animations

- Page transitions: Fade in with slight slide (300ms)
- Card hover: Scale 1.05 with shadow increase
- Pokéball spinning in hero section
- Typing effect for hero text
- Stat bars animated on detail page load

---

## 4. Functionality Specification

### Core Features

1. **Pokémon List View**
   - Fetch 151 initial Pokémon from PokéAPI
   - Display in responsive grid
   - Show sprite, name, ID, and types
   - Lazy load images for performance

2. **Search Functionality**
   - Real-time search by Pokémon name
   - Case-insensitive matching
   - Debounced input (300ms)

3. **Type Filter**
   - Filter by Pokémon type (18 types)
   - Multiple type selection
   - Show "No results" message if empty

4. **Detail View**
   - Dynamic route: `/pokemon/:id`
   - Fetch specific Pokémon data
   - Display all base stats with visual bars
   - Show type effectiveness (weaknesses/strengths)
   - Evolution chain with links to other Pokémon

5. **API Integration**
   - Main endpoint: `https://pokeapi.co/api/v2/`
   - Endpoints used:
     - `/pokemon` - list
     - `/pokemon/{id}` - detail
     - `/pokemon-species/{id}` - flavor text
     - `/evolution-chain/{id}` - evolution data

### User Interactions

- Click Pokémon card → Navigate to detail page
- Click type badge → Filter by that type
- Click evolution stage → Navigate to that Pokémon
- Toggle shiny sprite on detail page
- Use browser back/forward for navigation

### Data Handling

- Cache API responses in session storage
- Handle loading states with skeleton screens
- Handle error states with retry button
- Optimize images with lazy loading

---

## 5. Page Structure

### Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Landing page |
| `/pokedex` | PokedexPage | Pokémon list |
| `/pokemon/:id` | PokemonDetail | Individual Pokémon |

---

## 6. Acceptance Criteria

### Must Have

- [x] Multiple pages with dynamic routing
- [x] Consumes data from external API (PokéAPI)
- [x] Hosted and available online
- [x] Responsive design for all screen sizes
- [x] Search and filter functionality
- [x] Loading and error states handled

### Visual Checkpoints

- [ ] Dark theme with Pokemon-inspired colors
- [ ] Pokémon cards display correctly in grid
- [ ] Detail page shows all required information
- [ ] Animations work smoothly
- [ ] Mobile layout is usable

---

## 7. Deployment

**Platform:** Netlify
**Build Command:** `npm run build`
**Publish Directory:** `dist`
**Environment Variables:** None required (API is public)

---

## 8. API Reference

### PokéAPI Endpoints Used

```
GET https://pokeapi.co/api/v2/pokemon?limit=151
GET https://pokeapi.co/api/v2/pokemon/{id}
GET https://pokeapi.co/api/v2/pokemon-species/{id}
GET https://pokeapi.co/api/v2/type/{id}
GET https://pokeapi.co/api/v2/evolution-chain/{id}
```

### Response Data Used from `/pokemon/{id}`

- `name` - Pokémon name
- `id` - Pokémon ID
- `types[]` - Type array
- `abilities[]` - Abilities array
- `stats[]` - Base stats
- `height` - Height (decimeters)
- `weight` - Weight (hectograms)
- `sprites.other['official-artwork'].front_default` - Official artwork
- `sprites.front_default` - Default sprite
- `sprites.front_shiny` - Shiny variant

### Response Data Used from `/pokemon-species/{id}`

- `flavor_text_entries[]` - Flavor text
- `evolution_chain.url` - Evolution chain URL
