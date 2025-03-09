"use client";

import React, { useState, useEffect } from "react";
import { Game } from "../types/types";
import { BalldontlieAPI } from "@balldontlie/sdk";

const GamesList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY;
        if (!apiKey) {
          throw new Error("API key is not set");
        }
        const api = new BalldontlieAPI({ apiKey });
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        const startDate = lastWeek.toISOString().split("T")[0];
        const endDate = today.toISOString().split("T")[0];

        const response = await api.nba.getGames({
          start_date: startDate,
          end_date: endDate,
          per_page: 100,
        });

        setGames(response.data);
        setLoading(false);
      } catch {
        setError("Failed to fetch games.");
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading Games...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        NBA Games from the Last 7 Days
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <div
            key={`${game.id}-${game.home_team.full_name}-${game.visitor_team.full_name}`}
            className="bg-white shadow-md rounded-lg p-4 text-center"
          >
            <h3 className="text-lg font-semibold">{game.date}</h3>
            <p className="text-gray-600">
              {game.home_team.full_name} vs {game.visitor_team.full_name}
            </p>
            <p className="text-gray-600">
              <span
                className={
                  game.home_team_score > game.visitor_team_score
                    ? "font-bold"
                    : ""
                }
              >
                {game.home_team_score}
              </span>{" "}
              -{" "}
              <span
                className={
                  game.visitor_team_score > game.home_team_score
                    ? "font-bold"
                    : ""
                }
              >
                {game.visitor_team_score}
              </span>
            </p>
            <p className="text-gray-600">{game.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesList;
