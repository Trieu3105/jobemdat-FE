"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import router for redirection
import { useUserContext } from "../context/context"; 
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginModal from "../auth/login/page";     
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import Sidebarmenu from "../components/sidebarmenu";
import PaymentModal from "../components/paymodal"; 
import { v4 as uuidv4 } from "uuid";

export interface BankInfo {
  accountNumber: string;
  accountName: string;
  bankCode: string;
}

export interface QrBankingResponse {
  qrCodeUrl: string;
  bankInfo: BankInfo;
}

export default function PaymentPage() {
  const [method, setMethod] = useState("bank");
  const [amount, setAmount] = useState("");
  const [bonus, setBonus] = useState(10); 
  const [qrData, setQrData] = useState<QrBankingResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [transactionCode, setTransactionCode] = useState(""); 
  const [selectedBank, setSelectedBank] = useState(""); 
  const { user } = useUserContext(); // Access user from context
  const router = useRouter(); // Initialize router

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect to homepage if user is not logged in
    }
  }, [user, router]);

  const handleAmountChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, ""); 
    setAmount(value);
  };

  const calculateTotal = () => {
    const parsed = parseInt(amount || "0");
    return Math.floor(parsed + (parsed * bonus) / 100);
  };

  const handleConfirmPayment = async () => {
    if (!selectedBank) {
      alert("Vui lòng chọn ngân hàng");
      return;
    }
    if (!amount || isNaN(parseInt(amount))) {
      alert("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/banking`,
        {
          amount: parseInt(amount),
          paymentOption: method,
          ratio: bonus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          withCredentials: true,
        }
      );
      console.log("API trả về kết quả:", res.data);
      setQrData(res.data.data);
      setTransactionCode(uuidv4());
      setIsModalOpen(true);
    } catch (error: any) {
      console.error("Lỗi thanh toán:", error);
      if (error.response) {
        console.error("Chi tiết lỗi từ server:", error.response.data);
        if (error.response.status === 403) {
          alert("Bạn không có quyền thực hiện giao dịch này. Vui lòng kiểm tra lại.");
        }
      } else {
        alert("Giao dịch thất bại. Vui lòng thử lại sau.");
      }
    }
  };

  if (!user) {
    return null; // Prevent rendering if user is not logged in
  }

  return (
    <main className="lg:mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-screen flex flex-row gap-4">
      <div>
        <Sidebarmenu />
      </div>

      <div className="flex justify-center items-start w-full">
        <div className="max-w-xl w-full space-y-6">
          {/* Bước 1: Chọn phương thức */}
          <Card className="p-4 space-y-2 bg-white">
            <h2 className="text-lg font-semibold text-green-600">
              1. Chọn phương thức nạp
            </h2>
            <div className="flex gap-4">
              <button
                className={`flex-1 p-3 border rounded ${
                  method === "bank"
                    ? "bg-green-100 border-green-500"
                    : "border-gray-300"
                }`}
                onClick={() => setMethod("bank")}
              >
                <div className="font-medium text-black">Ngân Hàng</div>
                <div className="text-xs text-gray-500">Không giới hạn</div>
              </button>
              <button
                className={`flex-1 p-3 border rounded ${
                  method === "card"
                    ? "bg-green-100 border-green-500"
                    : "border-gray-300"
                }`}
                onClick={() => setMethod("card")}
              >
                <div className="font-medium text-black">Thẻ Cào</div>
                <div className="text-xs text-gray-500">
                  Tối đa: 1,000,000 VND
                </div>
              </button>
            </div>
          </Card>

          {/* Bước 2: Nhập thông tin */}
          <Card className="p-4 space-y-3 bg-white">
            <h2 className="text-lg font-semibold text-green-600">
              2. Nhập thông tin thanh toán
            </h2>

            {/* Chọn Ngân Hàng */}
            <div>
              <label className="text-sm mb-1 block text-black">
                Chọn Ngân Hàng
              </label>
              <Select onValueChange={setSelectedBank}>
                <SelectTrigger className="w-full text-black">
                  <SelectValue placeholder="Chọn ngân hàng" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="Agribank">
                    <div className="flex items-center gap-2">
                      <img
                        src="/image/Icon-Agribank.webp"
                        alt="Agribank"
                        width={24}
                        height={24}
                      />
                      Agribank
                    </div>
                  </SelectItem>
                  <SelectItem value="Vietcombank">
                    <div className="flex items-center gap-2">
                      <img
                        src="/image/vietcom.png"
                        alt="Vietcombank"
                        width={24}
                        height={24}
                      />
                      Vietcombank
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-1  block text-black">
                Số tiền nạp
              </label>
              <Input
                placeholder="Nhập số tiền"
                value={amount}
                onChange={handleAmountChange}
                className="text-black"
              />
              <p className="text-xs text-black mt-1">
                Min: 10,000 - Max: Không giới hạn
              </p>
            </div>

            <div>
              <label className="text-sm mb-1 block text-black">
                Khuyến mãi
              </label>
              <Input value={`+${bonus}%`} readOnly className="text-black" />
            </div>

            <div>
              <label className="text-sm mb-1 block text-black">
                Số tiền nhận được
              </label>
              <Input
                value={`${calculateTotal().toLocaleString()} VND`}
                readOnly
                className="text-black"
              />
            </div>
            <Card className="p-4 bg-white">
              <h2 className="text-lg font-semibold text-green-600">
                Xác nhận giao dịch
              </h2>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" className="text-black">
                  Lịch sử
                </Button>
                <Button
                  onClick={handleConfirmPayment}
                  disabled={!selectedBank || !amount}
                  className={`bg-orange-500 hover:bg-orange-600 text-white ${
                    !selectedBank || !amount
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  ✓ Xác nhận thanh toán
                </Button>
              </div>
            </Card>
          </Card>

          {/* Bước 3: Xác nhận */}
        </div>
      </div>

      {/* Modal Hiển thị khi nhấn xác nhận thanh toán */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        qrData={qrData}
        amount={parseInt(amount, 10)}
        transactionCode={transactionCode} // Pass transactionCode to the modal
      />
    </main>
  );
}
