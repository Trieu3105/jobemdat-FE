"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebarmenu"; // Import Sidebar component

interface Player {
  id: number;
  name: string;
  playerLevel: number;
}

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/players`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch players data");
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players data:", error);
      }
    }

    fetchPlayers();
  }, []);

  return (
    <main className="section-ninja1 min-h-screen bg-current p-4">
      <div className="lg:pt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <Sidebar />
          </aside>

          {/* Content table player ranking */}
          <section className="w-full lg:w-3/4">
            <div className="transition-opacity duration-300 opacity-100 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h2 className="text-3xl text-center text-primary font-bold mb-4">Bảng Xếp Hạng Người Chơi</h2>
              <table className="table-auto w-full text-left text-sm">
                <thead className="text-white text-xl">
                  <tr>
                    <th className="px-4 py-2">Rank</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Level</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400 text-lg">
                  {players.map((player, index) => (
                    <tr key={player.id} className="border-t border-gray-700">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{player.name || "Unknown"}</td>
                      <td className="px-4 py-2">
                        {player.playerLevel || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
