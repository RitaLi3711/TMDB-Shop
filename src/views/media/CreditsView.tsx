import { ImageGrid } from '@/components';
import { IMAGE_BASE_URL, MOVIE_ENDPOINT, TV_ENDPOINT, type CreditsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const CreditsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isMovie = location.pathname.includes('/movie/');
  const { data } = useTmdb<CreditsResponse>(`${isMovie ? MOVIE_ENDPOINT : TV_ENDPOINT}/${id}/credits`, {}, [id, isMovie]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#f0f4ef]">Credits</h2>
      {!data || !data.cast.length ? (
        <p className="text-center text-gray-400">{!data ? 'Loading credits...' : 'No credits available.'}</p>
      ) : (
        <ImageGrid
          results={data.cast.map((person) => ({
            id: person.id,
            imageUrl: `${IMAGE_BASE_URL}${person.profile_path ?? ''}`,
            primaryText: person.name,
            secondaryText: person.character,
          }))}
          onClick={(personId) => navigate(`/person/${personId}`)}
        />
      )}
    </div>
  );
};