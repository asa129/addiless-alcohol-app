import userEvent from "@testing-library/user-event";
import App from "../App";
import { render, screen } from "@testing-library/react";
import {
  getAllData,
  getDataByGenres,
  searchData,
} from "../utils/supabaseFunctions";
import type { Alcohols } from "../domain/Alcohols";

jest.mock("../utils/supabaseFunctions.ts", () => ({
  getAllData: jest.fn(),
  getDataByGenres: jest.fn(),
  searchData: jest.fn(),
}));

beforeEach(() => {
  (getAllData as jest.Mock).mockClear();
  (getDataByGenres as jest.Mock).mockClear();
  (searchData as jest.Mock).mockClear();
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

describe("AlcoholsSearch", () => {
  it("商品名検索ボックスが表示されている", async () => {
    render(<App />);
    expect(await screen.findByTestId("search_sake_name")).toBeInTheDocument();
  });

  it("カテゴリ選択ボックスが表示されている", async () => {
    render(<App />);
    expect(await screen.findByTestId("select_genres")).toBeInTheDocument();
  });

  it("メーカー選択ボックスが表示されている", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(await screen.findByTestId("detail_filter_button"));
    expect(await screen.findByTestId("maker")).toBeInTheDocument();
  });

  it("商品名で検索すると、検索結果が表示される", async () => {
    const user = userEvent.setup();
    // モックデータの準備
    const mockData = [
      {
        id: 1,
        sake_name: "アサヒSlatシャルドネサワー",
        image_url: "https://example.com/asahi_slat.jpg",
        has_additives: true,
      },
      {
        id: 2,
        sake_name: "キリン 本搾り™チューハイ グレープフルーツ",
        image_url: "https://example.com/kirin_honshibori.jpg",
        has_additives: false,
      },
    ];
    const mockDataByAlcohols = [
      {
        id: 1,
        sake_name: "アサヒSlatシャルドネサワー",
        image_url: "https://example.com/asahi_slat.jpg",
        has_additives: true,
      },
    ];

    // モック関数の実装
    (getAllData as jest.Mock).mockResolvedValue(mockData);
    (getDataByGenres as jest.Mock).mockResolvedValue(mockDataByAlcohols);
    (searchData as jest.Mock).mockResolvedValue(mockDataByAlcohols);

    render(<App />);

    const searchInput = await screen.findByTestId("search_sake_name");
    const searchButton = await screen.findByTestId("search_button");
    // 商品名を入力して検索ボタンをクリック
    await user.type(searchInput, "アサヒ");
    await user.click(searchButton);

    // 検索結果が表示されることを確認
    expect(
      await screen.findByText("アサヒSlatシャルドネサワー")
    ).toBeInTheDocument();
    screen.debug();
  });

  it("カテゴリを選択して検索すると、検索結果が表示される", async () => {
    // モックデータの準備
    const mockData = [
      {
        id: 1,
        sake_name: "アサヒSlatシャルドネサワー",
        image_url: "https://example.com/asahi_slat.jpg",
        has_additives: true,
      },
      {
        id: 2,
        sake_name: "キリン 本搾り™チューハイ グレープフルーツ",
        image_url: "https://example.com/kirin_honshibori.jpg",
        has_additives: false,
      },
      {
        id: 3,
        sake_name: "スミノフアイス™",
        image_url: "https://example.com/smirnoff_ice.jpg",
        has_additives: true,
      },
      {
        id: 4,
        sake_name: "スミノフアイス ワイルドグレープ™",
        image_url: "https://example.com/smirnoff_ice_grape.jpg",
        has_additives: true,
      },
    ];
    const mockDataByAlcohols = [
      {
        id: 3,
        sake_name: "スミノフアイス™",
        image_url: "https://example.com/smirnoff_ice.jpg",
        has_additives: true,
      },
      {
        id: 4,
        sake_name: "スミノフアイス ワイルドグレープ™",
        image_url: "https://example.com/smirnoff_ice_grape.jpg",
        has_additives: true,
      },
    ];

    // モック関数の実装
    (getAllData as jest.Mock).mockResolvedValue(mockData);
    (getDataByGenres as jest.Mock).mockResolvedValue(mockDataByAlcohols);
    (searchData as jest.Mock).mockResolvedValue(mockDataByAlcohols);

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
    // モックデータの準備
    const mockData = [
      {
        id: 1,
        sake_name: "アサヒSlatシャルドネサワー",
        image_url: "https://example.com/asahi_slat.jpg",
        has_additives: true,
      },
      {
        id: 2,
        sake_name: "キリン 本搾り™チューハイ グレープフルーツ",
        image_url: "https://example.com/kirin_honshibori.jpg",
        has_additives: false,
      },
    ];
    const mockDataByMakers = [
      {
        id: 1,
        sake_name: "アサヒSlatシャルドネサワー",
        image_url: "https://example.com/asahi_slat.jpg",
        has_additives: true,
      },
    ];
    // モック関数の実装
    (getAllData as jest.Mock).mockResolvedValue(mockData);
    (getDataByGenres as jest.Mock).mockResolvedValue(mockDataByMakers);
    (searchData as jest.Mock).mockResolvedValue(mockDataByMakers);
    render(<App />);
    const user = userEvent.setup();
    await user.click(await screen.findByTestId("detail_filter_button"));
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
    // モックデータの準備
    const mockData = [
      {
        id: 1,
        sake_name: "アサヒSlatシャルドネサワー",
        image_url: "https://example.com/asahi_slat.jpg",
        has_additives: true,
      },
      {
        id: 2,
        sake_name: "キリン 本搾り™チューハイ グレープフルーツ",
        image_url: "https://example.com/kirin_honshibori.jpg",
        has_additives: false,
      },
    ];
    const noMockData: Partial<Alcohols>[] = [];
    // モック関数の実装
    (getAllData as jest.Mock).mockResolvedValue(mockData);
    (searchData as jest.Mock).mockResolvedValue(noMockData);
    render(<App />);
    const user = userEvent.setup();
    const searchInput = await screen.findByTestId("search_sake_name");
    const searchButton = await screen.findByTestId("search_button");

    // 存在しない商品名を入力して検索ボタンをクリック
    await user.type(searchInput, "存在しない商品");
    await user.click(searchButton);

    // ちょっと待つ
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 検索結果がないことを確認
    expect(await screen.findByText("検索結果がありません")).toBeInTheDocument();
  });
});
