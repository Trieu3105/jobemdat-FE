import Image from "next/image";



export default function Nhanvat() {
  return (
    <main className="bg-gray-700 text-black font-sans">
      <section className="max-w-screen-xl mx-auto">
        {/* Image + Description */}
        <div className="relative flex justify-center">
          {/* Right: image preview */}
          <div className="relative w-full max-w-2xl h-auto z-10">
            <Image
              src="/image/icon/bow.webp"
              alt="Bow Weapon"
              className="object-cover h-full rounded-lg shadow-lg"
            />
          </div>
          {/* Left box: description - overlapped (ăn theo ảnh) */}
          <div className="absolute left-20 z-20 p-6 text-black max-w-sm">
            <h2 className="text-5xl sm:text-6xl font-bold text-yellow-800 uppercase tracking-wider mb-2 border-b-2 border-yellow-800 inline-block">
              Deadly <br /> Weapon
            </h2>
            <span className="bg-red-950 text-white p-4 mt-4 block">
              <h3 className="text-3xl font-bold mb-3 tracking-widest">BOW</h3>
              <p className="text-sm leading-relaxed">
                A ranged weapon with a lengthy presence upon history&#39;s
                battlefields. In fact, many in Eternia are surnamed &#39;Fletcher&#39;
                due to the booming trade their ancestors dealt in.
              </p>
            </span>
            <div className="mt-8">
              <button className="bg-red-900 text-white px-8 py-3 font-bold uppercase shadow-md hover:bg-red-800 transition">
                View All
              </button>
            </div>
          </div>
          {/* Button View All */}
        </div>

        {/* Tabs + Weapon Icons */}
        <div className="mt-16 flex flex-col md:flex-row gap-6">
          {/* Left-side vertical buttons */}
          <div className="flex flex-col gap-4 justify-center items-center">
            <button className="bg-black text-white px-6 py-3 uppercase font-bold tracking-wider w-40">
              Nhân vật
            </button>
            <button className="bg-yellow-600 text-white px-6 py-3 uppercase font-bold tracking-wider w-40">
              Vũ khí
            </button>
          </div>

          {/* Right-side weapon icons */}
          <div className="bg-red-900 p-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 rounded-md flex-1">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className={`aspect-square flex items-center justify-center rounded-md shadow-md cursor-pointer ${
                  idx === 6 ? "bg-yellow-600 text-white" : "bg-white text-black"
                }`}
              >
                Icon {idx + 1}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
