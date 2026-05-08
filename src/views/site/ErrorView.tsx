import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';

export const ErrorView = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#0d1821] text-[#f0f4ef] flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold text-[#e6aace]">404</h1>
      <p className="text-[#bfcc94]">Page not found</p>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </main>
  );
};