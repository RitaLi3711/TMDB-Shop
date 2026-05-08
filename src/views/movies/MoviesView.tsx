import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, type MoviesResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const MoviesView = () => {
  const { interval } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const category = interval ?? 'now_playing';
  const { data } = useTmdb<MoviesResponse>(`${MOVIE_ENDPOINT}/${category}`, { page }, [category, page]);

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      <ButtonGroup
        value={category}
        onClick={(value) => {
          setPage(1);
          navigate(`/movies/category/${value}`);
        }}
        options={[
          { label: 'Now Playing', value: 'now_playing' },
          { label: 'Popular', value: 'popular' },
          { label: 'Top Rated', value: 'top_rated' },
          { label: 'Upcoming', value: 'upcoming' },
        ]}
      />
      <ImageGrid
        results={data.results.map((result) => ({
          id: result.id,
          imageUrl: `${IMAGE_BASE_URL}${result.poster_path ?? ''}`,
          primaryText: result.original_title || '',
        }))}
        onClick={(id) => navigate(`/movie/${id}`)}
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};