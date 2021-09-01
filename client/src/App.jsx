import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  const user = window.localStorage.getItem('user')
  console.log('olha o user', user)
  const isAuthenticated = false
  const PrivateRoute = ({
    component: Component,
    ...rest
  }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated !== undefined
        ? <Component {...props} />
        : <Redirect to="/" />
    )} />
  )
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={ Login }/>
          <Route path="/register" component={ Register } />
          <PrivateRoute path="/home" component={ Home } />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  
  );
}

export default App;
