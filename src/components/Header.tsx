import { BiDrink } from "react-icons/bi";

export const Header = (props: {
  onClickData: () => Promise<void>;
  setIsDetailedFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleReset: () => void;
}) => {
  const { onClickData, setIsDetailedFilterOpen, handleReset } = props;
  return (
    <header className="py-4 md:py-12 bg-brand-blue-light shadow-lg">
      <div className="container mx-auto px-0 md:px-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center gap-4 mb-3 sm:mb-0">
          <div className="p-3 bg-white/50 rounded-xl backdrop-blur-sm border border-white/70">
            <BiDrink className="h-8 w-8 text-brand-navy-dark" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-brand-navy-dark tracking-tight font-jp"
            onClick={() => {
              onClickData();
              setIsDetailedFilterOpen(false);
              handleReset();
            }}
          >
            AddiLess
          </h1>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-lg text-brand-navy font-jp font-medium">
            添加物チェッカー
          </p>
          <p className="text-sm text-brand-navy-light font-jp mt-1">
            成分表示でお酒を検索
          </p>
        </div>
      </div>
    </header>
  );
};
