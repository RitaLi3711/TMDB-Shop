import { Button, ImageGrid } from '@/components';
import { IMAGE_BASE_URL, TV_ENDPOINT, type SeasonData } from '@/core';
import { useTmdb } from '@/hooks';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

export const EpisodeView = () => {
  const { id, seasonNumber } = useParams();
  const navigate = useNavigate();

  const { data } = useTmdb<SeasonData>(`${TV_ENDPOINT}/${id}/season/${seasonNumber}`, {}, [id, seasonNumber]);

  if (!data) return <p className="text-gray-400">Loading episodes...</p>;

  return (
    <div className="p-6">
      <div className="mb-5">
        <Button onClick={() => navigate(-1)} variant="primary">
          <FaArrowLeft className="inline mr-2" />
          Back
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Season {seasonNumber}</h1>
        <div className="flex items-center gap-2 text-gray-400">
          <FaCalendarAlt />
          <span>{data.air_date || 'Date TBA'}</span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-400">{data.overview || ''}</p>
        <h2 className="text-2xl font-bold mt-8">Episodes</h2>
      </div>

      <ImageGrid
        results={(data.episodes || []).map((episode) => ({
          id: episode.id,
          imageUrl: `${IMAGE_BASE_URL}${episode.still_path ?? ''}`,
          primaryText: `Episode ${episode.episode_number}: ${episode.name}`,
          secondaryText: episode.air_date,
        }))}
      />
    </div>
  );
};
