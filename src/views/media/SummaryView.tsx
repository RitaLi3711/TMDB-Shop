import { useLocation, useParams } from "react-router-dom";
import { MOVIE_ENDPOINT, type MovieResponse, TV_ENDPOINT, type TvDetailsResponse } from "@/core";
import { useTmdb } from "@/hooks";

export const SummaryView = () => {
  const { id } = useParams();
  const location = useLocation();

  const isMovie = location.pathname.includes("/movie/");

  const { data } = useTmdb<MovieResponse | TvDetailsResponse>(`${isMovie ? MOVIE_ENDPOINT : TV_ENDPOINT}/${id ?? ""}`, {});

  if (!data) {
    return (
      <div className="space-y-3">
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded-lg bg-zinc-900" />
          <div className="h-4 w-5/6 animate-pulse rounded-lg bg-zinc-900" />
        </div>

        <div className="space-y-2 border-gray-700 border-t pt-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 animate-pulse rounded-2xl bg-zinc-900" />
            <div className="h-20 animate-pulse rounded-2xl bg-zinc-900" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 animate-pulse rounded-2xl bg-zinc-900" />
            <div className="h-20 animate-pulse rounded-2xl bg-zinc-900" />
          </div>
        </div>
      </div>
    );
  }

  const date = isMovie ? (data as MovieResponse).release_date : (data as TvDetailsResponse).first_air_date;

  const genres = data.genres || [];

  const runtime = isMovie
    ? (() => {
        const totalMinutes = (data as MovieResponse).runtime;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes}m`;
      })()
    : "";

  const status = !isMovie ? (data as TvDetailsResponse).status : "";
  const rating = `${Math.round(data.vote_average * 10)}%`;

  return (
    <div className="space-y-3">
      <p className="max-w-4xl text-gray-300 text-sm leading-7 md:text-base">{data.overview}</p>

      <div className="space-y-2 border-gray-700 border-t pt-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#2a3b52] p-4">
            <p className="text-[#bfcc94] text-xs uppercase tracking-wider">Release</p>

            <p className="mt-1 font-medium text-lg text-white">{date || "TBA"}</p>
          </div>

          {isMovie ? (
            <div className="rounded-2xl bg-[#2a3b52] p-4">
              <p className="text-[#bfcc94] text-xs uppercase tracking-wider">Runtime</p>

              <p className="mt-1 font-medium text-lg text-white">{runtime || "TBA"}</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-[#2a3b52] p-4">
              <p className="text-[#bfcc94] text-xs uppercase tracking-wider">Status</p>

              <p className="mt-1 font-medium text-lg text-white">{status || "TBA"}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#2a3b52] p-4">
            <p className="text-[#bfcc94] text-xs uppercase tracking-wider">Genres</p>

            <p className="mt-1 text-sm text-white leading-6">{genres.map((genre) => genre.name).join(", ")}</p>
          </div>

          <div className="rounded-2xl bg-[#2a3b52] p-4">
            <p className="text-[#bfcc94] text-xs uppercase tracking-wider">Rating</p>

            <p className="mt-1 font-semibold text-white text-xl">{rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
