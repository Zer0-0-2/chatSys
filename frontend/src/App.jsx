import React, { Component } from "react";
import './App.css'
import { connect, sendMsg } from "./api/index";
import Header from "./components/Header/Header";
import ChatHistory from "./components/ChatHistory/ChatHistory";
import ChatInput from "./components/input/ChatInput";
import Login from "./components/Login/Login";


class App extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    this.state={
      isAuthenticated: !!token,
      chatHistory: [] 
    }
  }

  componentDidMount() {
    if(this.state.isAuthenticated){
      const token = localStorage.getItem('token');
      connect((msg) => {
        console.log("New Message")
        this.setState(prevState => ({
          chatHistory: [...prevState.chatHistory, msg]
        }))
      console.log(this.state);
      }, token);
    }
  }

  handleLogin = (userData) => {
    this.setState({ isAuthenticated: true});
    this.componentDidMount(); //Reconnect Websocket
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ isAuthenticated: false, chatHistory: [] });
  }

  send(event) {
    if(event.keyCode === 13) {
      sendMsg(event.target.value);
      event.target.value = "";
    }
  }
  render() {
    if (!this.state.isAuthenticated) {
      return <Login onLogin={this.handleLogin} />;
    }
    
    return(
      <div className="App">
        <Header />
        <ChatHistory chatHistory={this.state.chatHistory} />
        <ChatInput send={this.send} />
      </div>
    );
  } 
}

export default App;
