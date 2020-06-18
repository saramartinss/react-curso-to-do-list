import React from "react";
import ReactDOM from "react-dom";
import Pagin from "./Pagin";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Testing Pagin component", () => {
  it("Should render Pagin component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Pagin
        totalItems={10}
        itemsPerPage={10}
        currentPage={1}
        changePage={() => false}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Should show pagination with 3 pages", () => {
    const { getByTestId } = render(
      <Pagin
        totalItems={15}
        itemsPerPage={5}
        currentPage={1}
        changePage={() => false}
      />
    );
    const pagination = getByTestId("pagination");
    expect(pagination).toHaveTextContent("1");
    expect(pagination).toHaveTextContent("2");
    expect(pagination).toHaveTextContent("3");
  });
});
