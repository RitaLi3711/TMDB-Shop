import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonGroup, ImageGrid, Pagination } from "@/components";
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, type MoviesResponse } from "@/core";
import { useTmdb } from "@/hooks";

export const MoviesView = () => {
  const { interval } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const category = interval ?? "now_playing";
  const { data } = useTmdb<MoviesResponse>(`${MOVIE_ENDPOINT}/${category}`, { page }, [category, page]);

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <section className="mx-auto max-w-[1600px] space-y-5 p-5">
      <ButtonGroup
        onClick={(value) => {
          setPage(1);
          navigate(`/movies/category/${value}`);
        }}
        options={[
          { label: "Now Playing", value: "now_playing" },
          { label: "Popular", value: "popular" },
          { label: "Top Rated", value: "top_rated" },
          { label: "Upcoming", value: "upcoming" },
        ]}
        value={category}
      />
      <ImageGrid
        onClick={(id) => navigate(`/movie/${id}`)}
        results={data.results.map((result) => ({
          id: result.id,
          imageUrl: `${IMAGE_BASE_URL}${result.poster_path ?? ""}`,
          primaryText: result.original_title || "",
        }))}
      />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
