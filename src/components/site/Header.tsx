import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonGroup, LinkGroup, SearchBar } from "@/components";
import type { SearchType } from "@/core";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState<string>("");
  const [type, setType] = useState<SearchType>("movie");

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
      </div>
    </header>
  );
};