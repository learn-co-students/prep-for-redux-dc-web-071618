import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import logo from "./logo.svg";
import "./App.css";
import { createStore } from "redux";

/* how to update over time */
// 1. What is the shape of our state?
// { count: number, friends: []string, inputText: string, currentUser: { name: string, age: number } }
// 2. initial values
// 3. how the values change

// 1. shape { count: number }
// 2. initial values { count: 0 }
// 3. changes over time (how does it respond to different actions?):
//    increment action => count should go up by 1
//    decrement action => down by 1

const reducer = (oldState, action) => {
  console.log(oldState, action);
  if (oldState == undefined) {
    let initialState = { count: 50 };
    return initialState;
  }
  let updatedState = oldState;
  // we don't do:
  // BADDDDD !!!!! oldState.count += 1

  switch (action.type) {
    case "INCREMENT":
      return { count: oldState.count + action.value };
    case "DECREMENT":
      return { count: oldState.count - action.value };
    case "RESET":
      return { count: 0 };
    default:
      return updatedState;
  }
};

// const reducer = (oldState = { count: 0 }, action) => {
// return oldState;
// };

const store = createStore(reducer /* other options */);

console.log("the state is", store.getState());

class App extends Component {
  componentDidMount() {
    // WARNING: HACK!!!!
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Counter />
      </div>
    );
  }
}

class Header extends Component {
  renderDescription = () => {
    const remainder = store.getState().count % 5;
    const upToNext = 5 - remainder;
    return `The current count is less than ${store.getState().count +
      upToNext}`;
  };

  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        <h3>{this.renderDescription()}</h3>
      </header>
    );
  }
}

class Counter extends Component {
  increment = value => {
    // this.setState(prevState => ({ count: prevState.count + 1 }));
    store.dispatch({ type: "INCREMENT", value });
  };

  decrement = value => {
    store.dispatch({ type: "DECREMENT", value });
    // this.setState(prevState => ({ count: prevState.count - 1 }));
  };

  reset = () => {
    store.dispatch({ type: "RESET" });
  };

  render() {
    return (
      <div className="Counter">
        <h1>{store.getState().count}</h1>
        <button onClick={() => this.decrement(1)}> - </button>
        <button onClick={() => this.increment(1)}> + </button>
        <button onClick={() => this.increment(3)}> +3 </button>
        <button onClick={() => this.decrement(10)}> -10 </button>
        <button onClick={this.reset}> RESET </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
