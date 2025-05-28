export const Modal = (props: { isOpen: boolean; onClose: () => void }) => {
  const { isOpen, onClose } = props;
  if (!isOpen) return null;
  return (
    <div>
      <h2>モーダル</h2>
      <button onClick={onClose}>閉じる</button>
    </div>
  );
};
