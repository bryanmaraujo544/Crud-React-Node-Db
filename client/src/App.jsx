import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { Home } from "./pages/Home/Index";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Profile } from './pages/Profile/Index';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './hooks/useAuth'
import { GlobalStyles } from './styles/GlobalStyles'
import { ThemeProvider } from 'styled-components';
import { Theme } from './styles/theme';
import { ThemeContext } from './contexts/ThemeContext';

function App() {
  const { isAuthenticated } = useAuth()
  const { theme } = useContext(ThemeContext)

  const PrivateRoute = ({
    component: Component,
    ...rest
  }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated === true || isAuthenticated !== false
        ? <Component {...props} />
        : <Redirect to="/" />
    )} />
  )
  return (
    <>
        <GlobalStyles />
        <ToastContainer
            pauseOnHover
            draggable 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            icon={true}
        />
        
          <ThemeProvider theme={theme === 'light' ? Theme.light : Theme.dark}>
            <BrowserRouter>
                <Switch>
                  <Route path="/" exact component={ Login }/>
                  <Route path="/register" component={ Register } />
                  <PrivateRoute path="/home" component={ Home } />
                  <Route path="/profile" component={ Profile } />
                </Switch>
            </BrowserRouter>
          </ThemeProvider>
        
    </>
  );
}

export default App;
