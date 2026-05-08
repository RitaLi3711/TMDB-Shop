import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#0d1821] text-[#f0f4ef] flex items-center justify-center">
      <section className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight text-[#e6aace]">TMDB Explorer</h1>
        <p className="text-[#bfcc94] text-lg">Explore movies and discover people using a fast, modern interface.</p>
        <Button onClick={() => navigate('/movies')}>Enter</Button>
      </section>
    </main>
  );
};