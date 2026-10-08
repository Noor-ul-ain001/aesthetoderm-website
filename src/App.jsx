import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TransitionProvider } from './motion';
import { Layout } from './components/ui';
import Home from './pages/Home';
import About from './pages/About';
import Treatments from './pages/Treatments';
import TreatmentDetail from './pages/TreatmentDetail';
import Journey from './pages/Journey';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="treatments" element={<Treatments />} />
            <Route path="treatments/:slug" element={<TreatmentDetail />} />
            <Route path="journey" element={<Journey />} />
            <Route path="faq" element={<Faq />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TransitionProvider>
    </BrowserRouter>
  );
}
