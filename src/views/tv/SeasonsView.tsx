import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { getImageUrl, type ImageCell, TV_ENDPOINT, type TvDetailsResponse } from "@/core";
import { useTmdb } from "@/hooks";

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useTmdb<TvDetailsResponse>(`${TV_ENDPOINT}/${id ?? ""}`, {});

  const filteredSeasons = (data?.seasons ?? []).filter((season) => season.season_number > 0);

  const gridData: ImageCell[] = filteredSeasons.map((season) => ({
    id: season.id,
    imageUrl: getImageUrl(season.poster_path ?? ""),
    primaryText: `Season ${season.season_number}`,
    secondaryText: season.air_date || "Date TBA",
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
        />
      )}
    </div>
  );
};
