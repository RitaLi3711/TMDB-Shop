import { useNavigate } from "react-router-dom";
import { FavoritesOverlay, ImageGrid } from "@/components";
import { useUserContext } from "@/hooks";

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useUserContext();

  return (
    <section className="mx-auto w-full max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Favorites</h1>
      {favorites.size !== 0 ? (
        <ImageGrid onClick={(id) => navigate(`/movie/${id}/credits`)} results={Array.from(favorites.values())}>
          {(item) => <FavoritesOverlay favorites={favorites} item={item} toggleFavorite={toggleFavorite} />}
        </ImageGrid>
      ) : (
        <p className="mt-10 text-center text-gray-400">You have no favorites yet</p>
      )}
    </section>
  );
};
