import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import LoginReg from './pages/auth/LoginReg';

function App() {
  const { access_token } = useSelector(state => state.auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={!access_token ? <LoginReg /> : <Navigate to="/" />} />
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
