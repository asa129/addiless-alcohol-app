import { getAllData } from "./utils/supabaseFunctions.ts";
import { useEffect, useState } from "react";
import type { Alcohols } from "./domain/Alcohols.ts";

function App() {
  const [data, setData] = useState<Partial<Alcohols>[]>();
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    const data = await getAllData();
    setData(data);
    setIsLoading(false);
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
                    <a href="" data-testid="sake_detail">
                      詳細
                    </a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default App;
