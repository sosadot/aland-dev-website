// components/NowPlaying.jsx
import { motion } from "framer-motion";
import { BsSpotify } from "react-icons/bs";
import { useTranslation } from "react-i18next";

export default function NowPlaying() {
  const { t } = useTranslation();

  const track = {
    title: t("nowplaying.title"),
    artist: "Asme – Madonna",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2739974c28a4c7cc8bd554fb38e",
    url: "https://open.spotify.com/track/7pAHYlFX5bqziiSGodIs1x?autoplay=true",
  };

  return (
    <motion.div
      className="flex items-center gap-4 bg-[#008a00]/95 p-4 rounded-lg backdrop-blur"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <img src={track.albumArt} alt="Album art" className="w-14 h-14 rounded-md" />
      <div>
        <p className="text-white font-semibold">{track.title}</p>
        <a href={track.url} className="text-green-300 text-sm" target="_blank" rel="noreferrer">
          {track.artist}
        </a>
      </div>
      <BsSpotify className="text-green-500 text-2xl ml-auto" />
    </motion.div>
  );
}