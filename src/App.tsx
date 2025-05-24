import {getAllData} from "./utils/supabaseFunctions.ts";

function App() {

   const getData = async() => {
       const data = await getAllData();
       console.log(data);
   }
   getData();
  return (
    <>
      <h1>成分表示でお酒を検索</h1>
    </>
  );
}

export default App;
