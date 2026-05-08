import { ImageGrid, Pagination } from '@/components';
import { IMAGE_BASE_URL, SEARCH_ENDPOINT, type SearchResponse } from '@/core';
import { useDebounce, useTmdb } from '@/hooks';
import { useState } from 'react';
import { FaFrown } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const type = searchParams.get('type') ?? 'movie';
  const [page, setPage] = useState(1);
  const debounced = useDebounce(query, 500);
  const { data } = useTmdb<SearchResponse>(`${SEARCH_ENDPOINT}/${type}`, { query: debounced, page }, [debounced, page, type]);

  if (!data) return <p className="text-center text-[#f0f4ef]">Loading...</p>;

  return (
    <section className="max-w-[1600px] mx-auto p-5 space-y-5">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-white">Search for:</h1>
        <span className="text-2xl text-gray-400">{query || ''}</span>
      </div>

      {data.results.length ? (
        <>
          <ImageGrid
            results={data.results.map((item) => ({
              id: item.id,
              imageUrl: `${IMAGE_BASE_URL}${item.poster_path ?? item.profile_path}`,
              primaryText: item.name ?? item.title ?? 'Untitled',
            }))}
            onClick={(id) => navigate(`/${type}/${id}`)}
          />
          <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
        </>
      ) : (
        <div className="text-center py-12">
          <FaFrown className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">No search results found</p>
        </div>
      )}
    </section>
  );
};