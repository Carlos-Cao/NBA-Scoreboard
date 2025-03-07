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