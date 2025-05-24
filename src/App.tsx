import { getAllData } from "./utils/supabaseFunctions.ts";
import { useEffect, useState } from "react";
import type { Alcohols } from "./domain/Alcohols.ts";

function App() {
  const [data, setData] = useState<Partial<Alcohols>[]>();
  const getData = async () => {
    const data = await getAllData();
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>成分表示でお酒を検索</h1>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th>名前</th>
            <th>画像</th>
            <th>添加物あり・なし</th>
          </tr>
          {data &&
            data.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.sake_name}</td>
                  <td>
                    <img src={data.image_url!} alt={data.sake_name} />
                  </td>
                  <td>{data.has_additives ? "あり" : "なし"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default App;
