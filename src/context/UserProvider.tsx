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
  const [cartStorage, setCartStorage] = useLocalStorage<[number, ImageCell][]>("cart", []);
  const [moviePreferences, setMoviePreferences] = useLocalStorage<number[]>(
    "moviePreferences2",
    movieGenres.map((genre) => genre.value),
  );
  const [tvPreferences, setTvPreferences] = useLocalStorage<number[]>(
    "tvPreferences2",
    tvGenres.map((genre) => genre.value),
  );

  const favorites = new Map(favoritesStorage);
  const cart = new Map(cartStorage);

  const toggleFavorite = (item: ImageCell) => {
    const map = new Map(favorites);
    if (map.has(item.id)) {
      map.delete(item.id);
    } else {
      map.set(item.id, item);
    }
    setFavoritesStorage(Array.from(map.entries()));
  };

  const addToCart = (item: ImageCell) => {
    const map = new Map(cart);
    map.set(item.id, item);
    setCartStorage(Array.from(map.entries()));
  };

  const removeFromCart = (id: number) => {
    const map = new Map(cart);
    map.delete(id);
    setCartStorage(Array.from(map.entries()));
  };

  const clearCart = () => {
    setCartStorage([]);
  };

  return (
    <UserContext.Provider
      value={{
        addToCart,
        cart,
        clearCart,
        favorites,
        moviePreferences,
        removeFromCart,
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
