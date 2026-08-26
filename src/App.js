import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './Views/Home';
import About from './Views/About';
import Contact from './Views/Contact';

function App() {
  return (
  <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/con">Contact</Link>
      </nav>

      {/* Routes */}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/con" element={<Contact />} /> 
      </Routes>
  </BrowserRouter>
  );
}

export default App;


