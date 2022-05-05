import { render, screen } from "@testing-library/react";
import ShowCount from "./index";

it("check its returns correct value or not", async () => {
  render(<ShowCount count={12} />);
  const countElement = screen.getByTestId("para");
  expect(countElement.textContent).toBe("Totally 12 records");
});

it("check its returns correct value with one", async () => {
  render(<ShowCount count={1} />);
  const countElement = screen.getByTestId("para");
  expect(countElement.textContent).toBe("Totally 1 record");
});

it("check its returns correct value with zero", async () => {
  render(<ShowCount count={0} />);
  const countElement = screen.getByTestId("para");
  expect(countElement.textContent).toBe("No records found");
});
