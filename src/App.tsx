import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts";
import { HomeView } from "@/views";

export const App = () => {
  return (
    <Routes>
      <Route element={<HomeView />} path="/" />
      <Route element={<MainLayout />}></Route>
    </Routes>
  );
};
