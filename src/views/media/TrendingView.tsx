import { ButtonGroup, ImageGrid } from '@/components';
import { IMAGE_BASE_URL, TRENDING_ENDPOINT, type TrendingResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const TrendingView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [type, setType] = useState<'movies' | 'tv'>('movies');
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>((searchParams.get('interval') as 'day' | 'week') || 'day');

  useEffect(() => {
    navigate(`/trending/${type}?interval=${timeWindow}`, { replace: true });
  }, [timeWindow, type, navigate]);

  const { data } = useTmdb<TrendingResponse>(`${TRENDING_ENDPOINT}/${type === 'movies' ? 'movie' : type}/${timeWindow}`, {}, [
    type,
    timeWindow,
  ]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading trending...</p>;
  }

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      <div className="flex justify-between items-center">
        <ButtonGroup
          value={type}
          onClick={(value) => setType(value as 'movies' | 'tv')}
          options={[
            { label: 'Movies', value: 'movies' },
            { label: 'TV', value: 'tv' },
          ]}
        />

        <ButtonGroup
          value={timeWindow}
          onClick={(value) => setTimeWindow(value as 'day' | 'week')}
          options={[
            { label: 'Today', value: 'day' },
            { label: 'Week', value: 'week' },
          ]}
        />
      </div>

      <ImageGrid
        results={data.results.slice(0, 20).map((item) => ({
          id: item.id,
          imageUrl: `${IMAGE_BASE_URL}${item.poster_path ?? ''}`,
          primaryText: item.title || item.name || '',
        }))}
        onClick={(id) => {
          const item = data.results.find((result) => result.id === id);
          navigate(item?.media_type === 'movie' ? `/movie/${id}` : `/tv/${id}`);
        }}
      />
    </section>
  );
};