import { useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { IMAGE_BASE_URL, PERSON_ENDPOINT, type PersonImagesResponse } from "@/core";
import { useTmdb } from "@/hooks";

export const ImagesView = () => {
  const { id } = useParams();
  const { data } = useTmdb<PersonImagesResponse>(`${PERSON_ENDPOINT}/${id}/images`, {}, [id]);

  if (!data) {
    return <p className="mt-6 text-center text-gray-400">Loading images...</p>;
  }

  if (!data.profiles?.length) return <p className="mt-6 text-center text-gray-400">No images available.</p>;

  return (
    <div className="space-y-6 p-6 pt-8">
      <h2 className="font-bold text-2xl text-[#f0f4ef]">Images</h2>

      <ImageGrid
        results={data.profiles.map((img, id) => ({
          id: id,
          imageUrl: `${IMAGE_BASE_URL}${img.file_path}`,
          primaryText: "",
        }))}
      />
    </div>
  );
};
