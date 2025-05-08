"use client";

import Image from "next/image";
import Sidebar from "../components/sidebarmenu"; // Import Sidebar component
import React, { useEffect, useState } from "react";

interface player {
  id: number;
  name: string;
  playerLevel: number;
  data?: {
    levelUptime: number;
  };
}

export default function Top3Ranking() {
  const [players, setPlayers] = useState<player[]>([]);

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

  const topThree: player[] = [...players]
    .sort((a, b) => {
      const aValue = a.playerLevel + (a.data?.levelUptime || 0);
      const bValue = b.playerLevel + (b.data?.levelUptime || 0);
      return bValue - aValue;
    })
    .slice(0, 3);

  // Thứ tự hiển thị: [1, 0, 2] => người cao nhất đứng giữa
  const reorderedTopThree = [topThree[1], topThree[0], topThree[2]];

  return (
    <main className="section-ninja1 min-h-screen bg-current p-4">
      <div className="lg:pt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div>
            <Sidebar />
          </div>

          {/* Content Vinh Danh Người Chơi*/}
          <section className="w-full px-4 bg-[--ninja-bg] text-white text-center rounded-xl">
            <h2 className="text-3xl font-bold mb-8 py-10">
              Vinh Danh Người Chơi
            </h2>
            <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
              {reorderedTopThree.map((player: player, index: number) => {
                if (!player) return null;

                const actualRank =
                  topThree.findIndex((p) => p.id === player.id) + 1;

                return (
                  <div
                    key={player.id}
                    className={`relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                      index === 1 ? "scale-110 z-20 -mb-8" : "scale-95 z-10"
                    } bg-card`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex flex-col justify-end">
                      <div className="text-left">
                        <h3 className="text-sm font-semibold leading-tight">
                          {player.name || "Unknown"}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Level: {player.playerLevel || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {actualRank}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Content table player ranking */}
            <section className="w-full lg:w-auto py-10">
              <div className="transition-opacity duration-300 opacity-100 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h2 className="text-3xl text-center text-primary font-bold mb-4">
                  Bảng Xếp Hạng Người Chơi
                </h2>
                <table className="table-auto w-full text-center text-sm">
                  <thead className="text-white text-xl">
                    <tr>
                      <th className="px-4 py-2">Rank</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Chiến Lực</th>
                      <th className="px-4 py-2">Level</th>

                    </tr>
                  </thead>
                  <tbody className="text-gray-400 text-center text-lg">
                    {topThree.map((player, index) => (
                      <tr key={player.id} className="border-t border-gray-700">
                        <td className="px-4 py-2">TOP {index + 1}</td>
                        <td className="px-4 py-2">{player.name || "Unknown"}</td>
                        <td className="px-4 py-2">1 triệu</td>
                        <td className="px-4 py-2">{player.playerLevel || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
