import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login }/>
        <Route path="/register" component={ Register } />
        <Route path="/home" component={ Home } />

      </Switch>
    </BrowserRouter>
  
  );
}

export default App;
