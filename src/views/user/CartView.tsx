import { ImageGrid } from "@/components";
import { useUserContext } from "@/hooks";

export const CartView = () => {
  const { cart } = useUserContext();
  const items = Array.from(cart.values());

  return (
    <section className="mx-auto w-full max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Shopping Cart</h1>
      {items.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty</p>
      ) : (
        <ImageGrid onClick={() => {}} results={items}>
          {(item) => <div>{item.primaryText}</div>}
        </ImageGrid>
      )}
    </section>
  );
};
