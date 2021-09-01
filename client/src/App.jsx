import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext'

function App() {


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={ Login }/>
          <Route path="/register" component={ Register } />
          <Route path="/home" component={ Home } />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  
  );
}

export default App;
