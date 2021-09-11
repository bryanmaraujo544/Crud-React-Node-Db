import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Profile } from './pages/Profile'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'


function App() {
  const user = window.localStorage.getItem('user')

  const isAuthenticated = false
  // const PrivateRoute = ({
  //   component: Component,
  //   ...rest
  // }) => (
  //   <Route {...rest} render={(props) => (
  //     user !== null
  //       ? <Component {...props} />
  //       : <Redirect to="/" />
  //   )} />
  // )
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ Login }/>
          <Route path="/register" component={ Register } />
          <Route path="/home" component={ Home } />
          <Route path="/profile" component={ Profile } />
        </Switch>
    </BrowserRouter>
  
  );
}

export default App;
