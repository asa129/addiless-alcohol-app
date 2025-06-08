import userEvent from "@testing-library/user-event";
import App from "../App";
import { render, screen } from "@testing-library/react";

describe("AlcoholsSearch", () => {
  it("ページタイトルが表示されている", async () => {
    render(<App />);
    expect(await screen.findByTestId("title")).toBeInTheDocument();
  });

  it("商品名検索ボックスが表示されている", async () => {
    render(<App />);
    expect(await screen.findByTestId("search_sake_name")).toBeInTheDocument();
  });

  it("カテゴリ選択ボックスが表示されている", async () => {
    render(<App />);
    expect(await screen.findByTestId("select_genres")).toBeInTheDocument();
  });

  it("メーカー選択ボックスが表示されている", async () => {
    render(<App />);
    expect(await screen.findByTestId("maker")).toBeInTheDocument();
  });

  it("商品名で検索すると、検索結果が表示される", async () => {
    const user = userEvent.setup();
    render(<App />);
    const searchInput = await screen.findByTestId("search_sake_name");
    const searchButton = await screen.findByTestId("search_button2");

    // 商品名を入力して検索ボタンをクリック
    await user.type(searchInput, "アサヒ");
    await user.click(searchButton);

    // ちょっと待つ
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 検索結果が表示されることを確認
    expect(
      await screen.findByText("アサヒSlatシャルドネサワー")
    ).toBeInTheDocument();
    screen.debug();
  });

  it("カテゴリを選択して検索すると、検索結果が表示される", async () => {
    render(<App />);
    const user = userEvent.setup();
    const categorySelect = await screen.findByTestId("cocktail");

    // カテゴリを選択
    await user.click(categorySelect);

    // ちょっと待つ
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 検索結果が表示されることを確認
    expect(await screen.findByText("スミノフアイス™")).toBeInTheDocument();
    expect(
      await screen.findByText("スミノフアイス ワイルドグレープ™")
    ).toBeInTheDocument();
  });

  it("メーカーを選択して検索すると、検索結果が表示される", async () => {
    render(<App />);
    const user = userEvent.setup();
    const makerSelect = await screen.findByTestId("maker");

    // メーカーを選択
    await user.selectOptions(makerSelect, "1");

    // ちょっと待つ
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 検索結果が表示されることを確認
    expect(
      await screen.findByText("アサヒSlatシャルドネサワー")
    ).toBeInTheDocument();
  });

  it("検索結果がない場合、メッセージが表示される", async () => {
    render(<App />);
    const user = userEvent.setup();
    const searchInput = await screen.findByTestId("search_sake_name");
    const searchButton = await screen.findByTestId("search_button2");

    // 存在しない商品名を入力して検索ボタンをクリック
    await user.type(searchInput, "存在しない商品");
    await user.click(searchButton);

    // ちょっと待つ
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 検索結果がないことを確認
    expect(await screen.findByText("検索結果ないよ")).toBeInTheDocument();
  });
});
