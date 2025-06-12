export const Footer = () => {
  return (
    <>
      <footer className="py-6 text-center bg-brand-gray-light border-t border-brand-gray">
        <p className="text-sm text-brand-gray-dark jp-text">
          &copy; {new Date().getFullYear()} AddiLess. All rights reserved.
        </p>
        <p className="text-xs text-brand-gray-dark mt-1 jp-text">
          この情報は参考用です。正確な情報は製品パッケージをご確認ください。
        </p>
      </footer>
    </>
  );
};
