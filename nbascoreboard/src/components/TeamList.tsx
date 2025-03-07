"use client";

import React, { useEffect, useState } from "react";
import { BalldontlieAPI } from "@balldontlie/sdk";
import { Team } from "../types/types";
import Page from "./TeamPlayers";

const TeamsList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

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

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {selectedTeam ? (
        <Page team={selectedTeam} onBack={() => setSelectedTeam(null)} />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">NBA Teams</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {teams.map((team) => (
              <button
                key={team.id}
                className="bg-white shadow-md rounded-lg p-4 text-center cursor-pointer"
                onClick={() => handleTeamClick(team)}
                tabIndex={0}
              >
                <h2 className="text-xl font-semibold">{team.full_name}</h2>
                <p className="text-gray-600">
                  {team.city} - {team.abbreviation}
                </p>
                <p className="text-gray-600">{team.conference} Conference</p>
                <p className="text-gray-600">{team.division} Division</p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TeamsList;
