import { PiShoppingCartFill, PiShoppingCartSimple } from "react-icons/pi";
import { ICON_SIZE, type ImageCell, type Media } from "@/core";

type CartOverlayProps = {
  item: ImageCell;
  cart: Map<number, ImageCell>;
  favorites: Map<number, ImageCell>;
  addToCart: (item: ImageCell) => void;
  removeFromCart: (id: number) => void;
  toggleFavorite: (item: ImageCell) => void;
  media: Media;
};

export const CartOverlay = ({ item, cart, favorites, addToCart, removeFromCart, toggleFavorite, media }: CartOverlayProps) => (
  <button
    className="absolute top-1 left-1 z-10 rounded-full bg-black/50 p-2 backdrop-blur-sm transition hover:bg-black/70"
    onClick={(event) => {
      event.stopPropagation();
      if (cart.has(item.id)) {
        removeFromCart(item.id);
      } else {
        if (favorites.has(item.id)) {
          toggleFavorite(item);
        }
        const cartItem = { ...item, media };
        addToCart(cartItem);
      }
    }}
  >
    {cart.has(item.id) ? (
      <PiShoppingCartFill className="text-green-500" size={ICON_SIZE} />
    ) : (
      <PiShoppingCartSimple className="text-white" size={ICON_SIZE} />
    )}
  </button>
);
