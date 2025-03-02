import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-center items-center h-16">
        <h1 className="text-3xl font-bold">
          <Link href="/">NBA Scoreboard</Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
