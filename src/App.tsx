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
import { CategoryFilter } from "./components/CategoryFilter.tsx";

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
    handleReset(false);
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

  const handleReset = (have_additives_rest: boolean) => {
    resetField("sake_name");
    if (have_additives_rest) {
      setValue("have_additives", "");
    }
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
          handleReset={() => handleReset(true)}
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
            handleReset={() => handleReset(true)}
          />
          <CategoryFilter handleChange={handleChange} genreId={genreId} />
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
