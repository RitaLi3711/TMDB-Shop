import { FaBirthdayCake, FaLocationArrow } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button, LinkGroup } from "@/components";
import { getImageUrl, PERSON_ENDPOINT, type PersonResponse } from "@/core";
import { useTmdb } from "@/hooks";

export const PersonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: person } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id ?? ""}`, {});
  const imageUrl = getImageUrl(person?.profile_path ?? "");

  return (
    <div className="mx-auto max-w-400 px-8 pt-16 pb-5">
      {!person ? (
        <p className="p-5 text-center text-gray-400">Loading...</p>
      ) : (
        <>
          <div className="mb-6 flex gap-8">
            <img alt={person.name} className="aspect-2/3 w-64 rounded-lg object-cover" src={imageUrl} />

            <div className="flex-1">
              <div className="mb-6">
                <Button onClick={() => navigate(-1)}>← Back</Button>
              </div>
              <h2 className="mb-2 font-bold text-3xl text-white">{person.name}</h2>

              <div className="mb-6 flex flex-col gap-3 text-gray-400 text-sm">
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

          <div className="mt-6 flex justify-center">
            <LinkGroup
              options={[
                { label: "Career", to: "career" },
                { label: "Images", to: "images" },
              ]}
            />
          </div>

          <Outlet />
        </>
      )}
    </div>
  );
};
