import {
  getAllData,
  getDataByGenres,
  searchData,
} from "./utils/supabaseFunctions.ts";
import { useEffect, useState } from "react";
import type { Alcohols } from "./domain/Alcohols.ts";
import { Modal } from "./components/Modal.tsx";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AdditivesSearch } from "./domain/AdditivesSearch.ts";
import "./App.css";
import { Header } from "./components/Header.tsx";
import { Footer } from "./components/Foorter.tsx";
import { CiSearch } from "react-icons/ci";
import { TbListDetails } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa6";

function App() {
  const [data, setData] = useState<Partial<Alcohols>[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Partial<Alcohols>>();
  const [genreId, setGenreId] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(true);
  const getData = async () => {
    const data = await getAllData();
    setData(data);
    setIsLoading(false);
  };

  const handleOpenModal = (data: Partial<Alcohols>) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const aditivesSearch = async (formData: AdditivesSearch) => {
    const searchDatas = await searchData(formData);
    setData(searchDatas);
  };

  const { handleSubmit, register, setValue } = useForm<AdditivesSearch>();
  const onAdditivesSubmit: SubmitHandler<AdditivesSearch> = (formData) => {
    if (formData.have_additives === "0") {
      formData.additives = "";
      formData.additivesWord = "";
    }
    aditivesSearch(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setGenreId([...genreId, e.target.value]);
    } else {
      setGenreId(genreId.filter((id) => id !== e.target.value));
    }
  };

  useEffect(() => {
    if (genreId.length === 0) {
      getData();
    }
    const fetchDataByGenres = async () => {
      const searchByGenresData = await getDataByGenres(genreId);
      setData(searchByGenresData);
    };
    fetchDataByGenres();
  }, [genreId]);

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* <h1 data-testid="title" onClick={() => getData()}>
        成分表示でお酒を検索
      </h1> */}
      <Header onClickData={getData} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-10 md:mb-12">
          {/* Main Search Card */}
          <div className="shadow-xl border border-brand-gray bg-white rounded-2xl overflow-hidden">
            <div className="p-8 text-center">
              <h2
                className="text-4xl font-bold text-brand-navy-dark jp-text mb-2"
                data-testid="title"
                onClick={() => getData()}
              >
                成分表示でお酒を検索
              </h2>

              <p className="text-brand-navy jp-text text-lg">
                アレルギーや体質に合わせて、あなたにぴったりのお酒を見つけましょう
              </p>
            </div>
            <div className="p-8 pt-0 flex flex-col items-center">
              <form
                onSubmit={handleSubmit(onAdditivesSubmit)}
                className="w-full space-y-6"
              >
                <div className="relative w-full">
                  <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark" />
                  <input
                    type="text"
                    placeholder="お酒の名前で検索"
                    id="sake_name"
                    {...register("sake_name")}
                    data-testid="search_sake_name"
                    className="w-full pl-12 pr-4 py-3 bg-brand-cream-dark border border-brand-gray rounded-xl text-base h-14 shadow-sm placeholder:text-brand-gray-dark focus:ring-brand-blue focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-center">
                    <input
                      type="radio"
                      {...register("have_additives")}
                      value="1"
                      id="have_additives"
                      data-testid="have_additives"
                      onClick={() => {
                        setDisabled(false);
                      }}
                      className="text-brand-blue border border-brand-blue focus:ring-brand-blue w-5 h-5"
                    />
                    <label
                      htmlFor="have_additives"
                      className="font-medium text-brand-navy jp-text text-base cursor-pointer"
                    >
                      あり
                    </label>
                    <input
                      type="radio"
                      {...register("have_additives")}
                      value="0"
                      onClick={() => {
                        setValue("additives", "");
                        setValue("additivesWord", "");
                        setDisabled(true);
                      }}
                      id="not_have_additives"
                      data-testid="not_have_additives"
                      className="text-brand-blue border border-brand-blue focus:ring-brand-blue w-5 h-5"
                    />
                    <label
                      htmlFor="not_have_additives"
                      className="font-medium text-brand-navy jp-text text-base cursor-pointer"
                    >
                      なし
                    </label>
                    <input
                      type="radio"
                      {...register("have_additives")}
                      value=""
                      onClick={() => {
                        setValue("additives", "");
                        setValue("additivesWord", "");
                        setDisabled(true);
                      }}
                      defaultChecked
                      id="not_specified_additives"
                      data-testid="not_specified_additives"
                      className="text-brand-blue border border-brand-blue focus:ring-brand-blue w-5 h-5"
                    />
                    <label
                      htmlFor="not_specified_additives"
                      className="font-medium text-brand-navy jp-text text-base cursor-pointer"
                    >
                      指定しない
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    data-testid="search_button"
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-brand-blue to-brand-teal text-white rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 jp-text text-lg font-semibold h-14 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    <CiSearch className="mr-3 h-6 w-6" />
                    検索する
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full">
            <div className="shadow-xl border border-brand-gray bg-white rounded-2xl overflow-hidden">
              <button
                onClick={() => alert("あ")}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-2">
                  <TbListDetails />
                  <span className="font-medium text-gray-700">
                    詳細フィルター
                  </span>
                </div>
                <FaChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${""}`}
                  // TODO
                  // className={`w-5 h-5 text-gray-400 transition-transform ${
                  //   showDetailedFilter ? "rotate-180" : ""
                  // }`
                />
              </button>
              <label htmlFor="additives">添加物</label>
              <select
                data-testid="select_additives"
                id="additives"
                {...register("additives")}
                onChange={() => {
                  setValue("have_additives", "1");
                }}
                disabled={disabled}
              >
                <option value="">添加物を選んでください</option>
                <option value="甘味料">人工甘味料</option>
                <option value="酸味料">酸味料</option>
                <option value="着色料">着色料</option>
                <option value="発色剤">発色剤</option>
                <option value="酸化防止剤">酸化防止剤</option>
                <option value="香料">香料</option>
              </select>
            </div>
            <div>
              <label htmlFor="additivesWord">添加物で検索</label>
              <input
                type="text"
                id="additivesWord"
                {...register("additivesWord")}
                onChange={() => {
                  setValue("have_additives", "1");
                }}
                data-testid="additives_word"
                disabled={disabled}
              />
            </div>
            <div>
              <label htmlFor="maker">メーカー</label>
              <select id="maker" {...register("maker")} data-testid="maker">
                <option value="">メーカーを選んでください</option>
                <option value="1">サントリー</option>
                <option value="2">アサヒ</option>
                <option value="3">キリン</option>
                <option value="4">サッポロ</option>
              </select>
            </div>
            <div>
              <div data-testid="select_genres">
                <label htmlFor="genre_id">お酒のジャンル</label>
                <input
                  type="checkbox"
                  value="2"
                  id="chuhai"
                  onChange={handleChange}
                  data-testid="chuhai"
                />
                <label htmlFor="chuhai">チューハイ</label>
                <input
                  type="checkbox"
                  value="4"
                  id="cocktail"
                  onChange={handleChange}
                  data-testid="cocktail"
                />
                <label htmlFor="cocktail">カクテル</label>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            selectedData={selectedData!}
          />
        )}
        {data && data.length === 0 ? (
          <div>
            <p>検索結果ないよ</p>
          </div>
        ) : (
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <th>名前</th>
                <th>画像</th>
                <th>添加物あり・なし</th>
                <th></th>
              </tr>
              {data &&
                data.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td data-testid="sake_name">{data.sake_name}</td>
                      <td>
                        <img
                          src={data.image_url!}
                          alt={data.sake_name}
                          data-testid="sake_image"
                        />
                      </td>
                      <td data-testid="sake_additives">
                        {data.has_additives ? "あり" : "なし"}
                      </td>
                      <td>
                        <button
                          onClick={() => handleOpenModal(data)}
                          data-testid="sake_detail"
                        >
                          詳細
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
