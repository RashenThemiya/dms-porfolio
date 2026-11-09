import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import ScrollToTop from '../components/layout/ScrollToTop.jsx';
import ScrollReveal from '../components/ui/ScrollReveal.jsx';

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-dms-bg text-dms-text">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </div>
  );
}
