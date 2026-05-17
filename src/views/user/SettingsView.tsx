import { useState } from "react";
import { Button } from "@/components";
import { movieGenres, tvGenres } from "@/core";
import { useUserContext } from "@/hooks";

export const SettingsView = () => {
  const { userName, setUserName, moviePreferences, setMoviePreferences, tvPreferences, setTvPreferences } = useUserContext();
  const [value, setValue] = useState(userName);
  const [msg, setMsg] = useState("");

  const toggle = (genre: number, preferences: number[], setPreferences: (g: number[]) => void) => {
    setPreferences(preferences.includes(genre) ? preferences.filter((g) => g !== genre) : [...preferences, genre]);
  };

  const save = () => {
    const trimmed = value.trim();
    if (!trimmed) return setMsg("Username cannot be empty");
    setUserName(trimmed);
    setMsg("Profile updated successfully");
  };

  return (
    <section className="mx-auto flex max-w-7xl items-start gap-8 p-5">
      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-900 p-4">
        <h2 className="font-semibold text-lg">Profile</h2>
        <p className="mb-2 text-gray-400 text-sm">Update your display profile</p>

        <label className="text-gray-300 text-sm">Username</label>
        <input
          className="mb-3 w-full rounded-lg border border-gray-700 bg-gray-800 px-2 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            setValue(e.target.value);
            setMsg("");
          }}
          placeholder="Enter your name"
          type="text"
          value={value}
        />

        <div className="flex items-center justify-end gap-2">
          {msg && <p className="text-green-400 text-xs">{msg}</p>}
          <div className="scale-90">
            <Button onClick={() => setValue(userName)} variant="grey">
              Reset
            </Button>
          </div>
          <div className="scale-90">
            <Button onClick={save}>Save</Button>
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-gray-700 bg-gray-900 p-6">
        <h2 className="font-semibold text-lg">Preferences</h2>
        <p className="text-gray-400 text-sm">Choose genres you like</p>

        <div className="mt-4">
          <h3 className="mb-2 font-semibold text-sm text-white">Movies</h3>
          <div className="grid grid-cols-3 gap-y-2">
            {movieGenres.map(({ value, label }) => (
              <label className="flex items-center gap-2 text-sm" key={value}>
                <input
                  checked={moviePreferences.length === 0 || moviePreferences.includes(value)}
                  onChange={() => toggle(value, moviePreferences, setMoviePreferences)}
                  type="checkbox"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 font-semibold text-sm text-white">TV</h3>
          <div className="grid grid-cols-3 gap-y-2">
            {tvGenres.map(({ value, label }) => (
              <label className="flex items-center gap-2 text-sm" key={value}>
                <input
                  checked={tvPreferences.length === 0 || tvPreferences.includes(value)}
                  onChange={() => toggle(value, tvPreferences, setTvPreferences)}
                  type="checkbox"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
