"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { useUserContext } from "../context/context";
import Sidebarmenu from "../components/sidebarmenu";
import Image from "next/image";

interface Item {
  id: number;
  name: string;
  icon: string | null;
}

interface GiftCode {
  id: number;
  server_id: string | null;
  code: string;
  items: Item[];
  coin: number;
  yen: number;
  gold: number;
  created_at: string;
  expired_at: string;
  updated_at: string;
  status: string;
}

export default function Home() {
  function formatYen(value: number): string {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + "ty"; // Rút gọn thành "ty" nếu giá trị > 1 tỷ
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "tr"; // Rút gọn thành "tr" nếu giá trị > 1 triệu
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k"; // Rút gọn thành "k" nếu giá trị > 1 nghìn
    }
    return value.toString(); // Nếu giá trị nhỏ hơn 1000, giữ nguyên
  }
  const [giftCodes, setGiftCodes] = useState<GiftCode[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/giftcode`)
      .then((response) => {
        const giftCodes = response.data;
        if (Array.isArray(giftCodes)) {
          setGiftCodes(giftCodes);
        } else {
          console.error("Invalid data format from API");
        }
      })
      .catch((error) => {
        console.error("Error fetching gift codes:", error);
      });
  }, []);
  const openModal = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };
  const [giftcodes, setGiftcodes] = useState<[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGiftcodes() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/giftcodes`
        );
        const data = await response.json();
        setGiftcodes(data);
      } catch (error) {
        console.error("Error fetching giftcodes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGiftcodes();
  }, []);

  return (
    <main className="section-ninja1 p-4">
      <div className="lg:mt-16 mx-auto max-w-7xl px-4  sm:px-6 lg:px-8 flex flex-row gap-4">
        {/* Sidebar component ẩn trên mobile */}
        <div className="">
          <Sidebarmenu />
        </div>
        {/* Nội dung */}
        <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h2 className="text-4xl text-center  font-bold text-primary my-4">
            Thưởng giftcode
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="transition-opacity duration-300 opacity-100 ">
              <div className="overflow-visible rounded-lg divide-y  divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow  dark:bg-gray-900">
                <table className="min-w-full overflow-x-auto table-auto divide-y  divide-gray-300 dark:divide-gray-700 overflow-hidden">
                  <thead className="divide-x divide-gray-200">
                    <tr>
                      <th className="text-center lg:w-[100px] px-3 py-3.5 font-semibold text-sm">
                        Máy chủ
                      </th>
                      <th className="text-center px-3 py-3.5 font-semibold text-sm">
                        Mã
                      </th>
                      <th className="text-center px-3 py-3.5 font-semibold text-sm">
                        Phần thưởng
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800 max-h-[9rem] overflow-y-auto">
                    {giftCodes.length > 0 ? (
                      giftCodes.map((giftCode) => (
                        <tr key={giftCode.id}>
                          <td className="px-3 py-4 text-gray-300 text-sm font-semibold">
                            {giftCode.server_id || "Tất cả máy chủ"}
                          </td>
                          <td className="px-3 py-4 text-gray-300 text-sm font-semibold">
                            {giftCode.code}
                          </td>
                          <td  className="px-3 py-4 text-gray-500 text-sm ">
                            <div className="flex flex-wrap gap-1">
                              <div className="relative inline-block transition-all hover:ring ring-primary-500 dark:hover:ring-primary-400 cursor-pointer rounded-xl">
                                {/* Container của ảnh */}
                                {giftCode.yen !== 0 && ( // Kiểm tra giá trị yen trước khi render
                                  <div
                                    className="relative select-none transition-all rounded-xl p-1 overflow-hidden hover:ring ring-primary-500 dark:hover:ring-primary-400 cursor-pointer"
                                    style={{
                                      aspectRatio: "1 / 1",
                                      maxWidth: "35px",
                                      maxHeight: "40px",
                                    }}
                                  >
                                    <Image
                                      src={"/image/icon/Small493.png"}
                                      width={110}
                                      height={110}
                                      className="object-cover hover:scale-110 transition-transform duration-300 select-none rounded-xl"
                                      style={{ color: "transparent" }}
                                      loading="lazy"
                                      alt="Gift icon"
                                    />
                                  </div>
                                )}

                                {/* Số lượng hiển thị */}
                                {giftCode.yen !== 0 && ( // Kiểm tra giá trị yen trước khi render số lượng
                                  <div className="flex items-center absolute bottom-1 right-1 rounded-md px-[5px] bg-gray-600 dark:bg-gray-700 cursor-pointer">
                                    <p
                                      className="break-words font-bold text-center"
                                      style={{
                                        color: "rgb(255, 255, 255)",
                                        fontSize: "10px",
                                      }}
                                    >
                                      {formatYen(giftCode.yen)}{" "}
                                      {/* Gọi hàm để rút gọn giá trị từ dữ liệu */}
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div className="relative inline-block transition-all hover:ring ring-primary-500 dark:hover:ring-primary-400 cursor-pointer rounded-xl">
                                {/* Container của ảnh */}
                                {giftCode.yen !== 0 && ( // Kiểm tra giá trị yen trước khi render
                                  <button
                                    className="relative select-none transition-all rounded-xl p-1 overflow-hidden"
                                    // onClick={() => openModal(item)}
                                    style={{
                                      aspectRatio: "1 / 1",
                                      maxWidth: "40px",
                                      maxHeight: "50px",
                                    }}
                                  >
                                    <Image
                                      src={"/image/icon/Small3225.png"}
                                      width={110}
                                      height={110}
                                      className="object-cover hover:scale-105 transition-transform duration-300 select-none rounded-xl"
                                      style={{ color: "transparent" }}
                                      loading="lazy"
                                      alt="Gift icon"
                                    />
                                  </button>
                                )}

                                {/* Số lượng hiển thị */}
                                {giftCode.yen !== 0 && ( // Kiểm tra giá trị yen trước khi render số lượng
                                  <div className="flex items-center absolute bottom-1 right-1 rounded-md px-[5px] bg-gray-600 dark:bg-gray-700 cursor-pointer">
                                    <p
                                      className="break-words font-bold text-center"
                                      style={{
                                        color: "rgb(255, 255, 255)",
                                        fontSize: "10px",
                                      }}
                                    >
                                      {formatYen(giftCode.coin)}{" "}
                                      {/* Gọi hàm để rút gọn giá trị từ dữ liệu */}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="relative inline-block transition-all hover:ring ring-primary-500 dark:hover:ring-primary-400 cursor-pointer rounded-xl">
                                {/* Container của ảnh */}
                                {giftCode.yen !== 0 && ( // Kiểm tra giá trị yen trước khi render
                                  <div
                                    className="relative select-none transition-all rounded-xl p-1 overflow-hidden hover:ring ring-primary-500 dark:hover:ring-primary-400 cursor-pointer"
                                    style={{
                                      aspectRatio: "1 / 1",
                                      maxWidth: "50px",
                                      maxHeight: "50px",
                                    }}
                                  >
                                    <Image
                                      src={"/image/icon/Small7085.png"}
                                      width={110}
                                      height={110}
                                      className="object-cover hover:scale-105 transition-transform duration-300 select-none rounded-xl"
                                      style={{ color: "transparent" }}
                                      loading="lazy"
                                      alt="Gift icon"
                                    />
                                  </div>
                                )}

                                {/* Số lượng hiển thị */}
                                {giftCode.yen !== 0 && ( // Kiểm tra giá trị yen trước khi render số lượng
                                  <div className="flex items-center absolute bottom-1 right-1 rounded-md px-[5px] bg-gray-600 dark:bg-gray-700 cursor-pointer">
                                    <p
                                      className="break-words font-bold text-center"
                                      style={{
                                        color: "rgb(255, 255, 255)",
                                        fontSize: "10px",
                                      }}
                                    >
                                      {formatYen(giftCode.gold)}{" "}
                                      {/* Gọi hàm để rút gọn giá trị từ dữ liệu */}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="relative inline-block transition-all hover:ring-primary-500 dark:hover:ring-primary-400 cursor-pointer rounded-xl">
                                {giftCode.items
                                  .filter((item) => item.icon) // Lọc các item có icon
                                  .map((item, index) => (
                                    <div
                                      key={`${item.id}-${index}`}
                                      className="relative inline-block transition-all rounded-xl overflow-hidden hover:ring ring-primary-500 dark:hover:ring-primary-400 cursor-pointer mr-1 "
                                      onClick={() => openModal(item)}
                                    >
                                      <div className="p-1 rounded-xl max-w-[70px] max-h-[70px]">
                                        {item.icon ? (
                                          <Image
                                            src={`/image/icon/Small${item.icon}.png`}
                                            width={60} // Kích thước ảnh cố định
                                            height={50} // Kích thước ảnh cố định
                                            layout="fixed" // Không thay đổi kích thước
                                            alt={item.name}
                                            className="object-cover hover:scale-105 transition-transform duration-300 max-h-[40px] w-[40px] h-[35px]"
                                          />
                                        ) : (
                                          <div>No icon available</div>
                                        )}
                                        {/* <span>{item.name}</span> */}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-4 text-gray-500"
                        >
                          Không có mã quà tặng nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Modal */}
              <Dialog
                open={isModalOpen}
                onClose={closeModal}
                className="fixed inset-0 z-50"
              >
                {/* Overlay */}
                <div
                  className="relative text-left rtl:text-right flex flex-col overflow-visible dark:bg-gray-900 shadow-xl w-full rounded-lg sm:my-8 max-w-[220px] sm:max-w-[220px]"
                  aria-hidden="true"
                ></div>
                <div className="flex items-center justify-center min-h-screen bg-black/30 backdrop-blur-sm rounded-sm shadow-lg p-4">
                  {selectedItem && (
                    <Dialog.Panel className="relative text-left rtl:text-right flex flex-col overflow-visible  dark:bg-gray-900 shadow-xl w-full rounded-lg sm:my-8 max-w-[220px] sm:max-w-[220px]">
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "auto",
                        }}
                        className="flex flex-col items-center pt-5 h-[120px] bg-white/60 backdrop-blur-sm rounded-sm shadow-lg p-4"
                      >
                        <Image
                          src={`/image/icon/Small${selectedItem.icon}.png`}
                          width={60} // Kích thước ảnh cố định
                          height={50} // Kích thước ảnh cố định
                          alt={selectedItem.name}
                          layout="fixed" // Không thay đổi kích thước
                          className="object-cover max-h-[70px] w-[60px] h-[50px] rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                        <p className="mt-4 text-lg text-center font-semibold text-gray-800 dark:text-gray-300">
                          {selectedItem.name}
                        </p>
                      </div>
                      {/* <button
                    onClick={closeModal}
                    className="mt-3 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                  >
                    Đóng
                  </button> */}
                    </Dialog.Panel>
                  )}
                </div>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
