# NBA-Scoreboard

NBA-Scoreboard is a web application built with Next.js and React to view NBA game scores and team/player information.

## Features

- View NBA game scores from the last 7 days
- View detailed information about NBA teams and players
- Responsive design for mobile and desktop

## How to Use the Application

### Home Page

1. **Header**: The header displays the title of the application. Click on the title to return to the home page.

   - [src/components/Header.tsx](/nbascoreboard/src/components/Header.tsx)

2. **Main Section**: The main section fetches and displays a list of NBA teams and recent games.

   - [src/components/TeamList.tsx](/nbascoreboard/src/components/TeamList.tsx)
   - [src/components/GamesList.tsx](/nbascoreboard/src/components/GamesList.tsx)

3. **Footer**: The footer includes a link to the GitHub repository.
   - [src/components/Footer.tsx](/nbascoreboard/src/components/Footer.tsx)

### Viewing NBA Teams

1. On the home page, you will see a grid of NBA teams.

   - [src/components/TeamList.tsx](/nbascoreboard/src/components/TeamList.tsx)

2. Each team displays the team's full name, city, conference, and division.

3. Click on a team to view the players in that team.

![NBA Scoreboard Teams](/nbascoreboard/public/images/nba-scoreboard-teams.png)

### Viewing Players in a Team

1. After clicking on a team, you will be taken to the team's page.

   - [src/components/TeamPlayers.tsx](/nbascoreboard/src/components/TeamPlayers.tsx)

2. On the team's page, you can view the list of players who played for the team.

3. Click the "Load More Players" button to load more players.

![NBA Scoreboard Players](/nbascoreboard/public/images/nba-scoreboard-players.png)

### Viewing NBA Games

1. On the home page, you will see a list of NBA games from the last 7 days.

   - [src/components/GamesList.tsx](/nbascoreboard/src/components/GamesList.tsx)

2. Each game displays the date, teams, scores, and status.

![NBA Scoreboard Games](/nbascoreboard/public/images/nba-scoreboard-games.png)

### Styling

- The project uses Tailwind CSS for styling.
  - [postcss.config.mjs](/nbascoreboard/postcss.config.mjs)
  - [src/app/globals.css](/nbascoreboard/src/app/globals.css)

## License

Distributed under the MIT License. See `LICENSE` for more information.
