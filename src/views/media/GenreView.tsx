import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonGroup, FavoritesOverlay, ImageGrid, Pagination } from "@/components";
import { GENRE_ENDPOINT, type GenreResponse, getImageUrl, type ImageCell, movieGenres, tvGenres } from "@/core";
import { useTmdb, useUserContext } from "@/hooks";

export const GenreView = () => {
  const navigate = useNavigate();
  const { type: urlType = "movies", genreSlug = "action" } = useParams();
  const [type, setType] = useState<"movies" | "tv">(urlType as "movies" | "tv");
  const [page, setPage] = useState(1);
  const { favorites, toggleFavorite, moviePreferences, tvPreferences } = useUserContext();

  const genres =
    type === "movies"
      ? movieGenres.filter((genre) => moviePreferences.length === 0 || moviePreferences.includes(genre.value))
      : tvGenres.filter((genre) => tvPreferences.length === 0 || tvPreferences.includes(genre.value));

  const selectedGenre = genres.find((g) => g.slug === genreSlug)?.value ?? genres[0].value;

  const { data } = useTmdb<GenreResponse>(`${GENRE_ENDPOINT}/${type === "movies" ? "movie" : "tv"}`, { page, with_genres: selectedGenre });

  const gridData: ImageCell[] = (data?.results ?? []).map((item) => ({
    id: item.id,
    imageUrl: getImageUrl(item.poster_path ?? ""),
    primaryText: item.title || item.name || "",
  }));

  return (
    <section className="mx-auto max-w-400 space-y-5 p-5">
      <ButtonGroup
        onClick={(value) => {
          const newType = value as "movies" | "tv";
          const newGenres = newType === "movies" ? movieGenres : tvGenres;
          setType(newType);
          setPage(1);
          navigate(`/genre/${newType}/${newGenres[0].slug}`);
        }}
        options={[
          { label: "Movies", value: "movies" },
          { label: "TV", value: "tv" },
        ]}
        value={type}
      />

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Button
            key={genre.value}
            onClick={() => {
              navigate(`/genre/${type}/${genre.slug}`);
              setPage(1);
            }}
            variant={selectedGenre === genre.value ? "primary" : "grey"}
          >
            {genre.label}
          </Button>
        ))}
      </div>

      {!data ? (
        <p className="text-center text-gray-400">Loading genres...</p>
      ) : (
        <>
          <ImageGrid onClick={(image: ImageCell) => navigate(`/${type === "movies" ? "movie" : "tv"}/${image.id}`)} results={gridData}>
            {(item) => <FavoritesOverlay favorites={favorites} item={item} toggleFavorite={toggleFavorite} />}
          </ImageGrid>
          <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
        </>
      )}
    </section>
  );
};
