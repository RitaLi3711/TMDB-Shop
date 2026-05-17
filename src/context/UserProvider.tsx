import type { ReactNode } from "react";
import { UserContext } from "@/context";
import { FAVORITES_KEY, type ImageCell, movieGenres, tvGenres, USERNAME_KEY } from "@/core";
import { useLocalStorage } from "@/hooks";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string>(USERNAME_KEY, "User");

  const [favoritesStorage, setFavoritesStorage] = useLocalStorage<[number, ImageCell][]>(FAVORITES_KEY, []);

  const [moviePreferences, setMoviePreferences] = useLocalStorage<number[]>(
    "moviePreferences2",
    movieGenres.map((genre) => genre.value),
  );

  const [tvPreferences, setTvPreferences] = useLocalStorage<number[]>(
    "tvPreferences2",
    tvGenres.map((genre) => genre.value),
  );

  const favorites = new Map(favoritesStorage);

  const toggleFavorite = (item: ImageCell) => {
    const map = new Map(favorites);

    if (map.has(item.id)) {
      map.delete(item.id);
    } else {
      map.set(item.id, item);
    }

    setFavoritesStorage(Array.from(map.entries()));
  };

  return (
    <UserContext.Provider
      value={{
        favorites,
        moviePreferences,
        setMoviePreferences,
        setTvPreferences,
        setUserName,
        toggleFavorite,
        tvPreferences,
        userName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
