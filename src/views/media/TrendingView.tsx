import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ButtonGroup, ImageGrid } from "@/components";
import { getImageUrl, type ImageCell, TRENDING_ENDPOINT, type TrendingResponse } from "@/core";
import { useTmdb } from "@/hooks";

export const TrendingView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [type, setType] = useState<"movies" | "tv">("movies");
  const [timeWindow, setTimeWindow] = useState<"day" | "week">((searchParams.get("interval") as "day" | "week") || "day");

  useEffect(() => {
    navigate(`/trending/${type}?interval=${timeWindow}`, { replace: true });
  }, [timeWindow, type, navigate]);

  const { data } = useTmdb<TrendingResponse>(`${TRENDING_ENDPOINT}/${type === "movies" ? "movie" : type}/${timeWindow}`, {});

  const gridData: ImageCell[] = (data?.results ?? []).slice(0, 20).map((item) => ({
    id: item.id,
    imageUrl: getImageUrl(item.poster_path ?? ""),
    primaryText: item.title || item.name || "",
  }));

  return (
    <section className="mx-auto max-w-400 space-y-5 p-5">
      <div className="flex items-center justify-between">
        <ButtonGroup
          onClick={(value) => setType(value as "movies" | "tv")}
          options={[
            { label: "Movies", value: "movies" },
            { label: "TV", value: "tv" },
          ]}
          value={type}
        />

        <ButtonGroup
          onClick={(value) => setTimeWindow(value as "day" | "week")}
          options={[
            { label: "Today", value: "day" },
            { label: "Week", value: "week" },
          ]}
          value={timeWindow}
        />
      </div>

      {!data ? (
        <p className="text-center text-gray-400">Loading trending...</p>
      ) : (
        <ImageGrid
          images={gridData}
          onClick={(image: ImageCell) => {
            const item = data.results.find((result) => result.id === image.id);
            navigate(item?.media_type === "movie" ? `/movie/${image.id}` : `/tv/${image.id}`);
          }}
        />
      )}
    </section>
  );
};
