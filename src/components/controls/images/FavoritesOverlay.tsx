import { ICON_SIZE, type ImageCell } from '@/core';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

type FavoritesOverlayProps = {
  item: ImageCell;
  favorites: Map<number, ImageCell>;
  toggleFavorite: (item: any) => void;
};

export const FavoritesOverlay = ({ item, favorites, toggleFavorite }: FavoritesOverlayProps) => (
  <button
    onClick={(event) => {
      event.stopPropagation();
      toggleFavorite(item);
    }}
    className="absolute top-1 right-1 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition"
  >
    {favorites.has(item.id) ? (
      <FaHeart size={ICON_SIZE} className="text-blue-500" />
    ) : (
      <FaRegHeart size={ICON_SIZE} className="text-white" />
    )}
  </button>
);
