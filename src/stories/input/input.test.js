import { render, fireEvent } from "@testing-library/react";

import Input from "./input";

it("input element exist", () => {
  const { getAllByTestId } = render(<Input/>);
  const input = getAllByTestId("input-element");
  expect(input).toBeTruthy()
}); 
