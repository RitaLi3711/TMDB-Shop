import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { IMAGE_BASE_URL, TV_ENDPOINT, type TvDetailsResponse } from "@/core";
import { useTmdb } from "@/hooks";

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useTmdb<TvDetailsResponse>(`${TV_ENDPOINT}/${id}`, {}, [id]);

  if (!data) return <p className="text-gray-400">Loading seasons...</p>;

  return (
    <div className="space-y-6 p-6">
      <h2 className="font-bold text-2xl">Seasons</h2>

      <ImageGrid
        onClick={(seasonId) => {
          const season = (data.seasons || []).find((s) => s.id === seasonId);
          if (season && season.season_number > 0) navigate(`/tv/${data.id}/season/${season.season_number}`);
        }}
        results={(data.seasons || [])
          .filter((season) => season.season_number > 0)
          .map((season) => ({
            id: season.id,
            imageUrl: `${IMAGE_BASE_URL}${season.poster_path ?? ""}`,
            primaryText: `Season ${season.season_number}`,
            secondaryText: season.air_date || "Date TBA",
          }))}
      />
    </div>
  );
};
