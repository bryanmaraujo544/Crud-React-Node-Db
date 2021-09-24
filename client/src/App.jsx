import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Profile } from './pages/Profile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './hooks/useAuth'


function App() {
  const user = window.localStorage.getItem('user')

  const { isAuthenticated } = useAuth()
  
  console.log('value', isAuthenticated)

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
