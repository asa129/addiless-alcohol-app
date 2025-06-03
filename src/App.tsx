import { getAllData, searchData } from "./utils/supabaseFunctions.ts";
import { useEffect, useState } from "react";
import type { Alcohols } from "./domain/Alcohols.ts";
import { Modal } from "./components/Modal.tsx";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AdditivesSearch } from "./domain/AdditivesSearch.ts";

function App() {
  const [data, setData] = useState<Partial<Alcohols>[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Partial<Alcohols>>();
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
  const onSubmit: SubmitHandler<AdditivesSearch> = (formData) => {
    if (formData.have_additives === "0") {
      formData.additives = "";
      formData.additivesWord = "";
    }
    aditivesSearch(formData);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1 data-testid="title">成分表示でお酒を検索</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="additives">添加物</label>
            <select
              data-testid="select_additives"
              id="additives"
              {...register("additives")}
              onChange={() => {
                setValue("have_additives", "1");
              }}
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
            />
          </div>
          <div>
            <label>添加物あり/なし</label>
            <input
              type="radio"
              {...register("have_additives")}
              value="1"
              id="have_additives"
              data-testid="have_additives"
            />
            <label htmlFor="have_additives">あり</label>
            <input
              type="radio"
              {...register("have_additives")}
              value="0"
              onClick={() => {
                setValue("additives", "");
                setValue("additivesWord", "");
              }}
              defaultChecked
              id="not_have_additives"
              data-testid="not_have_additives"
            />
            <label htmlFor="not_have_additives">なし</label>
          </div>
          <div>
            <input type="submit" value="検索" data-testid="search_button" />
          </div>
        </form>
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
    </>
  );
}

export default App;
