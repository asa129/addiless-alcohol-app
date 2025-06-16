import {
  getAllData,
  getDataByGenres,
  searchData,
} from "./utils/supabaseFunctions.ts";
import { useEffect, useState } from "react";
import type { Alcohols } from "./domain/Alcohols.ts";
import { Modal } from "./components/Modal.tsx";
import { AdditivesSearch } from "./domain/AdditivesSearch.ts";
import "./App.css";
import { Header } from "./components/Header.tsx";
import { Footer } from "./components/Foorter.tsx";
import { Search } from "./components/Search.tsx";
import { Card } from "./components/Card.tsx";
import { useForm, type SubmitHandler } from "react-hook-form";

function App() {
  const [data, setData] = useState<Partial<Alcohols>[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Partial<Alcohols>>();
  const [genreId, setGenreId] = useState<string[]>([]);
  const [isDetailedFilterOpen, setIsDetailedFilterOpen] = useState(false);

  const getData = async () => {
    const data = await getAllData();
    setData(data);
    setIsLoading(false);
  };

  const additivesSearch = async (formData: AdditivesSearch) => {
    const searchDatas = await searchData(formData);
    setData(searchDatas);
    handleReset();
    setIsDetailedFilterOpen(false);
  };

  const handleOpenModal = (data: Partial<Alcohols>) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { handleSubmit, register, setValue, resetField } =
    useForm<AdditivesSearch>();

  const onAdditivesSubmit: SubmitHandler<AdditivesSearch> = (formData) => {
    if (formData.have_additives === "0") {
      formData.additives = "";
      formData.additivesWord = "";
    }
    additivesSearch(formData);
  };

  const handleReset = () => {
    resetField("sake_name");
    setValue("have_additives", "");
    resetField("additives");
    resetField("additivesWord");
    resetField("maker");
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
      <div className="min-h-screen bg-brand-cream flex flex-col">
        <Header
          onClickData={getData}
          setIsDetailedFilterOpen={setIsDetailedFilterOpen}
          handleReset={handleReset}
        />
        <div className="flex-grow container mx-auto px-4 py-8 md:py-12">
          <Search
            getData={getData}
            additivesSearch={additivesSearch}
            isDetailedFilterOpen={isDetailedFilterOpen}
            setIsDetailedFilterOpen={setIsDetailedFilterOpen}
            handleSubmit={handleSubmit}
            register={register}
            setValue={setValue}
            resetField={resetField}
            onAdditivesSubmit={onAdditivesSubmit}
            handleReset={handleReset}
          />
          <div className="mb-10 md:mb-12">
            <div data-testid="select_genres" className="space-y-4">
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <div
                  className={`flex gap-2 items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer min-w-fit ${
                    genreId.includes("2")
                      ? "bg-brand-blue text-white shadow-md"
                      : "bg-white hover:bg-brand-blue hover:text-white border"
                  }`}
                >
                  <input
                    type="checkbox"
                    value="2"
                    id="chuhai"
                    onChange={handleChange}
                    checked={genreId.includes("2")}
                    data-testid="chuhai"
                    className="w-4 h-4 rounded border-2 border-current accent-current"
                  />
                  <label htmlFor="chuhai" className="cursor-pointer">
                    チューハイ
                  </label>
                </div>
                <div
                  className={`flex gap-2 items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    genreId.includes("4")
                      ? "bg-brand-blue text-white shadow-md"
                      : "bg-white hover:bg-brand-blue hover:text-white border"
                  }`}
                >
                  <input
                    type="checkbox"
                    value="4"
                    id="cocktail"
                    onChange={handleChange}
                    checked={genreId.includes("4")}
                    data-testid="cocktail"
                    className="w-4 h-4 rounded border-2 border-current accent-current"
                  />
                  <label htmlFor="cocktail" className="cursor-pointer">
                    カクテル
                  </label>
                </div>
                {/* <div
                  className={`flex gap-2 items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    false
                      ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    value="4"
                    id="cocktail"
                    onChange={handleChange}
                    data-testid="cocktail"
                    className="data-[state=checked]:bg-brand-blue data-[state=checked]:text-white border border-brand-blue w-5 h-5 rounded-md"
                  />
                  <label htmlFor="cocktail">カクテル</label>
                </div>
                <div
                  className={`flex gap-2 items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    false
                      ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    value="4"
                    id="cocktail"
                    onChange={handleChange}
                    data-testid="cocktail"
                    className="data-[state=checked]:bg-brand-blue data-[state=checked]:text-white border border-brand-blue w-5 h-5 rounded-md"
                  />
                  <label htmlFor="cocktail">カクテル</label>
                </div>
                <div
                  className={`flex gap-2 items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    false
                      ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    value="4"
                    id="cocktail"
                    onChange={handleChange}
                    data-testid="cocktail"
                    className="data-[state=checked]:bg-brand-blue data-[state=checked]:text-white border border-brand-blue w-5 h-5 rounded-md"
                  />
                  <label htmlFor="cocktail">カクテル</label>
                </div>
                <div
                  className={`flex gap-2 items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    false
                      ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    value="4"
                    id="cocktail"
                    onChange={handleChange}
                    data-testid="cocktail"
                    className="data-[state=checked]:bg-brand-blue data-[state=checked]:text-white border border-brand-blue w-5 h-5 rounded-md"
                  />
                  <label htmlFor="cocktail">カクテル</label>
                </div> */}
              </div>
            </div>
          </div>
          <Card data={data} handleOpenModal={handleOpenModal} />
        </div>
        <Footer />
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            selectedData={selectedData!}
          />
        )}
      </div>
    </>
  );
}

export default App;
