import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Layout } from './Components/Layout';
import { IndexPage } from './Pages/IndexPage';
import { Register } from './Pages/Register';
import { USerContextProvider } from './Pages/UserContext';
import { CreatePost } from './Pages/CreatePost';

function App() {
  return (
    <USerContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/create'} element={<CreatePost />} />
        </Route>
      </Routes>
    </USerContextProvider>
  );
}

export default App;
