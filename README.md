# Signifly Pétanque League

Track your pétanque league scores, matches and leaderboards.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Available Scripts](#available-scripts)
3. [Tech Stack](#tech-stack)
4. [About the app](#about-the-app)
5. [Future updates](#future-updates)

## Quick Start

### 1. Use the correct Node.js version, make sure you have nvm installed

```bash
nvm use
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy the app to GitHub Pages -> [Live demo](https://ferrarisMat.github.io/s-petanque-lb/);

## Tech Stack

- **React 19** with TypeScript
- **React Router 7** for client-side routing
- **Redux Toolkit** for state management
- **Styled Components** for CSS-in-JS styling
- **Vite** for fast development and builds

## About the app

The Signifly Pétanque League app is built to manage scoring and tournaments for internal pétanque leagues.
Player scores serve as the definitive record: when a team’s total reaches 13 points, the match ends and that team earns three points.
This system also enables dynamic player leaderboards, making the tournament more engaging and competitive.

### Key Features

- **Match Tracking** - Record and manage pétanque match results
- **Teams Leaderboards** - Automatically calculated rankings and standings for teams
- **Players Leaderboards** - Automatically calculated ranking and standing for players
- **Live Leaderboards** - When a match is being played and not yet finished, both teams and players leaderboards are updated temporarly to reflect the current ranking.
- **Matches table** - Matches are automatically generated using a round-robin algorithm and we can keep track of past games
- **Admin Management** - Easy-to-use interface for editing scores
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### Perfect for:

- Company leagues and team building events
- Avoid cheating: Only Admins are allowed to edit the scores
- Prevent losing track of past matches

The app provides an intuitive interface for players and organizers to focus on the game while keeping accurate records of all matches and standings.

## Future updates

- Admin login
- Admin design update
- Back-end management and data fetching
- "Now playing" badge on the leaderboards to display which teams and players are currently involved in a match. Admin would be the only ones to be able to "start a match"
- Player login
- Player notification system to alert participants when their matches are ready to begin
