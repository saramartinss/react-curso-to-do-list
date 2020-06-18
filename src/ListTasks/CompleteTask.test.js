import React, { createElement } from "react";
import ReactDOM from "react-dom";
import CompleteTask from "./CompleteTask";
import Task from "../models/task.model";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Testing Complete Task component", () => {
  const nameTask = "Tarefa de teste";
  const task = new Task(1, nameTask, false);

  it("Should render component withuot crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <CompleteTask task={task} reloadTasks={() => false} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Should render modal", () => {
    const { getByTestId } = render(
      <CompleteTask task={task} reloadTasks={() => false} />
    );
    fireEvent.click(getByTestId("btn-open-modal"));
    expect(getByTestId("modal")).toHaveTextContent(nameTask);
  });

  it("Should complete a task", () => {
    localStorage["tasks"] = JSON.stringify([task]);
    const { getByTestId } = render(
      <CompleteTask task={task} reloadTasks={() => false} />
    );
    fireEvent.click(getByTestId("btn-open-modal"));
    fireEvent.click(getByTestId("btn-complete"));
    const tasksDb = JSON.parse(localStorage["tasks"]);
    expect(tasksDb[0].completed).toBeTruthy();
  });
});
