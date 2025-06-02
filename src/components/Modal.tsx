import type { Alcohols } from "../domain/Alcohols";

export const Modal = (props: {
  isOpen: boolean;
  onClose: () => void;
  selectedData: Partial<Alcohols>;
}) => {
  const { isOpen, onClose, selectedData } = props;
  if (!isOpen) return null;
  return (
    <div>
      <h2 data-testid="modal_title">モーダル</h2>
      <button onClick={onClose} data-testid="modal_close">
        閉じる
      </button>
      <table>
        <tbody>
          <tr>
            <td>名前</td>
            <td data-testid="modal_sake_name">{selectedData.sake_name}</td>
          </tr>
          <tr>
            <td>ジャンル</td>
            <td data-testid="modal_alcohol_genres">
              {selectedData.alcohol_genres?.genre_name}
            </td>
          </tr>
          <tr>
            <td>メーカー</td>
            <td data-testid="modal_manufacturers">
              {selectedData.manufacturers?.manufacturer_name}
            </td>
          </tr>
          <tr>
            <td>添加物有無</td>
            <td data-testid="modal_has_additives">
              {selectedData.has_additives ? "添加物あり" : "添加物なし"}
            </td>
          </tr>
          <tr>
            <td>原材料</td>
            <td data-testid="modal_ingredients_text">
              {selectedData.description}
              {selectedData.ingredients_text}
            </td>
          </tr>
          <tr>
            <td>添加物</td>
            <td data-testid="modal_additives_text">
              {selectedData.additives_text}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
