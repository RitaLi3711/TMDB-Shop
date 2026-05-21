import { useNavigate, useParams } from "react-router-dom";
import { CartOverlay, FavoritesOverlay, ImageGrid } from "@/components";
import { getImageUrl, type ImageCell, TV_ENDPOINT, type TvDetailsResponse } from "@/core";
import { usePricing, useTmdb, useUserContext } from "@/hooks";

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { calculatePrice, formatPrice } = usePricing();
  const { favorites, toggleFavorite, cart, addToCart, removeFromCart } = useUserContext();

  const { data } = useTmdb<TvDetailsResponse>(`${TV_ENDPOINT}/${id ?? ""}`, {});

  const filteredSeasons = (data?.seasons ?? []).filter((season) => season.season_number > 0);

  const gridData: ImageCell[] = filteredSeasons.map((season) => ({
    id: season.id,
    imageUrl: getImageUrl(season.poster_path ?? ""),
    primaryText: `Season ${season.season_number}`,
    secondaryText: formatPrice(calculatePrice(season.air_date || "")),
  }));

  return (
    <div className="space-y-6 p-6">
      <h2 className="font-bold text-2xl">Seasons</h2>

      {!data ? (
        <p className="text-gray-400">Loading seasons...</p>
      ) : (
        <ImageGrid
          onClick={(image: ImageCell) => {
            const season = filteredSeasons.find((s) => s.id === image.id);
            if (season && season.season_number > 0) navigate(`/tv/${data.id}/season/${season.season_number}`);
          }}
          results={gridData}
        >
          {(item) => (
            <>
              <FavoritesOverlay
                cart={cart}
                favorites={favorites}
                item={item}
                media="tv"
                removeFromCart={removeFromCart}
                toggleFavorite={toggleFavorite}
              />
              <CartOverlay
                addToCart={addToCart}
                cart={cart}
                favorites={favorites}
                item={item}
                media="tv"
                removeFromCart={removeFromCart}
                toggleFavorite={toggleFavorite}
              />
            </>
          )}
        </ImageGrid>
      )}
    </div>
  );
};
