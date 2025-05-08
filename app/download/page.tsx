"use client";
import React from "react";
import Sidebar from "../components/sidebarmenu"; // Import Sidebar component

export default function Home() {
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
                  <h2 className="text-3xl text-left text-primary font-bold mb-4">
                    Tải Game Tại Đây
                  </h2>
                 
                </div>
              </section>
            </div>
          </div>
        </main>
  );
}
