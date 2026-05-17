import { FavoritesOverlay, ImageGrid } from '@/components';
import { useUserContext } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useUserContext();

  return (
    <section className="w-full max-w-7xl mx-auto space-y-5 p-5">
      <h1 className="text-3xl font-bold">Favorites</h1>
      {favorites.size !== 0 ? (
        <ImageGrid results={Array.from(favorites.values())} onClick={(id) => navigate(`/movie/${id}/credits`)}>
          {(item) => <FavoritesOverlay item={item} favorites={favorites} toggleFavorite={toggleFavorite} />}
        </ImageGrid>
      ) : (
        <p className="text-center text-gray-400 mt-10">You have no favorites yet</p>
      )}
    </section>
  );
};
