import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GameInitialize from './views/gameInitialize/GameInitialize';
import GamePlay from './views/gamePlay/GamePlay';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <GameInitialize />
          </Route>
          <Route exact path="/play">
            <GamePlay />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
