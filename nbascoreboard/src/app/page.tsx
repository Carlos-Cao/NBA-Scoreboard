import React from "react";
import Header from "../components/Header";
import TeamList from "../components/TeamList";
import GamesList from "../components/GamesList";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <GamesList />
      <TeamList />
      <Footer />
    </div>
  );
}
