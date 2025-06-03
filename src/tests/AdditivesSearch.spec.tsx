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
    expect(
      await screen.findByText("アサヒSlatシャルドネサワー")
    ).toBeInTheDocument();
  });

  it("検索ボックスでワードを入力して検索すると、ワードが含まれるデータが表示される", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(await screen.findByTestId("additives_word"), "色素");
    await user.click(await screen.findByTestId("search_button"));
    // ちょっと待つ
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(
      await screen.findByText("スミノフアイス ワイルドグレープ™")
    ).toBeInTheDocument();
  });

  it("添加物ありラジオボタンを選択して検索すると、添加物あり/なしのデータが表示される", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(await screen.findByTestId("have_additives"));
    await user.click(await screen.findByTestId("search_button"));
    // ちょっと待つ
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(
      await screen.findByText("アサヒSlatシャルドネサワー")
    ).toBeInTheDocument();
  });

  it("添加物なしラジオボタンを選択して検索すると、添加物なしのデータが表示される", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(await screen.findByTestId("not_have_additives"));
    await user.click(await screen.findByTestId("search_button"));
    // ちょっと待つ
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(
      await screen.findByText("キリン 本搾り™チューハイ グレープフルーツ")
    ).toBeInTheDocument();
  });

  it("検索結果が0件の場合、0件のメッセージが表示される", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(
      await screen.findByTestId("select_additives"),
      "発色剤"
    );
    await user.click(await screen.findByTestId("search_button"));
    // ちょっと待つ
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(await screen.findByText("検索結果ないよ")).toBeInTheDocument();
  });
});
