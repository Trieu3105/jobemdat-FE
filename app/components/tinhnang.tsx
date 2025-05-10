"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInDown } from "./motionVariants";

export default function Tinhnang() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts`
        );
        const data = await response.json();
        if (data.success) {
          setImages(data.contentData.map((item: any) => item.img_url));
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
    fetchImages();
  }, []);

  return (
   <main className="text-white section-ninja1 bg-cover bg-no-repeat bg-center">
  <div className="py-16 lg:mx-16 mx-4 flex flex-col lg:flex-row items-center justify-between gap-10">
    {/* Nội dung bên trái */}
    <div className="lg:w-1/2 w-full text-center lg:text-left">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 uppercase leading-tight">
        Trò Chơi Battle Royale Ninja Đầu Tiên
      </h1>
      <p className="text-base sm:text-lg mb-6">
        Từ ngôi làng cổ, những ninja huyền thoại đã trở lại, tham gia vào
        cuộc chiến sinh tồn để giành lấy danh hiệu tối thượng. Trải nghiệm
        những pha hành động kịch tính, kỹ năng parkour, né tránh và tấn công
        hoàn hảo!
      </p>
      <p className="text-base sm:text-lg mb-6">
        NSO mang đến cho bạn trải nghiệm battle royale cận chiến độc đáo:
        chiến đấu bằng kiếm, phi tiêu, kỹ năng nhẫn thuật cùng những màn đấu
        trí căng thẳng giữa các ninja. Leo tường, lướt mái, phục kích kẻ
        địch bằng móc câu và kỹ năng ẩn thân đỉnh cao.
      </p>
      <p className="text-base sm:text-lg mb-8">
        Hơn 10 triệu người chơi đã gia nhập chiến trường, còn bạn thì sao?
        Khám phá vùng đất nguy hiểm nhưng đầy mê hoặc của Làng Lá và Thành
        Phố Ninja ngay hôm nay!
      </p>
      <div className="space-x-4 flex justify-center lg:justify-start">
        <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
          Tải Game
        </button>
        <button className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
          Xem Nhân Vật
        </button>
      </div>
    </div>

    {/* Slide hình ảnh bên phải */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeInDown}
      className="lg:w-1/2 w-full overflow-hidden max-w-full mt-8 lg:mt-0"
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        effect="slide"
        speed={1000}
        className="relative w-full h-full"
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <Image
              src={url}
              alt={`Slide ${index + 1}`}
              width={500}
              height={750}
              className="w-full h-96 object-cover rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  </div>
</main>
  );
}
