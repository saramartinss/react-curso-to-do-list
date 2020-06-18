import React from "react";
import ReactDOM from "react-dom";
import DeleteTask from "./DeleteTask";
import Task from "../models/task.model";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Testing Delete Task component", () => {
  const nameTask = "Tarefa de teste";
  const task = new Task(1, nameTask, false);

  it("Should render component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<DeleteTask task={task} reloadTasks={() => false} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Should render modal", () => {
    const { getByTestId } = render(
      <DeleteTask task={task} reloadTasks={() => false} />
    );
    fireEvent.click(getByTestId("btn-open-modal"));
    expect(getByTestId("modal")).toHaveTextContent(nameTask);
  });

  it("Should remove a task", () => {
    localStorage["tasks"] = JSON.stringify([task]);
    const { getByTestId } = render(
      <DeleteTask task={task} reloadTasks={() => false} />
    );
    fireEvent.click(getByTestId("btn-open-modal"));
    fireEvent.click(getByTestId("btn-delete"));
    const tasksDb = JSON.parse(localStorage["tasks"]);
    expect(tasksDb.length).toBe(0);
  });
});
