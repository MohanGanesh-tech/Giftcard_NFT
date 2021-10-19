import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import SellGiftcard from "./Sell_Giftcard/Sell_Giftcard";
import Navigation from "./Navigation";

class App extends Component {
   render() {
    return (
      <div>
        <Navigation />

        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/SellGiftcard"><SellGiftcard /></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
