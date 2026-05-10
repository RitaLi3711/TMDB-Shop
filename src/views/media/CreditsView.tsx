import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { type CreditsResponse, IMAGE_BASE_URL, MOVIE_ENDPOINT, TV_ENDPOINT } from "@/core";
import { useTmdb } from "@/hooks";

export const CreditsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isMovie = location.pathname.includes("/movie/");
  const { data } = useTmdb<CreditsResponse>(`${isMovie ? MOVIE_ENDPOINT : TV_ENDPOINT}/${id}/credits`, {}, [id, isMovie]);

  return (
    <div className="p-6">
      <h2 className="mb-6 font-bold text-2xl text-[#f0f4ef]">Credits</h2>
      {!data?.cast.length ? (
        <p className="text-center text-gray-400">{!data ? "Loading credits..." : "No credits available."}</p>
      ) : (
        <ImageGrid
          onClick={(personId) => navigate(`/person/${personId}`)}
          results={data.cast.map((person) => ({
            id: person.id,
            imageUrl: `${IMAGE_BASE_URL}${person.profile_path ?? ""}`,
            primaryText: person.name,
            secondaryText: person.character,
          }))}
        />
      )}
    </div>
  );
};
