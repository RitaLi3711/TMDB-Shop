import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ICON_SIZE, type ImageCell, type Media } from "@/core";

type FavoritesOverlayProps = {
  item: ImageCell;
  favorites: Map<number, ImageCell>;
  toggleFavorite: (item: ImageCell) => void;
  media: Media; // Add this prop
};

export const FavoritesOverlay = ({ item, favorites, toggleFavorite, media }: FavoritesOverlayProps) => (
  <button
    className="absolute top-1 right-1 z-10 rounded-full bg-black/50 p-2 backdrop-blur-sm transition hover:bg-black/70"
    onClick={(event) => {
      event.stopPropagation();
      const favoriteItem = {
        ...item,
        media, // Use the media prop from parent
      };
      toggleFavorite(favoriteItem);
    }}
  >
    {favorites.has(item.id) ? (
      <FaHeart className="text-blue-500" size={ICON_SIZE} />
    ) : (
      <FaRegHeart className="text-white" size={ICON_SIZE} />
    )}
  </button>
);
