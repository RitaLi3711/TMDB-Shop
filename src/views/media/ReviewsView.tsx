import { MOVIE_ENDPOINT, TV_ENDPOINT, type ReviewsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useLocation, useParams } from 'react-router-dom';

export const ReviewsView = () => {
  const { id } = useParams();
  const location = useLocation();
  const endpoint = location.pathname.includes('/movie/') ? MOVIE_ENDPOINT : TV_ENDPOINT;
  const { data } = useTmdb<ReviewsResponse>(`${endpoint}/${id}/reviews`, {}, [id, endpoint]);

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-2xl font-bold text-[#f0f4ef]">Reviews</h2>
      {!data || !data.results?.length ? (
        <p className="text-center text-gray-400">{!data ? 'Loading reviews...' : 'No reviews available.'}</p>
      ) : (
        <div className="space-y-4">
          {data.results.slice(0, 5).map((review) => (
            <div key={review.id} className="bg-[#344966] p-5 rounded-xl shadow border border-[#0d1821]">
              <p className="text-sm text-[#bfcc94] mb-2">By {review.author}</p>
              <p className="text-[#f0f4ef] text-sm leading-relaxed line-clamp-6">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};