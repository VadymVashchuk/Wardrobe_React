import { Routes, Route, Link } from 'react-router-dom'

import Home from './pages/home';
import Wardrobe from './pages/wardrobe';


function App() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/wardrobe">Wardrobe</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
      </Routes>
    </>
  );
}

export default App;
