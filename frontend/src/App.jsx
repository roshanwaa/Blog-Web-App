import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Layout } from './Components/Layout';
import { IndexPage } from './Pages/IndexPage';
import { Register } from './Pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
