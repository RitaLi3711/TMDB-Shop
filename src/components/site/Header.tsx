import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonGroup, LinkGroup, SearchBar } from "@/components";
import type { SearchType } from "@/core";
import { ICON_SIZE } from "@/core";
import { useUserContext } from "@/hooks";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState<string>("");
  const [type, setType] = useState<SearchType>("movie");
  const { userName, favorites } = useUserContext();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-[#344966] border-b bg-[#0d1821]">
      <div className="flex items-center justify-between gap-20 px-4 py-4">
        <div className="flex items-center gap-4">
          <h1 className="cursor-pointer font-bold text-4xl text-[#f0f4ef]" onClick={() => navigate("/")}>
            TMDB Explorer
          </h1>
          <LinkGroup
            options={[
              { label: "Movies", match: ["/movies"], to: "/movies/category/now_playing" },
              { label: "TV", match: ["/tv"], to: "/tv/category/airing_today" },
              { label: "Trending", match: ["/trending"], to: "/trending/movies" },
              { label: "Genre", match: ["/genre"], to: "/genre/movies/action" },
            ]}
          />
        </div>

        <div className="flex items-center gap-4">
          <SearchBar
            onChange={(query) => {
              setQuery(query);
              navigate(`/search?q=${query}&type=${type}`);
            }}
            value={query}
          />
          <ButtonGroup
            onClick={(value: string) => {
              setType(value as SearchType);
              navigate(`/search?q=${query}&type=${value}`);
            }}
            options={[
              { label: "Movie", value: "movie" },
              { label: "TV", value: "tv" },
              { label: "Person", value: "person" },
            ]}
            value={type}
          />
        </div>

        <div className="flex items-center">
          <h1 className="mr-4 text-gray-300 text-xl">{userName}</h1>
          <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/favorites")}>
            <FaRegHeart size={ICON_SIZE} />
            {favorites.size > 0 && (
              <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                {favorites.size}
              </span>
            )}
          </button>
          <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/settings")}>
            <GoGear size={ICON_SIZE} />
          </button>
        </div>
      </div>
    </header>
  );
};
