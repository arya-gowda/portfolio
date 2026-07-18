import { useState, useEffect, useMemo } from "react";
import { SlClose, SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { motion } from "framer-motion";
import { Spinner, ErrorState } from "../components/LoadingState";

const thumbModules = import.meta.glob('../assets/images/*.jpg', {
  eager: true,
  import: 'default',
  query: { w: '480', format: 'webp', quality: '75', as: 'metadata:src;width;height' },
});
const largeModules = import.meta.glob('../assets/images/*.jpg', {
  eager: true,
  import: 'default',
  query: { w: '1600', format: 'webp', quality: '80', as: 'metadata:src;width;height' },
});

const byFilename = (modules) => {
  const map = {};
  for (const [path, mod] of Object.entries(modules)) {
    map[path.split('/').pop()] = mod;
  }
  return map;
};

const thumbs = byFilename(thumbModules);
const larges = byFilename(largeModules);

export default function Photography() {
  const [allPhotos, setAllPhotos] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/photos.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setAllPhotos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const collections = useMemo(() => {
    const values = new Set(allPhotos.map((p) => p.collection).filter(Boolean));
    return ["all", ...Array.from(values).sort()];
  }, [allPhotos]);

  const photos = useMemo(
    () => allPhotos.filter((p) => selectedCollection === "all" || p.collection === selectedCollection),
    [allPhotos, selectedCollection]
  );

  if (loading) return <Spinner label="Loading photos..." />;
  if (error) return <ErrorState message={`Error loading photos: ${error}`} />;

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const showPrev = () => setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const showNext = () => setSelectedIndex((prev) => (prev + 1));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="w-full flex flex-col items-center gap-4 mb-6 text-center">
        <div>
          <h1 className="text-4xl font-bold">Gallery</h1>
          <p className="text-zinc-400 text-lg">A selection of my photos</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          {collections.map((col) => (
            <button
              key={col}
              className={`capitalize px-4 py-1 rounded-full border transition ${
                selectedCollection === col
                  ? "bg-violet-500 text-white border-violet-500"
                  : "bg-zinc-800 text-zinc-200 border-zinc-600 hover:bg-zinc-700"
              }`}
              onClick={() => setSelectedCollection(col)}
            >
              {col}
            </button>
          ))}
        </div>
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos.map((photo, i) => {
          const thumb = thumbs[photo.file];
          if (!thumb) return null;
          return (
            <motion.img
              key={photo.file}
              src={thumb.src}
              width={thumb.width}
              height={thumb.height}
              loading="lazy"
              alt={photo.title || "Photo"}
              className="break-inside-avoid w-full rounded-md shadow hover:scale-103 transition-transform"
              onClick={() => openModal(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.01 }}
            />
          );
        })}
      </div>
      {selectedIndex !== null && photos[selectedIndex] && (
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
            src={larges[photos[selectedIndex].file]?.src}
            alt={photos[selectedIndex].title || "Large view of photo"}
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
