import { FaCalendarAlt } from "react-icons/fa";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { LinkGroup, Modal } from "@/components";
import { getImageUrl, MOVIE_ENDPOINT, type MovieResponse, ORIGINAL_IMAGE_BASE_URL, TV_ENDPOINT, type TvDetailsResponse } from "@/core";
import { useTmdb } from "@/hooks";

export const MovieView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const isMovie = location.pathname.includes("/movie/");
  const { data } = useTmdb<MovieResponse | TvDetailsResponse>(`${isMovie ? MOVIE_ENDPOINT : TV_ENDPOINT}/${id ?? ""}`, {
    append_to_response: "videos",
  });

  const title = data ? (isMovie ? (data as MovieResponse).title : (data as TvDetailsResponse).name) : "";
  const date = data ? (isMovie ? (data as MovieResponse).release_date : (data as TvDetailsResponse).first_air_date) : "";
  const backdropUrl = data?.backdrop_path ? `${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path}` : "";
  const posterUrl = getImageUrl(data?.poster_path ?? "");

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="space-y-6 p-6">
        {!data ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <>
            <div className="h-105 rounded-2xl bg-center bg-cover" style={{ backgroundImage: `url(${backdropUrl})` }} />
            <div className="flex gap-8">
              <img alt={title} className="h-82.5 w-55 rounded-xl object-cover" src={posterUrl} />
              <div className="flex-1 space-y-4">
                <h1 className="font-bold text-3xl">{title}</h1>
                <div className="text-gray-400">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt />
                    {date || "Date TBA"}
                  </p>
                  {!isMovie && (
                    <p className="mt-1">
                      {(data as TvDetailsResponse).seasons?.filter((season) => season.season_number > 0).length}{" "}
                      Seasons&nbsp;&nbsp;-&nbsp;&nbsp;
                      {(data as TvDetailsResponse).seasons?.reduce(
                        (total, season) => (season.season_number > 0 ? total + season.episode_count : total),
                        0,
                      )}{" "}
                      Episodes
                    </p>
                  )}
                </div>
                <p className="text-gray-300">{data.overview}</p>
                <LinkGroup
                  options={
                    isMovie
                      ? [
                          { label: "Credits", to: "credits" },
                          { label: "Trailers", to: "trailers" },
                          { label: "Reviews", to: "reviews" },
                        ]
                      : [
                          { label: "Seasons", match: "/tv/:id/seasons", to: "seasons" },
                          { label: "Credits", to: "credits" },
                          { label: "Trailers", to: "trailers" },
                          { label: "Reviews", to: "reviews" },
                        ]
                  }
                />
              </div>
            </div>
            <Outlet />
          </>
        )}
      </div>
    </Modal>
  );
};
