import { createContext } from "react";
import type { ImageCell } from "@/core";

export type UserContextType = {
  userName: string;
  favorites: Map<number, ImageCell>;

  moviePreferences: number[];
  tvPreferences: number[];

  setUserName: (userName: string) => void;

  setMoviePreferences: (genres: number[]) => void;
  setTvPreferences: (genres: number[]) => void;

  toggleFavorite: (item: ImageCell) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
