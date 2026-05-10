import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonGroup, ImageGrid, Pagination } from "@/components";
import { IMAGE_BASE_URL, type TelevisionResponse, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const TelevisionView = () => {
  const { interval } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const category = interval ?? "airing_today";

  const { data } = useTmdb<TelevisionResponse>(`${TV_ENDPOINT}/${category}`, { page }, [category, page]);

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <section className="mx-auto max-w-[1600px] space-y-5 p-5">
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
      <ImageGrid
        onClick={(id) => navigate(`/tv/${id}`)}
        results={data.results.map((result) => ({
          id: result.id,
          imageUrl: `${IMAGE_BASE_URL}${result.poster_path ?? ""}`,
          primaryText: result.name || result.original_name || "",
        }))}
      />
      <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
    </section>
  );
};
