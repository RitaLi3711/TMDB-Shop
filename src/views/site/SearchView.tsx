import { useState } from "react";
import { FaFrown } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageGrid, Pagination } from "@/components";
import { getImageUrl, type ImageCell, SEARCH_ENDPOINT, type SearchResponse } from "@/core";
import { useDebounce, useTmdb } from "@/hooks";

export const SearchView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const type = searchParams.get("type") ?? "movie";
  const [page, setPage] = useState(1);
  const debounced = useDebounce(query, 500);
  const { data } = useTmdb<SearchResponse>(`${SEARCH_ENDPOINT}/${type}`, { page, query: debounced });

  const gridData: ImageCell[] = (data?.results ?? []).map((item) => ({
    id: item.id,
    imageUrl: getImageUrl(item.poster_path ?? item.profile_path ?? ""),
    primaryText: item.name ?? item.title ?? "Untitled",
  }));

  return (
    <section className="mx-auto max-w-400 space-y-5 p-5">
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-2xl text-white">Search for:</h1>
        <span className="text-2xl text-gray-400">{query || ""}</span>
      </div>

      {!data ? (
        <p className="text-center text-[#f0f4ef]">Loading...</p>
      ) : data.results.length ? (
        <>
          <ImageGrid images={gridData} onClick={(image: ImageCell) => navigate(`/${type}/${image.id}`)} />
          <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
        </>
      ) : (
        <div className="py-12 text-center">
          <FaFrown className="mx-auto mb-4 h-16 w-16 text-gray-600" />
          <p className="text-gray-400 text-lg">No search results found</p>
        </div>
      )}
    </section>
  );
};
