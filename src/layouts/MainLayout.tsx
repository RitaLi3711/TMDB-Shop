import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#0d1821] text-[#f0f4ef]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};