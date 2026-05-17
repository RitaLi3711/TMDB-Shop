import { Button } from '@/components';
import { useUserContext } from '@/hooks';
import { useState } from 'react';

export const SettingsView = () => {
  const { userName, setUserName } = useUserContext();
  const [value, setValue] = useState(userName);
  const [error, setError] = useState('');

  return (
    <section className="w-full max-w-7xl mx-auto space-y-5 p-5">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="text-sm text-gray-400">Update your display name</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Username</label>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);

              if (error) {
                setError('');
              }
            }}
            placeholder="Enter your name"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={() => setValue(userName)} variant="grey">
            Reset
          </Button>
          <Button
            onClick={() => {
              const trimmed = value.trim();

              if (!trimmed) {
                setError('Username cannot be empty');
                return;
              }

              setUserName(trimmed);
              setError('');
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </section>
  );
};
