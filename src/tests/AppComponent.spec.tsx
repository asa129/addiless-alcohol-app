import App from "../App";
import {findByText, render, screen} from "@testing-library/react";

describe("title", () => {
  it("should render title", async() => {
    render(<App />);
    expect(await screen.findByText("Vite + React")).toBeInTheDocument();
  })
});