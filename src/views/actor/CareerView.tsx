import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { IMAGE_BASE_URL, PERSON_ENDPOINT, type PersonCareerResponse } from "@/core";
import { useTmdb } from "@/hooks";

export const CareerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<PersonCareerResponse>(`${PERSON_ENDPOINT}/${id}/movie_credits`, {}, [id]);

  if (!data?.cast) return <p className="mt-6 text-center text-gray-400">Loading...</p>;

  return (
    <div className="space-y-6 p-6 pt-8">
      <h2 className="font-bold text-2xl text-[#f0f4ef]">Career</h2>

      <ImageGrid
        onClick={(id) => navigate(`/movie/${id}`)}
        results={data.cast.map((item) => ({
          id: item.id,
          imageUrl: `${IMAGE_BASE_URL}${item.poster_path ?? ""}`,
          primaryText: item.title || item.name || "",
          secondaryText: item.character,
        }))}
      />
    </div>
  );
};
