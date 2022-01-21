import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GameInitialize from './views/gameInitialize/GameInitialize';
import GamePlay from './views/gamePlay/GamePlay';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { GameContextProvider } from "./context/GameContextProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <GameContextProvider >
            <Route exact path="/">
              <GameInitialize />
            </Route>
            <Route exact path="/play">
              <GamePlay />
            </Route>
          </GameContextProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
