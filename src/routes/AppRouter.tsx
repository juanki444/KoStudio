import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import PropertyDetail from '../pages/PropertyDetail';
import Contact from '../pages/Contact';
import Layout from '../components/layout/Layout';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="propiedades" element={<Catalog />} />
          <Route path="propiedades/:id" element={<PropertyDetail />} />
          <Route path="contacto" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
