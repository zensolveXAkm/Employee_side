// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './components/user';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
// import Profile from './components/Profile';
import ProfileReg from './components/ProfileReg';
import About from './components/About';
import Services from './components/Services';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/admin' element={<AdminPanel/>} />
          <Route path='/profile' element={<ProfileReg/>}/>
          <Route path='/about' element={<About/>} />
          <Route path='/services' element={<Services/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

function PrivateRoute({ children }) {
  const { current } = useUser();
  return current ? children : <Navigate to="/" />;
}

export default App;
