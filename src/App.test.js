import { render, screen } from "@testing-library/react";
import App from "./App";

test("check this heading is exits or not", () => {
  render(<App />);
  const headerElement = screen.getByText(/Student Data/i);
  expect(headerElement).toBeInTheDocument();
});

test("check this heading is exits or not", () => {
  render(<App />);
  const headerElement = screen.getByText(/Student Data/i);
  expect(headerElement).toContainHTML("h1");
});
