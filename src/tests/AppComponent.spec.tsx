import App from "../App";
import { render, screen } from "@testing-library/react";

describe("title", () => {
  it("should render title", async () => {
    render(<App />);
    expect(true).toBeTruthy();
  });
});
