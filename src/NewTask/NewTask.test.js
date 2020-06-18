import React from "react";
import ReactDOM from "react-dom";
import NewTask from "./NewTask";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Testing New Task component", () => {
  it("Should render New Task component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<NewTask />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Should register a new task", () => {
    const { getByTestId } = render(<NewTask />);
    fireEvent.change(getByTestId("txt-task"), {
      target: { value: "Testing component" },
    });
    fireEvent.click(getByTestId("btn-register"));
    expect(getByTestId("modal")).toHaveTextContent("Sucesso");
    expect(getByTestId("modal")).toHaveTextContent(
      "Tarefa adicionada com sucesso!"
    );
  });
});
