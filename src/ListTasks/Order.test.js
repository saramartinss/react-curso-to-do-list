import React from "react";
import ReactDOM from "react-dom";
import Order from "./Order";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Testing Order component", () => {
  it("Should render Order component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Order orderUp={false} orderDown={false} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Should show default order", () => {
    const { getByTestId } = render(<Order orderUp={false} orderDown={false} />);
    expect(getByTestId("faSort")).not.toHaveClass("hidden");
    expect(getByTestId("faSortUp")).toHaveClass("hidden");
    expect(getByTestId("faSortDown")).toHaveClass("hidden");
  });

  it("Should show up order", () => {
    const { getByTestId } = render(<Order orderUp={true} orderDown={false} />);
    expect(getByTestId("faSort")).toHaveClass("hidden");
    expect(getByTestId("faSortUp")).not.toHaveClass("hidden");
    expect(getByTestId("faSortDown")).toHaveClass("hidden");
  });

  it("Should show down order", () => {
    const { getByTestId } = render(<Order orderUp={false} orderDown={true} />);
    expect(getByTestId("faSort")).toHaveClass("hidden");
    expect(getByTestId("faSortUp")).toHaveClass("hidden");
    expect(getByTestId("faSortDown")).not.toHaveClass("hidden");
  });
});
