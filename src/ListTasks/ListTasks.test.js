import React from "react";
import ReactDOM from "react-dom";
import ListTasks from "./ListTasks";
import Task from "../models/task.model";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Testing List Tasks component", () => {
  const nameFirstTask = "Primeira tarefa";
  const nameSecondTask = "Segunda tarefa";
  const nameThirdTask = "Terceira tarefa";

  beforeEach(() => {
    localStorage["tasks"] = JSON.stringify([
      new Task(1, nameFirstTask, false),
      new Task(2, nameSecondTask, false),
      new Task(3, nameThirdTask, false),
    ]);
  });

  afterEach(() => {
    delete localStorage["task"];
  });

  it("Should render List Tasks component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ListTasks />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Should show a table with 3 tasks", () => {
    const { getByTestId } = render(<ListTasks />);
    const table = getByTestId("table");
    expect(table).toHaveTextContent(nameFirstTask);
    expect(table).toHaveTextContent(nameSecondTask);
    expect(table).toHaveTextContent(nameThirdTask);
  });

  it("Should filter data on task list", () => {
    const { getByTestId } = render(<ListTasks />);
    fireEvent.change(getByTestId("txtTask"), {
      target: { value: nameFirstTask },
    });
    const table = getByTestId("table");
    expect(table).toHaveTextContent(nameFirstTask);
    expect(table).not.toHaveTextContent(nameSecondTask);
    expect(table).not.toHaveTextContent(nameThirdTask);
  });
});
