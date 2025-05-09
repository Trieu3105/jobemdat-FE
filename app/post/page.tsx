"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebarmenu"; // Import Sidebar component
import Image from "next/image";

interface Post {
  id: number;
  title: string;
  sub_title: string;
  img_url: string;
  views: number;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]); // Explicitly define the type as Post[]

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts`
        );
        const data = await response.json();
        if (data.success) {
          setPosts(data.contentData);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main className="bg-[image:var(--ninja2)] min-h-screen bg-cover bg-no-repeat bg-center p-4">
      <div className="lg:pt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <Sidebar />
          </aside>

          {/* Content */}
          <section className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border p-4 rounded shadow bg-white/10 backdrop-blur-sm  overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <Image
                    src={post.img_url}
                    alt={post.title}
                    width={500} // Add width
                    height={750} // Add height
                    className="w-full h-32 object-cover rounded hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                  <h3
                    className="text-lg text-primary  font-bold mt-2 truncate"
                    title={post.title}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-200 line-clamp-2">
                    {post.sub_title}
                  </p>
                  <p className="text-sm text-gray-200 ">Views: {post.views}</p>
                </div>
              ))}
            </div>
            <button className="bg-white p-2 my-4 w-full mx-auto">
              xem them
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
