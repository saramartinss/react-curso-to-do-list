import React from "react";
import ReactDOM from "react-dom";
import UpdateTask from "./UpdateTask";
import Task from "../models/task.model";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Testing Update Task component", () => {
  const taskId = 1;
  const task = new Task(taskId, "Nova tarefa", false);

  beforeEach(() => {
    localStorage["tasks"] = JSON.stringify([task]);
  });

  it("Should render Update Task component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<UpdateTask id={taskId} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Should show modal when update a task", () => {
    const { getByTestId } = render(<UpdateTask id={taskId} />);
    fireEvent.click(getByTestId("btn-update"));
    expect(getByTestId("modal")).toHaveTextContent("Sucesso");
  });

  it("Should update a task", () => {
    const nameTaskUpdated = "Tarefa atualizada";
    const { getByTestId } = render(<UpdateTask id={taskId} />);
    fireEvent.change(getByTestId("txt-task"), {
      target: { value: nameTaskUpdated },
    });
    fireEvent.click(getByTestId("btn-update"));
    const tasksDb = JSON.parse(localStorage["tasks"]);
    expect(tasksDb[0].name).toBe(nameTaskUpdated);
  });
});
