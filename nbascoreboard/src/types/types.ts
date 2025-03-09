export interface Team {
    id: number;
    full_name: string;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
  }
  
export interface NBAPlayer {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    height: string;
    weight: string;
    jersey_number: string;
    college: string;
    country: string;
}

export interface Game {
  id: number;
  date: string;
  status: string;
  home_team: {
    full_name: string;
  };
  visitor_team: {
    full_name: string;
  };
  home_team_score: number;
  visitor_team_score: number;
}