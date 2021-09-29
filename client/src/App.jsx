import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Home } from "./pages/Home/index";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Profile } from './pages/Profile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './hooks/useAuth'
import { GlobalStyles } from './styles/GlobalStyles'

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
        <BrowserRouter>
            <Switch>
              <Route path="/" exact component={ Login }/>
              <Route path="/register" component={ Register } />
              <PrivateRoute path="/home" component={ Home } />
              <Route path="/profile" component={ Profile } />
            </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
