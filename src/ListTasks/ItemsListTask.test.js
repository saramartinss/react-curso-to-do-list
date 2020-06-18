import React from "react";
import ReactDOM from "react-dom";
import ItemsListTask from "./ItemsListTasks";
import Task from "../models/task.model";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Testing Items Liks Task component", () => {
  const nameTask = "Tarefa";
  const task = new Task(1, nameTask, false);
  const taskCompleted = new Task(2, nameTask, true);

  it("Should render component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <ItemsListTask tasks={[]} reloadTasks={() => false} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Should render a task", () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <ItemsListTask tasks={[task]} reloadTasks={() => false} />
        </tbody>
      </table>
    );
    expect(getByTestId("task")).toHaveTextContent(nameTask);
  });

  it("Should render a completed task", () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <ItemsListTask tasks={[taskCompleted]} reloadTasks={() => false} />
        </tbody>
      </table>
    );
    expect(getByTestId("name-task")).toHaveStyle(
      "text-decoration: line-through"
    );
  });
});
