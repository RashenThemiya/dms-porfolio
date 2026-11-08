import { Route, Routes } from 'react-router-dom';
import SiteLayout from '../layouts/SiteLayout.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Features from '../pages/Features.jsx';
import Home from '../pages/Home.jsx';
import Pricing from '../pages/Pricing.jsx';
import Solutions from '../pages/Solutions.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
