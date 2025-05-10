"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Slide() {
  const handleVideoError = () => {
    console.error(
      "Failed to load the video. Please check the file path or format."
    );
  };

  return (
    <main className=" text-white">
      {/*Slide section */}
      <section className="relative h-screen text-primary px-4">
        {/* Video background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          onError={handleVideoError}
        >
          <source src="/image/videodemo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content */}
        <div
          className="
                absolute inset-0 
                flex flex-col justify-center items-center 
                md:justify-end md:items-start
                md:left-[100px] lg:bottom-[100px] md:inset-auto 
                z-10
              "
        >
          {/* Image nếu cần giữ lại */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-opacity-50 rounded-lg shadow-lg mb-6">
            <Image
              src="/image/banner1.jpg"
              alt="NSO Logo"
              width={500}
              height={750}
              className="object-cover w-full h-auto"
            />
          </div>

          {/* Text + Buttons */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 w-full max-w-md text-center space-y-4">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
              TẢI GAME NSO
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-center gap-2">
              {["Tải APK", "Tải iOS", "Tải PC", "Tải Giả Lập"].map(
                (label, index) => (
                  <button
                    key={index}
                    className="bg-white/10 hover:bg-white/20 transition-all px-4 py-2 rounded text-sm sm:text-base"
                  >
                    <Link href="/">{label}</Link>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
