import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Hero from "../components/common/Hero";
import Footer from "../components/common/Footer";
import { Suspense } from "react";
import SearchBar from "../components/search/SearchBar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <SearchBar />
      </div>
      <div className="container mx-auto py-10 flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
