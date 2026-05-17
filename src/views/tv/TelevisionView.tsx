import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonGroup, FavoritesOverlay, ImageGrid, Pagination } from "@/components";
import { getImageUrl, type ImageCell, type TelevisionResponse, TV_ENDPOINT } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const TelevisionView = () => {
  const { interval } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const category = interval ?? "airing_today";
  const { favorites, toggleFavorite } = useUserContext();

  const { data } = useTmdb<TelevisionResponse>(`${TV_ENDPOINT}/${category}`, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path ?? ""),
    primaryText: result.name || result.original_name || "",
  }));

  return (
    <section className="mx-auto max-w-400 space-y-5 p-5">
      <ButtonGroup
        onClick={(value) => {
          setPage(1);
          navigate(`/tv/category/${value}`);
        }}
        options={[
          { label: "Airing Today", value: "airing_today" },
          { label: "On The Air", value: "on_the_air" },
          { label: "Popular", value: "popular" },
          { label: "Top Rated", value: "top_rated" },
        ]}
        value={category}
      />
      {!data ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <>
          <ImageGrid onClick={(image: ImageCell) => navigate(`/tv/${image.id}`)} results={gridData}>
            {(item) => <FavoritesOverlay favorites={favorites} item={item} media="tv" toggleFavorite={toggleFavorite} />}
          </ImageGrid>
          <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
        </>
      )}
    </section>
  );
};
