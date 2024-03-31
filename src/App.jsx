

import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

function App() {
 
  return (
    <>
 <Router>
 <Routes>
  {/* Route for the dynamic component */}
        <Route path="/about/:id" element={<About/>} />
        <Route path="/" exact element={<Home/>} />
 </Routes>
 
    </Router>

    </>
  )
}

export default App
