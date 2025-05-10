"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { fadeInDown } from "./motionVariants";
import { motion } from "framer-motion";

export default function Tintuc() {
  const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);
  const [slidePosts, setSlidePosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts`
        );
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
    <main className=" text-primary py-16 lg:px-16 px-6 section-ninja1 bg-cover bg-no-repeat bg-center">
      {/* Bài viết nổi bật */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-center mb-4 uppercase">
          Bài viết nổi bật
        </h2>

        {/* Swiper - chỉ hiển thị ở mobile */}
        <div className="block md:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1}
            className="w-full"
          >
            {featuredPosts.map((post, index) => (
              <SwiperSlide key={post.id}>
                <div className="relative cursor-pointer rounded-md">
                  <Image
                    src={post.img_url}
                    alt={`Bài viết ${index + 1}`}
                    width={500}
                    height={750}
                    className="w-full h-64 object-cover rounded-md"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-red-700 text-white rounded-b-md text-center py-2 font-semibold">
                    {post.title}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid layout - chỉ hiển thị ở desktop và tablet */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredPosts.map((post, index) => (
            <div
              key={post.id}
              className="relative hover:scale-105 transition-transform duration-300 cursor-pointer rounded-md"
            >
              <Image
                src={post.img_url}
                alt={`Bài viết ${index + 1}`}
                width={500}
                height={750}
                className="w-full h-64 object-cover rounded-md"
              />
              <div className="absolute bottom-0 left-0 w-full bg-red-700 text-white rounded-b-md text-center py-2 font-semibold">
                {post.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide tin tức */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        // viewport={{ once: true, amount: 0.2 }}
        variants={fadeInDown}
      >
        <h2 className="text-2xl  font-bold mb-4 text-center uppercase">
          Tin tức
        </h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 4 },
          }}
          modules={[Pagination]}
        >
          {slidePosts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="bg-black/20 rounded-md text-white overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer">
                {/* Wrapper để giữ chiều cao cố định */}
                <div className="w-full h-44 overflow-hidden">
                  <Image
                    src={post.img_url}
                    alt={post.title}
                    width={500}
                    height={750}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 text-sm">
                  <p className="font-medium text-left truncate">{post.title}</p>
                  <p className="font-medium text-left truncate">
                    {post.sub_title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </main>
  );
}
