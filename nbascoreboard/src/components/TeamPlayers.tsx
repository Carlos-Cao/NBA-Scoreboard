"use client";

import React, { useState, useEffect } from "react";
import { Team, NBAPlayer } from "../types/types";
import { BalldontlieAPI } from "@balldontlie/sdk";

interface PageProps {
  team: Team;
  onBack: () => void;
}

const Page: React.FC<PageProps> = ({ team, onBack }) => {
  const [players, setPlayers] = useState<NBAPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchPlayers = async (cursor?: number) => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY;
        if (!apiKey) {
          throw new Error("API key is not set");
        }
        const api = new BalldontlieAPI({ apiKey });
        const response = await api.nba.getPlayers({
          team_ids: [team.id],
          per_page: 100,
          cursor: cursor,
        });

        setPlayers((prevPlayers) => [...prevPlayers, ...response.data]);
        if (response.meta) {
          setCursor(response.meta.next_cursor);
        }
        setLoading(false);
      } catch {
        setError("Failed to fetch players.");
        setLoading(false);
      }
    };

    fetchPlayers(cursor);
  }, [team.id, cursor]);

  const loadMorePlayers = () => {
    setCursor((prevCursor) => (prevCursor ? prevCursor + 1 : 1));
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          Back
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">
        All players who played for the {team.full_name}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {players.map((player, index) => (
          <div
            key={`${player.id}-${index}`}
            className="bg-white shadow-md rounded-lg p-4 text-center"
          >
            <h3 className="text-lg font-semibold">
              {`${player.first_name} ${player.last_name}`}
            </h3>
            <p className="text-gray-600">Position: {player.position}</p>
            <p className="text-gray-600">Height: {player.height} ft</p>
            <p className="text-gray-600">Weight: {player.weight} lbs</p>
            <p className="text-gray-600">
              Jersey Number: #{player.jersey_number}
            </p>
            <p className="text-gray-600">College: {player.college}</p>
            <p className="text-gray-600">Country: {player.country}</p>
          </div>
        ))}
      </div>
      {!loading && !error && (
        <button onClick={loadMorePlayers}>Load More Players</button>
      )}
    </div>
  );
};

export default Page;
