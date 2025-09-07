import { AppHeader } from "./cmps/AppHeader.jsx";
import { Home } from "./pages/Home.jsx";
import {AboutUs} from "./pages/AboutUs.jsx";
import {BookDetails} from "./pages/BookDetails.jsx";
import {BookIndex} from "./pages/BookIndex.jsx";
import {NotFound} from "./cmps/NotFound.jsx";
import {UserMsg} from "./cmps/UserMsg.jsx";
import { BookEdit } from "./pages/BookEdit.jsx";
import { BookAdd } from "./pages/BookAdd.jsx";


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
            <Route path="/book/add" element={<BookAdd />} />
            <Route path="/book/edit" element={<BookEdit />} />
            <Route path="/book/edit/:bookId" element={<BookEdit />} />
            <Route path="/book/:bookId" element={<BookDetails />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </main>
        <UserMsg />
      </section>
    </Router>
  );
}
