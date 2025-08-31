import { AppHeader } from "./cmps/AppHeader.jsx";
import { Home } from "./pages/Home.jsx";
import {AboutUs} from "./pages/AboutUs.jsx";
import {BookDetails} from "./pages/BookDetails.jsx";
import {BookIndex} from "./pages/BookIndex.jsx";
import {NotFound} from "./cmps/NotFound.jsx";


const Router = ReactRouterDOM.HashRouter;
const { Routes, Route, Navigate } = ReactRouterDOM;

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />

        <main className="main-layout">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/book" element={<BookIndex />} />
            <Route path="/book/:bookId" element={<BookDetails />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </main>
      </section>
    </Router>
  );
}
