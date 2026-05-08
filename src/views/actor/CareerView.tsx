import { ImageGrid } from '@/components';
import { IMAGE_BASE_URL, PERSON_ENDPOINT, type PersonCareerResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const CareerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<PersonCareerResponse>(`${PERSON_ENDPOINT}/${id}/movie_credits`, {}, [id]);

  if (!data?.cast) return <p className="text-gray-400 mt-6 text-center">Loading...</p>;

  return (
    <div className="p-6 pt-8 space-y-6">
      <h2 className="text-2xl font-bold text-[#f0f4ef]">Career</h2>

      <ImageGrid
        results={data.cast.map((item) => ({
          id: item.id,
          imageUrl: `${IMAGE_BASE_URL}${item.poster_path ?? ''}`,
          primaryText: item.title || item.name || '',
          secondaryText: item.character,
        }))}
        onClick={(id) => navigate(`/movie/${id}`)}
      />
    </div>
  );
};