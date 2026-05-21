import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, FavoritesOverlay, ImageGrid } from "@/components";
import { useUserContext } from "@/hooks";

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, cart, removeFromCart } = useUserContext();
  const [type, setType] = useState<"movie" | "tv">("movie");

  const items = Array.from(favorites.values());
  const movies = items.filter((i) => i.media === "movie");
  const tvShows = items.filter((i) => i.media === "tv");
  const filtered = type === "movie" ? movies : tvShows;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-5 p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Favorites</h1>
        <ButtonGroup
          onClick={(v) => setType(v as "movie" | "tv")}
          options={[
            { label: "Movies", value: "movie" },
            { label: "TV", value: "tv" },
          ]}
          value={type}
        />
      </div>

      <h2 className="font-semibold text-2xl">{type === "movie" ? "Movies" : "TV Shows"}</h2>

      {filtered.length !== 0 ? (
<ImageGrid onClick={(item) => navigate(`/${type}/${item.id}/summary`)} results={filtered}>
  {(item) => (
    <>
      <FavoritesOverlay
        cart={cart}
        favorites={favorites}
        item={item}
        media={type}
        removeFromCart={removeFromCart}
        toggleFavorite={toggleFavorite}
      />
    </>
  )}
</ImageGrid>
      ) : (
        <p className="mt-10 text-center text-gray-400">
          {type === "movie" ? "You have no favorite movies yet." : "You have no favorite TV shows yet."}
        </p>
      )}
    </section>
  );
};
