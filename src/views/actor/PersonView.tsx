import { Button, LinkGroup } from '@/components';
import { IMAGE_BASE_URL, PERSON_ENDPOINT, type PersonResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { FaBirthdayCake, FaLocationArrow } from 'react-icons/fa';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const PersonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: person } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {}, [id]);

  if (!person) return <p className="text-center text-gray-400 p-5">Loading...</p>;

  return (
    <div className="max-w-[1600px] mx-auto px-8 pt-16 pb-5">
      <div className="flex gap-8 mb-6">
        <img src={`${IMAGE_BASE_URL}${person.profile_path}`} alt={person.name} className="w-64 aspect-[2/3] object-cover rounded-lg" />

        <div className="flex-1">
          <div className="mb-6">
            <Button onClick={() => navigate(-1)}>← Back</Button>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{person.name}</h2>

          <div className="flex flex-col gap-3 text-sm text-gray-400 mb-6">
            {person.place_of_birth && (
              <div className="flex items-center gap-2">
                <FaLocationArrow />
                <span>{person.place_of_birth}</span>
              </div>
            )}
            {person.birthday && (
              <div className="flex items-center gap-2">
                <FaBirthdayCake />
                <span>{person.birthday}</span>
              </div>
            )}
          </div>
          <div className="mt-2">
            {person.biography ? (
              <p className="text-gray-300 leading-relaxed">{person.biography}</p>
            ) : (
              <p className="text-gray-400 italic">No biography available.</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <LinkGroup
          options={[
            { label: 'Career', to: 'career' },
            { label: 'Images', to: 'images' },
          ]}
        />
      </div>

      <Outlet />
    </div>
  );
};
