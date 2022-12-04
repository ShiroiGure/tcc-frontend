import { useCallback } from "react";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from '../api/api';

const AuthContext = createContext();

function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdm, setIsAdm] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const login = useCallback(async (user) => {

    try {
      let response = (await api.post('/login', {
        email: user.email,
        password: user.password
      })).data;

      response.role ? setIsAdm(true) : setIsAdm(false);

      localStorage.setItem("token", response.token);
      setEmail(response.email);
      setIsAuthenticated(true);
      api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;

      return true;
    } catch (err) {

      return false; 
    }
  }, []);

  const signup = useCallback(async (user) => {
    
    try {
      let response = (await api.post('/createUser',{
        name: user.name,
        email: user.email,
        password: user.password
      })).data;

      setEmail(response.user.email);
      localStorage.setItem("token", response.token);
      response.user.role ? setIsAdm(true) : setIsAdm(false);
      setIsAuthenticated(true);
      api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;

      return true;
    }catch(err) {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setEmail('');
    setIsAuthenticated(false);
    api.defaults.headers.common["Authorization"] = "";
    alert("Desconectado da conta");
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    let token = localStorage.getItem("token");

    const verifyToken = async () => {
      if (token !== null) {
        let httpOptions = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        try {          
          let response = (await api.get('/verify', httpOptions)).data;
        
          if(response) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setIsAuthenticated(true);
            setEmail(response.email);
            response.role ? setIsAdm(true) : setIsAdm(false);
          }
        }
        catch (err) {
          logout();
        }
      }
    };

    verifyToken();
  }, [logout])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        signup,
        email,
        logout,
        isAdm
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContext, AuthProvider };