import { motion } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <motion.p
        className="text-zinc-400 text-lg"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {label}
      </motion.p>
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <motion.p
        className="text-red-400 text-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {message}
      </motion.p>
    </div>
  );
}

export function Spinner({ label = 'Loading...' }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="text-violet-400 text-4xl"
      >
        <AiOutlineLoading3Quarters />
      </motion.div>
      <p className="text-zinc-400">{label}</p>
    </div>
  );
}
