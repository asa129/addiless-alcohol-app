import App from "../App";
import { render, screen } from "@testing-library/react";
import { getAllData } from "../utils/supabaseFunctions";

jest.mock("../utils/supabaseFunctions.ts", () => ({
  getAllData: jest.fn(),
}));

// モックデータの準備
const mockData = [
  {
    id: 1,
    sake_name: "ビール",
    image_url: "https://example.com/beer.jpg",
    has_additives: true,
  },
  {
    id: 2,
    sake_name: "ワイン",
    image_url: "https://example.com/wine.jpg",
    has_additives: false,
  },
  {
    id: 3,
    sake_name: "サケ",
    image_url: "https://example.com/sake.jpg",
    has_additives: true,
  },
];

beforeEach(() => {
  (getAllData as jest.Mock).mockClear();
});

describe("App", () => {
  it("ページタイトルが表示されている", async () => {
    render(<App />);
    expect(await screen.findByTestId("title")).toBeInTheDocument();
  });

  it("ローディングが表示されている", async () => {
    render(<App />);
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });

  it("お酒のリストが正しく表示されている", async () => {
    // モック関数の設定
    (getAllData as jest.Mock).mockResolvedValue(mockData);

    render(<App />);
    expect(await screen.findAllByTestId("sake_name")).toHaveLength(3);
    expect(await screen.findAllByTestId("sake_image")).toHaveLength(3);
    expect(await screen.findAllByTestId("sake_additives")).toHaveLength(3);

    const nameLows = await screen.findAllByTestId("sake_name");
    expect(nameLows[0]).toHaveTextContent("ビール");
    expect(nameLows[1]).toHaveTextContent("ワイン");
    expect(nameLows[2]).toHaveTextContent("サケ");

    const imageLows = await screen.findAllByTestId("sake_image");
    expect(imageLows[0]).toHaveAttribute("src", "https://example.com/beer.jpg");
    expect(imageLows[1]).toHaveAttribute("src", "https://example.com/wine.jpg");
    expect(imageLows[2]).toHaveAttribute("src", "https://example.com/sake.jpg");

    const additivesLows = await screen.findAllByTestId("sake_additives");
    expect(additivesLows[0]).toHaveTextContent("あり");
    expect(additivesLows[1]).toHaveTextContent("なし");
    expect(additivesLows[2]).toHaveTextContent("あり");
  });

  it("詳細リンクをみてとれる", async () => {
    // モック関数の設定
    (getAllData as jest.Mock).mockResolvedValue(mockData);

    render(<App />);
    expect(await screen.findAllByTestId("sake_detail")).toHaveLength(3);
    const detailLinks = await screen.findAllByTestId("sake_detail");
    expect(detailLinks[0]).toHaveAttribute("href", "");
    expect(detailLinks[1]).toHaveAttribute("href", "");
    expect(detailLinks[2]).toHaveAttribute("href", "");
  });
});
