import React from "react";
import { QrBankingResponse } from "@/app/payments/page";

interface ModalVietQRProps {
  isOpen: boolean;
  onClose: () => void; // Renamed from closeModal to onClose
  qrData: QrBankingResponse | null;
  amount: number;
  transactionCode: string;
}

const ModalVietQR: React.FC<ModalVietQRProps> = ({
  isOpen,
  onClose, // Updated prop name
  qrData,
  amount,
  transactionCode,
}) => {
  if (!isOpen || !qrData) return null;

  const { bankInfo, qrCodeUrl } = qrData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative text-left h-auto rtl:text-right flex flex-col justify-center items-center overflow-visible bg-white dark:bg-gray-900 shadow-xl w-full max-w-lg rounded-lg p-6">
        <div className="flex items-end justify-end w-full">
          <button
            type="button"
            onClick={onClose} // Updated to use onClose
            className="text-sm font-medium rounded-md px-3 py-1.5 ring-1 ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none"
          >
            Đóng
          </button>
        </div>

        <table className="w-full text-sm text-left text-emerald-600 border border-gray-200">
          <tbody>
            <tr className="border-b">
              <th className="px-4 py-2  bg-emerald-100 text-emerald-700 w-1/3">
                Cổng nạp
              </th>
              <td className="px-4 py-2">Banking</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 bg-emerald-100 text-emerald-700">
                Người hưởng thụ
              </th>
              <td className="px-4 py-2">NGUYEN QUOC TRIEU</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 bg-emerald-100 text-emerald-700">
                Số tài khoản
              </th>
              <td className="px-4 py-2">{bankInfo.accountNumber}</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 bg-emerald-100 text-emerald-700">
                Số tiền
              </th>
              <td className="px-4 py-2">
                {amount.toLocaleString("vi-VN")} VND
              </td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-emerald-100 text-emerald-700">
                Nội dung
              </th>
              <td className="px-4 py-2">{transactionCode}</td>
            </tr>
          </tbody>
        </table>

        {qrCodeUrl && (
          <img
            src={qrCodeUrl}
            alt="QR code"
            loading="lazy"
            width={300}
            height={300}
            decoding="async"
            className="mt-4 object-cover select-none rounded"
          />
        )}
      </div>
    </div>
  );
};

export default ModalVietQR;
