
import { motion } from "framer-motion";
import { Bus, MapPin } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#101c3a] text-white">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500 shadow-2xl shadow-orange-500/30"
      >
        <Bus size={42} strokeWidth={1.7} />
      </motion.div>
      <h1 className="text-3xl font-black tracking-[0.18em]">VOYABUS</h1>
      <p className="mt-2 text-sm text-blue-200">Every journey starts here.</p>
      <div className="mt-9 flex items-center gap-3">
        <MapPin size={17} className="text-orange-400" />
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="h-full rounded-full bg-orange-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
