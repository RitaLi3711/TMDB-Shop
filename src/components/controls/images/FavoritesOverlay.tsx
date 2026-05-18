import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ICON_SIZE, type ImageCell, type Media } from "@/core";

type FavoritesOverlayProps = {
  item: ImageCell;
  favorites: Map<number, ImageCell>;
  cart: Map<number, ImageCell>;
  toggleFavorite: (item: ImageCell) => void;
  removeFromCart: (id: number) => void;
  media: Media;
};

export const FavoritesOverlay = ({ item, favorites, cart, toggleFavorite, removeFromCart, media }: FavoritesOverlayProps) => (
  <button
    className="absolute top-1 right-1 z-10 rounded-full bg-black/50 p-2 backdrop-blur-sm transition hover:bg-black/70"
    onClick={(event) => {
      event.stopPropagation();
      if (cart.has(item.id)) {
        removeFromCart(item.id);
      }
      const favoriteItem = { ...item, media };
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
