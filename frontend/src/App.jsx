import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Layout } from './Components/Layout';
import { IndexPage } from './Pages/IndexPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={'/login'} element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
