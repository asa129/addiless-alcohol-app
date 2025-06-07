import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { getAllData, getDataByGenres } from "../utils/supabaseFunctions";

jest.mock("../utils/supabaseFunctions.ts", () => ({
  getAllData: jest.fn(),
  getDataByGenres: jest.fn(),
}));

// モックデータの準備
// モックデータの準備
const mockData = [
  {
    id: 1,
    sake_name: "ビール",
    image_url: "https://example.com/beer.jpg",
    alcohol_genres: {
      genre_name: "ビール",
    },
    manufacturers: {
      manufacturer_name: "アサヒ",
    },
    has_additives: true,
    description: "ビールです",
    ingredients_text: "麦芽、水、酵母",
  },
  {
    id: 2,
    sake_name: "ワイン",
    image_url: "https://example.com/wine.jpg",
    alcohol_genres: {
      genre_name: "ワイン",
    },
    manufacturers: {
      manufacturer_name: "エノテカ",
    },
    has_additives: false,
    description: "ワインです",
    ingredients_text: "ブドウ、水、酵母",
  },
  {
    id: 3,
    sake_name: "サケ",
    image_url: "https://example.com/sake.jpg",
    alcohol_genres: {
      genre_name: "酒",
    },
    manufacturers: {
      manufacturer_name: "酒メーカー",
    },
    has_additives: true,
    description: "サケです",
    ingredients_text: "米、水、酵母",
  },
];

beforeEach(() => {
  (getAllData as jest.Mock).mockClear();
});

describe("Modal", () => {
  it("詳細リンクを押すとモーダルが表示される", async () => {
    const user = userEvent.setup();
    // モックデータを設定
    (getAllData as jest.Mock).mockResolvedValue(mockData);
    render(<App />);
    const detailButton = await screen.findAllByTestId("sake_detail");
    await user.click(detailButton[0]);
    expect(await screen.findByTestId("modal_title")).toHaveTextContent(
      "モーダル"
    );
  });

  it("モーダル内に商品の基本情報が表示されている", async () => {
    const user = userEvent.setup();
    // モックデータを設定
    (getAllData as jest.Mock).mockResolvedValue(mockData);
    render(<App />);
    const detailButton = await screen.findAllByTestId("sake_detail");
    await user.click(detailButton[0]);
    expect(await screen.findByTestId("modal_sake_name")).toHaveTextContent(
      "ビール"
    );
    expect(await screen.findByTestId("modal_alcohol_genres")).toHaveTextContent(
      "ビール"
    );
    expect(await screen.findByTestId("modal_manufacturers")).toHaveTextContent(
      "アサヒ"
    );
    expect(await screen.findByTestId("modal_has_additives")).toHaveTextContent(
      "あり"
    );
    expect(
      await screen.findByTestId("modal_ingredients_text")
    ).toHaveTextContent("麦芽、水、酵母");
  });

  it("モーダルを閉じることができる", async () => {
    const user = userEvent.setup();
    // モックデータを設定
    (getAllData as jest.Mock).mockResolvedValue(mockData);
    render(<App />);
    const detailButton = await screen.findAllByTestId("sake_detail");
    await user.click(detailButton[0]);
    const closeButton = await screen.findByTestId("modal_close");
    await user.click(closeButton);
    expect(screen.queryByTestId("modal_title")).not.toBeInTheDocument();
  });
});
