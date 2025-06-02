import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("AdditivesSearch", () => {
  it("添加物選択ドロップダウンが表示されている", async () => {
    render(<App />);
    expect(await screen.findByTestId("select_additives")).toBeInTheDocument();
  });

  it("添加物検索ボックスが表示されている", async () => {
    render(<App />);
    expect(await screen.findByTestId("additives_word")).toBeInTheDocument();
  });

  it("添加物あり/なしラジオボタンが表示されている", async () => {
    render(<App />);
    expect(await screen.findByTestId("have_additives")).toBeInTheDocument();
    expect(await screen.findByTestId("not_have_additives")).toBeInTheDocument();
  });

  it("人工甘味料を選択して検索すると、人工甘味料のデータが表示される", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(
      await screen.findByTestId("select_additives"),
      "甘味料"
    );
    await user.click(await screen.findByTestId("search_button"));
    // ちょっと待つ
    await new Promise((resolve) => setTimeout(resolve, 1000));
    screen.debug();
  });
});
