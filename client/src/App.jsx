import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Home } from "./pages/Home/Index";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Profile } from './pages/Profile/Index';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './hooks/useAuth'
import { GlobalStyles } from './styles/GlobalStyles'
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme'
import { ThemeContextProvider } from './contexts/ThemeContext'

function App() {
  const { isAuthenticated } = useAuth()

  const PrivateRoute = ({
    component: Component,
    ...rest
  }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated === true || isAuthenticated != false
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
        <ThemeContextProvider>
          <ThemeProvider theme={theme.light}>
            <BrowserRouter>
                <Switch>
                  <Route path="/" exact component={ Login }/>
                  <Route path="/register" component={ Register } />
                  <PrivateRoute path="/home" component={ Home } />
                  <Route path="/profile" component={ Profile } />
                </Switch>
            </BrowserRouter>
          </ThemeProvider>
        </ThemeContextProvider>
    </>
  );
}

export default App;
