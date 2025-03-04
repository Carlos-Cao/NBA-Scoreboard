"use client";

import React, { useEffect, useState } from "react";
import { BalldontlieAPI } from "@balldontlie/sdk";

interface Team {
  id: number;
  full_name: string;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
}

const TeamsList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const apiKey = process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY;
      if (!apiKey) {
        setError("API key is missing");
        setLoading(false);
        return;
      }

      const api = new BalldontlieAPI({ apiKey });
      try {
        const response = await api.nba.getTeams();
        const currentTeams = response.data.filter(
          (team: Team) => team.conference && team.division
        );
        setTeams(currentTeams);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>NBA Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            {team.full_name} ({team.abbreviation}) - {team.city},{" "}
            {team.conference} Conference, {team.division} Division
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsList;
