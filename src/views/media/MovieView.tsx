import { LinkGroup, Modal } from '@/components';
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, ORIGINAL_IMAGE_BASE_URL, TV_ENDPOINT, type MovieResponse, type TvDetailsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { FaCalendarAlt } from 'react-icons/fa';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

export const MovieView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const isMovie = location.pathname.includes('/movie/');
  const { data } = useTmdb<MovieResponse | TvDetailsResponse>(
    `${isMovie ? MOVIE_ENDPOINT : TV_ENDPOINT}/${id}`,
    { append_to_response: 'videos' },
    [id, isMovie]
  );

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  const title = isMovie ? (data as MovieResponse).title : (data as TvDetailsResponse).name;
  const date = isMovie ? (data as MovieResponse).release_date : (data as TvDetailsResponse).first_air_date;

  return (
    <Modal onClose={() => navigate(-1)}>
      <div className="p-6 space-y-6">
        <div
          className="h-[420px] bg-cover bg-center rounded-2xl"
          style={{ backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})` }}
        />
        <div className="flex gap-8">
          <img className="w-[220px] h-[330px] object-cover rounded-xl" src={`${IMAGE_BASE_URL}${data.poster_path}`} alt={title} />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="text-gray-400">
              <p className="flex items-center gap-2">
                <FaCalendarAlt />
                {date || 'Date TBA'}
              </p>
              {!isMovie && (
                <p className="mt-1">
                  {(data as TvDetailsResponse).seasons?.filter((season) => season.season_number > 0).length}{' '}
                  Seasons&nbsp;&nbsp;-&nbsp;&nbsp;
                  {(data as TvDetailsResponse).seasons?.reduce(
                    (total, season) => (season.season_number > 0 ? total + season.episode_count : total),
                    0
                  )}{' '}
                  Episodes
                </p>
              )}
            </div>
            <p className="text-gray-300">{data.overview}</p>
            <LinkGroup
              options={
                isMovie
                  ? [
                      { label: 'Credits', to: 'credits' },
                      { label: 'Trailers', to: 'trailers' },
                      { label: 'Reviews', to: 'reviews' },
                    ]
                  : [
                      { label: 'Seasons', to: 'seasons', match: ['/tv/:id/seasons', '/tv/:id/season/:seasonNumber'] },
                      { label: 'Credits', to: 'credits' },
                      { label: 'Trailers', to: 'trailers' },
                      { label: 'Reviews', to: 'reviews' },
                    ]
              }
            />
          </div>
        </div>
        <Outlet />
      </div>
    </Modal>
  );
};