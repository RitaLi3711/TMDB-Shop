import { TV_ENDPOINT, IMAGE_BASE_URL, type TvDetailsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { ImageGrid } from '@/components';

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data } = useTmdb<TvDetailsResponse>(
    `${TV_ENDPOINT}/${id}`,
    {},
    [id]
  );

  if (!data) return <p className="text-gray-400">Loading seasons...</p>;

  return (
<div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Seasons</h2>
      
      <ImageGrid 
        results={(data.seasons || [])
          .filter(season => season.season_number > 0)
          .map((season) => ({
            id: season.id,
            imageUrl: `${IMAGE_BASE_URL}${season.poster_path ?? ''}`,
            primaryText: `Season ${season.season_number}`,
            secondaryText: season.air_date || 'Date TBA',
          }))}
        onClick={(seasonId) => {
          const season = (data.seasons || []).find(s => s.id === seasonId);
          if (season && season.season_number > 0) navigate(`/tv/${data.id}/season/${season.season_number}`);
        }}
      />
    </div>
  );
};