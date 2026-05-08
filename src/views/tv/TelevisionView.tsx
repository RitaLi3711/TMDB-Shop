import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { IMAGE_BASE_URL, TV_ENDPOINT, type TelevisionResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const TelevisionView = () => {
  const { interval } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const category = interval ?? 'airing_today';

  const { data } = useTmdb<TelevisionResponse>(`${TV_ENDPOINT}/${category}`, { page }, [category, page]);

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      <ButtonGroup
        value={category}
        onClick={(value) => {
          setPage(1);
          navigate(`/tv/category/${value}`);
        }}
        options={[
          { label: 'Airing Today', value: 'airing_today' },
          { label: 'On The Air', value: 'on_the_air' },
          { label: 'Popular', value: 'popular' },
          { label: 'Top Rated', value: 'top_rated' },
        ]}
      />
      <ImageGrid
        results={data.results.map((result) => ({
          id: result.id,
          imageUrl: `${IMAGE_BASE_URL}${result.poster_path ?? ''}`,
          primaryText: result.name || result.original_name || '',
        }))}
        onClick={(id) => navigate(`/tv/${id}`)}
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};