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
      <p data-testid="modal_sake_name">{selectedData.sake_name}</p>
      <p data-testid="modal_alcohol_genres">
        {selectedData.alcohol_genres?.genre_name}
      </p>
      <p data-testid="modal_manufacturers">
        {selectedData.manufacturers?.manufacturer_name}
      </p>
      <p data-testid="modal_has_additives">
        {selectedData.has_additives ? "添加物あり" : "添加物なし"}
      </p>
      <p data-testid="modal_description">{selectedData.description}</p>
      <p data-testid="modal_ingredients_text">
        {selectedData.ingredients_text}
      </p>
    </div>
  );
};
