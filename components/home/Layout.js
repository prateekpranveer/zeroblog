import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import StickyMenu from "./StickyMenu";
import Footer from "./Footer";

export default function Layout({ tags, categories, recentPosts, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <Navbar onSearchClick={openSidebar} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        tags={tags}
        categories={categories}
        recentPosts={recentPosts}
      />
      <StickyMenu categories={categories} />

      {/* ✅ ✅ ✅ IMPORTANT: This is where your page content renders */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {children}
      </main>
      <Footer categories={categories} tags={tags}/>
    </>
  );
}
