import React, { useEffect, useState } from 'react';
import Nav from "./NavRoutes/Nav";
import Routes from "./NavRoutes/Routes";
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './AuthContext';
import useLocalStorage from './hooks/useLocalStorage'
import { decode } from 'jsonwebtoken';
import JoblyApi from './api/JoblyApi';
import Loading from './Common/Loading';
import Footer from './Common/Footer';

// token keyname for localStorage
export const TOKEN_STORAGE_ID = 'token';

/** Jobly - App for finding and applying for jobs!
 */
const App = () => {

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [userInfo, setUserInfo] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // check if local storage already has token, update state with token
  useEffect(() => {
    async function getLoggedInUser() {
      if (token) {
        try {
          const { username } = decode(token);
          let currentUser = await JoblyApi.getUser(username);
          setUserInfo(currentUser);
        } catch (err) {
          setUserInfo(null);
        }
      }
      setDataLoaded(true);
    }
    setDataLoaded(false);
    getLoggedInUser();
  }, [token]);

  // log out of account, remove token from LS
  const logout = () => {
    setUserInfo(null);
    setToken(null);
  };

  // sign up for account
  const signup = async (signupData) => {
    try {
      let token = await JoblyApi.register(signupData);
      setToken(token);
      return { login: true };
    } catch (err) {
      return { login: false, err };
    }
  };

  // sign in to existing account
  const login = async (loginData) => {
    try {
      let token = await JoblyApi.logIn(loginData);
      setToken(token);
      return { login: true };
    } catch (err) {
      return { login: false, err };
    }
  };

  if (!dataLoaded) return <Loading />;

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{ userInfo, setUserInfo }}>
          <Nav logout={logout} />
          <Routes login={login} signup={signup} />
          <Footer />
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;