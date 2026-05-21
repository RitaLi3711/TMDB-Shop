import { FaHeart, FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import type { ImageCell } from "@/core";
import { useUserContext } from "@/hooks";

export const CartView = () => {
  const { cart, removeFromCart, favorites, toggleFavorite, clearCart } = useUserContext();

  const items = Array.from(cart.values());
  const ITEM_PRICE = 19.99;

  const subtotal = items.length * ITEM_PRICE;
  const taxes = subtotal * 0.13;
  const total = subtotal + taxes;

  const handleMoveToFavorites = (item: ImageCell) => {
    removeFromCart(item.id);
    if (!favorites.has(item.id)) {
      toggleFavorite(item);
    }
  };

  const handleEmptyCart = () => {
    clearCart();
  };

  return (
    <section className="mx-auto w-full max-w-7xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-bold text-3xl text-white">Cart</h1>
        {items.length > 0 && (
          <button
            className="rounded-md bg-red-500 px-4 py-2 font-semibold text-sm text-white transition hover:bg-red-600"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-slate-700 bg-[#081325] p-10 text-center text-gray-400">Your cart is empty</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#081325]">
          <div className="grid grid-cols-[2.5fr_0.7fr_0.7fr_0.5fr] bg-[#1b2940] px-6 py-4 font-semibold text-sm text-white">
            <p>Items</p>
            <p>Type</p>
            <p>Price</p>
            <p className="text-right">Actions</p>
          </div>

          {items.map((item) => (
            <div className="grid grid-cols-[2.5fr_0.7fr_0.7fr_0.5fr] items-center border-slate-700 border-t px-6 py-4" key={item.id}>
              <div className="flex items-center gap-4">
                <img alt={item.primaryText} className="h-24 w-16 rounded object-cover" src={item.imageUrl} />
                <p className="text-sm text-white">{item.primaryText}</p>
              </div>

              <p className="text-gray-300 text-sm">{item.media === "tv" ? "TV Show" : "Movie"}</p>

              <p className="font-semibold text-white">${ITEM_PRICE.toFixed(2)}</p>

              <div className="flex justify-end gap-4 text-gray-300">
                <button className="transition hover:text-white" onClick={() => handleMoveToFavorites(item)}>
                  {favorites.has(item.id) ? (
                    <FaHeart className="text-blue-500" size={18} />
                  ) : (
                    <FaRegHeart className="text-white" size={18} />
                  )}
                </button>
                <button className="transition hover:text-red-400" onClick={() => removeFromCart(item.id)}>
                  <FaRegTrashAlt size={18} />
                </button>
              </div>
            </div>
          ))}

          <div className="border-slate-700 border-t">
            <div className="grid grid-cols-2 px-6 py-4 text-white">
              <p className="text-center font-semibold">Subtotal</p>
              <p className="font-semibold">${subtotal.toFixed(2)}</p>
            </div>

            <div className="grid grid-cols-2 border-slate-700 border-t px-6 py-4 text-white">
              <p className="text-center font-semibold">Taxes (13%)</p>
              <p className="font-semibold">${taxes.toFixed(2)}</p>
            </div>

            <div className="grid grid-cols-2 border-slate-700 border-t bg-[#1b2940] px-6 py-4 text-white">
              <p className="text-center font-bold text-lg">Total</p>
              <p className="font-bold text-blue-400 text-lg">${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
