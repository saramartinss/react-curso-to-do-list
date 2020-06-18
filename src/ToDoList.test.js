import React from "react";
import ReactDOM from "react-dom";
import ToDoList from "./ToDoList";

describe("Testing To Do List component", () => {
  it("Should render to do list component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ToDoList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
