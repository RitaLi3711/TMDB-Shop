import { Button, ButtonGroup, ImageGrid, Pagination } from '@/components';
import { GENRE_ENDPOINT, IMAGE_BASE_URL, movieGenres, tvGenres, type GenreResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const GenreView = () => {
  const navigate = useNavigate();
  const { type: urlType = 'movies', genreSlug = 'action' } = useParams();
  const [type, setType] = useState<'movies' | 'tv'>(urlType as 'movies' | 'tv');
  const [page, setPage] = useState(1);

  const genres = type === 'movies' ? movieGenres : tvGenres;
  const selectedGenre = genres.find((g) => g.slug === genreSlug)?.value ?? genres[0].value;

  const { data } = useTmdb<GenreResponse>(`${GENRE_ENDPOINT}/${type === 'movies' ? 'movie' : 'tv'}`, { with_genres: selectedGenre, page }, [
    type,
    selectedGenre,
    page,
  ]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading genres...</p>;
  }

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      <ButtonGroup
        value={type}
        onClick={(value) => {
          const newType = value as 'movies' | 'tv';
          const newGenres = newType === 'movies' ? movieGenres : tvGenres;
          setType(newType);
          setPage(1);
          navigate(`/genre/${newType}/${newGenres[0].slug}`);
        }}
        options={[
          { label: 'Movies', value: 'movies' },
          { label: 'TV', value: 'tv' },
        ]}
      />

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Button
            key={genre.value}
            variant={selectedGenre === genre.value ? 'primary' : 'grey'}
            onClick={() => {
              navigate(`/genre/${type}/${genre.slug}`);
              setPage(1);
            }}
          >
            {genre.label}
          </Button>
        ))}
      </div>

      <ImageGrid
        results={(data.results || []).map((item) => ({
          id: item.id,
          imageUrl: `${IMAGE_BASE_URL}${item.poster_path ?? ''}`,
          primaryText: item.title || item.name || '',
        }))}
        onClick={(id) => navigate(`/${type === 'movies' ? 'movie' : 'tv'}/${id}`)}
      />

      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};