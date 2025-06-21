export const CategoryFilter = (props: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  genreId: string[];
}) => {
  const { handleChange, genreId } = props;
  return (
    <div className="mb-10 md:mb-12">
      <div data-testid="select_genres" className="space-y-4">
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <div
            className={`flex gap-2 items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer min-w-fit ${
              genreId.includes("2")
                ? "bg-brand-blue text-white shadow-md"
                : "bg-white hover:bg-brand-blue hover:text-white border"
            }`}
          >
            <input
              type="checkbox"
              value="2"
              id="chuhai"
              onChange={handleChange}
              checked={genreId.includes("2")}
              data-testid="chuhai"
              className="w-4 h-4 rounded border-2 border-current accent-current"
            />
            <label htmlFor="chuhai" className="cursor-pointer">
              チューハイ
            </label>
          </div>
          <div
            className={`flex gap-2 items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              genreId.includes("4")
                ? "bg-brand-blue text-white shadow-md"
                : "bg-white hover:bg-brand-blue hover:text-white border"
            }`}
          >
            <input
              type="checkbox"
              value="4"
              id="cocktail"
              onChange={handleChange}
              checked={genreId.includes("4")}
              data-testid="cocktail"
              className="w-4 h-4 rounded border-2 border-current accent-current"
            />
            <label htmlFor="cocktail" className="cursor-pointer">
              カクテル
            </label>
          </div>
          {/* <div
                  className={`flex gap-2 items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    false
                      ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    value="4"
                    id="cocktail"
                    onChange={handleChange}
                    data-testid="cocktail"
                    className="data-[state=checked]:bg-brand-blue data-[state=checked]:text-white border border-brand-blue w-5 h-5 rounded-md"
                  />
                  <label htmlFor="cocktail">カクテル</label>
                </div>
                <div
                  className={`flex gap-2 items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    false
                      ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    value="4"
                    id="cocktail"
                    onChange={handleChange}
                    data-testid="cocktail"
                    className="data-[state=checked]:bg-brand-blue data-[state=checked]:text-white border border-brand-blue w-5 h-5 rounded-md"
                  />
                  <label htmlFor="cocktail">カクテル</label>
                </div>
                <div
                  className={`flex gap-2 items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    false
                      ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    value="4"
                    id="cocktail"
                    onChange={handleChange}
                    data-testid="cocktail"
                    className="data-[state=checked]:bg-brand-blue data-[state=checked]:text-white border border-brand-blue w-5 h-5 rounded-md"
                  />
                  <label htmlFor="cocktail">カクテル</label>
                </div>
                <div
                  className={`flex gap-2 items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    false
                      ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    value="4"
                    id="cocktail"
                    onChange={handleChange}
                    data-testid="cocktail"
                    className="data-[state=checked]:bg-brand-blue data-[state=checked]:text-white border border-brand-blue w-5 h-5 rounded-md"
                  />
                  <label htmlFor="cocktail">カクテル</label>
                </div> */}
        </div>
      </div>
    </div>
  );
};
