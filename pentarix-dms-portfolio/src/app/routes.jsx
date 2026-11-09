import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from '../layouts/SiteLayout.jsx';
import Home from '../pages/Home.jsx';

const legacyRoutes = {
  features: '/#features',
  solutions: '/#why',
  pricing: '/#pricing',
  about: '/#customers',
  contact: '/',
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        {Object.entries(legacyRoutes).map(([path, to]) => (
          <Route key={path} path={path} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
