import { IoCloseCircleOutline } from "react-icons/io5";
import type { Alcohols } from "../domain/Alcohols";
import { CiCircleInfo, CiWarning } from "react-icons/ci";
import { BsCheck2Circle } from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";

export const Modal = (props: {
  isOpen: boolean;
  onClose: () => void;
  selectedData: Partial<Alcohols>;
}) => {
  const { isOpen, onClose, selectedData } = props;
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      >
        <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-brand-gray">
            <div className="p-4 sm:p-6 md:p-8 border-b border-brand-gray-light relative bg-gradient-to-r from-brand-blue-light/30 to-white">
              <div className="flex flex-col sm:flex-row items-start sm: items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-xl sm:rounded-2xl overflow-hidden border border-brand-gray flex-shrink-0 shadow-lg mx-auto sm:mx-0">
                  <img
                    src={selectedData.image_url!}
                    className="absolute top-0 left-0 w-full h-full object-contain bg-white p-1 sm:p-2"
                  />
                </div>
                <div
                  data-testid="modal_title"
                  className="flex-grow flex flex-col items-center sm:items-start text-center sm:text-left"
                >
                  <div
                    data-testid="modal_sake_name"
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-brand-navy-dark jp-text leading-tight mb-2"
                  >
                    {selectedData.sake_name}
                  </div>
                  <div
                    data-testid="modal_alcohol_genres"
                    className="text-brand-navy jp-text mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-medium"
                  >
                    {selectedData.manufacturers?.manufacturer_name}
                  </div>
                  <div
                    data-testid="modal_manufacturers"
                    className="text-brand-navy jp-text mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-medium"
                  >
                    {selectedData.alcohol_genres?.genre_name}
                  </div>
                  <div
                    className={`mt-3 sm:mt-4 text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold jp-text shadow-lg inline-flex  ${
                      selectedData.has_additives
                        ? "bg-brand-teal-light text-brand-teal-dark border border-brand-teal" // Softer teal for "has additives"
                        : "bg-brand-blue-light text-brand-blue-dark border border-brand-blue" // Muted blue for "no additives"
                    }`}
                  >
                    <div
                      data-testid="modal_has_additives"
                      className="flex items-center justify-center"
                    >
                      {selectedData.has_additives ? (
                        <CiWarning className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1.5 sm:mr-2" />
                      ) : (
                        <BsCheck2Circle className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1.5 sm:mr-2" />
                      )}
                      {selectedData.has_additives ? "添加物あり" : "添加物なし"}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                data-testid="modal_close"
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 hover:bg-brand-gray-light hover:text-brand-blue text-brand-navy-dark rounded-lg sm:rounded-xl jp-text font-semibold text-sm sm:text-base h-8 w-8 sm:h-12 sm:w-12 flex items-center justify-center transition-all duration-300"
              >
                <IoCloseCircleOutline className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
              <div data-testid="modal_ingredients_text">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-brand-navy-dark mb-3 sm:mb-4 flex items-center jp-text">
                  <CiCircleInfo className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2 sm:mr-3 text-brand-navy" />
                  原材料
                </h3>
                <div className="bg-brand-blue-light/10 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-brand-gray-light">
                  <p className="text-brand-navy whitespace-pre-wrap jp-text text-sm sm:text-base leading-relaxed">
                    {selectedData.ingredients_text || "情報なし"}
                  </p>
                </div>
              </div>

              <div data-testid="modal_additives_section">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-brand-navy-dark mb-3 sm:mb-4 flex items-center jp-text">
                  <GiMedicines className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2 sm:mr-3 text-brand-navy" />
                  添加物
                </h3>
                <div
                  data-testid="modal_additives_text"
                  className="bg-brand-blue-light/10 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-brand-gray-light"
                >
                  <p className="text-brand-navy whitespace-pre-wrap jp-text text-sm sm:text-base leading-relaxed">
                    {selectedData.additives_text || "情報なし"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
