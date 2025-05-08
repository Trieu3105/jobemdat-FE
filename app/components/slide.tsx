"use client";
import Link from "next/link";
import React from "react";

export default function Slide() {
  const handleVideoError = () => {
    console.error(
      "Failed to load the video. Please check the file path or format."
    );
  };

  return (
    <main className=" text-white">
      {/*Slide section */}
      <section className="relative h-screen text-white px-4">
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
        <div className="absolute left-[100px] bottom-[100px] z-10  flex flex-col justify-center items-center bg-opacity-75 text-4xl sm:text-5xl lg:text-6xl font-bold">
          <div className="w-full max-w-md  bg-opacity-50 rounded-lg shadow-lg">
            <img
              src="./image/banner1.jpg"
              alt="NSO Logo"
              className="object-cover h-auto mb-4"
            />
          </div>

          <div className="text-lg sm:text-xl lg:text-2xl font-normal  bg-black/10 backdrop-blur-sm justify-center items-center">
            <div className="text-4xl lg:mb-4 p-3 lg:w-[500px] text-center">TẢI GAME NSO</div>
            <div  className="flex items-center justify-around flex-wrap gap-4 p-3 lg:w-[500px] text-center">
              <button>
                <Link href="">tải APK</Link>
              </button>
              <button>
                <Link href="">tải APK</Link>
              </button>
              <button>
                <Link href="">tải APK</Link>
              </button>
              <button>
                <Link href="">tải APK</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
