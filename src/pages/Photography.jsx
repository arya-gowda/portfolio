import { useState } from "react";
import { SlClose, SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { motion } from "framer-motion";

const collections = [
  { name: "Featured", value: "featured" },
  { name: "Collections", value: "collections" },
];

export default function Photography() {
  const [selected, setSelected] = useState("featured");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);


  const images = import.meta.glob('../assets/images/*.jpg', {
    eager: true,
    import: 'default',
  });
  const photos = Object.values(images);

  const showPrev = () => setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const showNext = () => setSelectedIndex((prev) => (prev < photos.length - 1 ? prev + 1 : prev));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="w-full flex justify-between items-end-safe mb-6">
        <div className="w-full text-center">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <p className="text-zinc-400 text-lg">A selection of my photos</p>
        </div>
        {/* <div className="flex gap-2 mt-4 sm:mt-0">
          {collections.map((col) => (
            <button
              key={col.value}
              className={`px-4 py-1 rounded-full border transition ${
                selected === col.value
                  ? "bg-violet-500 text-white border-violet-500"
                  : "bg-zinc-800 text-zinc-200 border-zinc-600 hover:bg-zinc-700"
              }`}
              onClick={() => setSelected(col.value)}
            >
              {col.name}
            </button>
          ))}
        </div> */}
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Photo ${i + 1}`}
            className="break-inside-avoid w-full rounded-md shadow hover:scale-103 transition-transform"
            onClick={() => openModal(i)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.01 }}
          />
        ))}
      </div>
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-zinc-300 hover:text-white text-3xl hover:scale-110 transition-transform"
            aria-label="Close"
          >
            <SlClose />
          </button>
          <button
            onClick={showPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 hover:bg-zinc-800/50 hover:text-white rounded-full py-3 pr-4 pl-2 transition"
            disabled={selectedIndex === 0}
          >
            <SlArrowLeft size={40} />
          </button>
          <img
            src={photos[selectedIndex]}
            alt={`Large view of Photo ${selectedIndex + 1}`}
            className="max-h-[80vh] max-w-[90vw] shadow-xl"
          />
          <button
            onClick={showNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 hover:bg-zinc-800/50 hover:text-white rounded-full py-3 pl-4 pr-2 transition"
            disabled={selectedIndex === photos.length - 1}
          >
            <SlArrowRight size={40} />
          </button>
        </div>
      )}
    </div>
  );
}