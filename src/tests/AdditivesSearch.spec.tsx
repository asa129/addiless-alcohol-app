import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import {
  getAllData,
  getDataByAlcohols,
  getDataByGenres,
  searchData,
} from "../utils/supabaseFunctions";
import type { Alcohols } from "../domain/Alcohols";

jest.mock("../utils/supabaseFunctions.ts", () => ({
  getAllData: jest.fn(),
  getDataByGenres: jest.fn(),
  searchData: jest.fn(),
  getDataByAlcohols: jest.fn(),
}));

beforeEach(() => {
  (getAllData as jest.Mock).mockClear();
  (getDataByGenres as jest.Mock).mockClear();
  (searchData as jest.Mock).mockClear();
  (getDataByAlcohols as jest.Mock).mockClear();
});

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
    const mockDataByGenres = [
      {
        id: 1,
        sake_name: "アサヒSlatシャルドネサワー",
        image_url: "https://example.com/asahi_slat.jpg",
        has_additives: true,
      },
    ];

    // モック関数の設定
    (getAllData as jest.Mock).mockResolvedValue(mockData);
    (getDataByGenres as jest.Mock).mockResolvedValue(mockDataByGenres);
    (searchData as jest.Mock).mockResolvedValue(mockDataByGenres);

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
        sake_name: "スミノフアイス ワイルドグレープ™",
        image_url: "https://example.com/smirnoff_wildgrape.jpg",
        has_additives: true,
      },
    ];
    const mockDataByAlcohols = [
      {
        id: 3,
        sake_name: "スミノフアイス ワイルドグレープ™",
        image_url: "https://example.com/smirnoff_wildgrape.jpg",
        has_additives: true,
      },
    ];
    // モック関数の設定
    (getAllData as jest.Mock).mockResolvedValue(mockData);
    (getDataByAlcohols as jest.Mock).mockResolvedValue(mockDataByAlcohols);
    (searchData as jest.Mock).mockResolvedValue(mockDataByAlcohols);

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
    const mockDataHaveAdditives = [
      {
        id: 1,
        sake_name: "アサヒSlatシャルドネサワー",
        image_url: "https://example.com/asahi_slat.jpg",
        has_additives: true,
      },
    ];
    // モック関数の設定
    (getAllData as jest.Mock).mockResolvedValue(mockData);
    (getDataByAlcohols as jest.Mock).mockResolvedValue(mockDataHaveAdditives);
    (searchData as jest.Mock).mockResolvedValue(mockDataHaveAdditives);

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
    const mockDataNotHaveAdditives = [
      {
        id: 2,
        sake_name: "キリン 本搾り™チューハイ グレープフルーツ",
        image_url: "https://example.com/kirin_honshibori.jpg",
        has_additives: false,
      },
    ];
    // モック関数の設定
    (getAllData as jest.Mock).mockResolvedValue(mockData);
    (getDataByAlcohols as jest.Mock).mockResolvedValue(
      mockDataNotHaveAdditives
    );
    (searchData as jest.Mock).mockResolvedValue(mockDataNotHaveAdditives);

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
    const mockDataNo: Partial<Alcohols>[] = [];
    // モック関数の設定
    (getAllData as jest.Mock).mockResolvedValue(mockData);
    (getDataByAlcohols as jest.Mock).mockResolvedValue(mockDataNo);
    (searchData as jest.Mock).mockResolvedValue(mockDataNo);
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
