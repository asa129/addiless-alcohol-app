import { getAllData } from "./utils/supabaseFunctions.ts";
import { useEffect, useState } from "react";
import type { Alcohols } from "./domain/Alcohols.ts";
import { Modal } from "./components/Modal.tsx";

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

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1 data-testid="title">成分表示でお酒を検索</h1>
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
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedData={selectedData!}
        />
      )}
    </>
  );
}

export default App;
