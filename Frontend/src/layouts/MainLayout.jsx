import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

/**
 * MainLayout — shell for authenticated pages: sticky Navbar, page content, Footer.
 */
export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      <Navbar />
      <main className="flex-1 animate-page py-8">{children}</main>
      <Footer />
    </div>
  );
}
