import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Settings } from './pages/Setings';
import { HowltWorks } from './pages/HowItWorks';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Admin } from './pages/Admin';
import { AdminRoute } from './components/AdminRoute';
import { HelpModels } from './pages/HelpModels';
import { Registro } from './pages/Registro';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute/>}>
        <Route path="/home" element={<Home />} />
        <Route path="/config" element={<Settings />} />
        <Route path="/Como-funciona" element={<HowltWorks/>} />
        <Route path="/helpmodel" element={<HelpModels/>} />
        </Route>
        <Route element={<AdminRoute />}>
        <Route path="/admin" element={<Admin />} />

        </Route>
        <Route path='/registro' element={<Registro/>}></Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;