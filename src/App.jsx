import "./App.css";
import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import { Routes, Route } from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Routes>
        <Route path="/"element={<News key="general" category="general" />}/>
          <Route exact  path="/general"element={<News key="general" category="general" />}/>
          <Route exact  path="/business"element={<News key="business" category="business" />}/>
          <Route exact  path="/entertainment"element={<News key="entertainment" category="entertainment" />}/>
          <Route exact  path="/health"element={<News ey="health" category="health" />}/>
          <Route exact  path="/science"element={<News key="science"  category="science" />}/>
          <Route exact  path="/sports"element={<News key="sports"  category="sports" />}/>
          <Route exact  path="/technology"element={<News key="technology"  category="technology" />}/>
        </Routes>
      </>
    );
  }
}
