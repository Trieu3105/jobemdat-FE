'use client'

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";

export default function Tintuc() {
  const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);
  const [slidePosts, setSlidePosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
        const data = await response.json();
        if (data.success) {
          const sortedPosts = data.contentData
            .sort((a: any, b: any) => b.views - a.views)
            .slice(0, 3); // Get top 3 posts by views
          setFeaturedPosts(sortedPosts);
          setSlidePosts(data.contentData); // Use all posts for the slide
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen text-white py-16 lg:px-16 px-6 bg-[image:var(--ninja1)] bg-cover bg-no-repeat bg-center">
      {/* Bài viết nổi bật */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-center mb-4 uppercase">Bài viết nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredPosts.map((post, index) => (
            <div
              key={post.id}
              className="relative hover:scale-105 transition-transform duration-300 cursor-pointer rounded-md"
            >
              <img
                src={post.img_url}
                alt={`Bài viết ${index + 1}`}
                className="w-full h-64 object-cover rounded-md"
              />
              <div className="absolute bottom-0 left-0 w-full bg-red-700 text-white rounded-b-md text-center py-2 font-semibold">
                {post.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide bài viết */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center uppercase">Tin tức</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          modules={[Pagination]}
        
        >
          {slidePosts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="bg-white/5 rounded-md overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer">
                <img
                  src={post.img_url}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-2 text-sm">
                  <p className="font-medium text-left truncate">{post.title}</p>
                  <p className="font-medium text-left truncate">{post.sub_title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}
