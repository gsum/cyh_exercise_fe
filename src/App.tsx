import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState, FC, useEffect } from 'react';
import Login from './routes/Login';
import Plans from './routes/Plans';
import Purchases from './routes/Purchases';
import Dashboard from './routes/Dashboard';

export const AuthContext = createContext<{ token: string | null; setToken: (token: string | null) => void }>({ token: null, setToken: () => {} });

const App: FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const value = { token, setToken };
  
  useEffect(() => {
    if(!token){
      const localToken = localStorage.getItem("token");
      setToken(localToken)
    }else{
      localStorage.setItem("token", token);
    }
  }, [token])
  return (
    <AuthContext.Provider value={value}>
     
      <div className="card">
        <Router>
          <Routes>
            {
            token ?
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/purchases" element={<Purchases />} />
              </>
              : 
              <Route path="/" element={<Login />} />
            }
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
