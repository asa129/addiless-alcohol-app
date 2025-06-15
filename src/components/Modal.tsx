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
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-gray">
            <div className="p-8 border-b border-brand-gray-light relative bg-gradient-to-r from-brand-blue-light/30 to-white">
              <div className="flex items-start space-x-6">
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border border-brand-gray flex-shrink-0 shadow-lg">
                  <img
                    src={selectedData.image_url!}
                    className="absolute top-0 left-0 w-full h-full object-contain bg-white p-2"
                  />
                </div>
                <div data-testid="modal_title" className="flex-grow">
                  <div
                    data-testid="modal_sake_name"
                    className="text-2xl md:text-3xl font-bold text-brand-navy-dark jp-text leading-tight mb-2"
                  >
                    {selectedData.sake_name}
                  </div>
                  <div
                    data-testid="modal_alcohol_genres"
                    // data-testid="modal_manufacturers"
                    className="text-brand-navy jp-text mt-2 text-lg font-medium"
                  >
                    {selectedData.manufacturers?.manufacturer_name} -{" "}
                    {selectedData.alcohol_genres?.genre_name}
                  </div>
                  <div
                    className={`mt-4 text-base px-4 py-2 rounded-xl font-bold jp-text shadow-lg inline-flex items-center ${
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
                        <CiWarning className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                      ) : (
                        <BsCheck2Circle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                      )}
                      {selectedData.has_additives ? "添加物あり" : "添加物なし"}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                data-testid="modal_close"
                className="absolute top-4 right-4 p-2 hover:bg-brand-gray-light hover:text-brand-blue text-brand-navy-dark rounded-xl jp-text font-semibold text-base h-12   transition-all duration-300"
              >
                <IoCloseCircleOutline className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
              <div data-testid="modal_ingredients_text">
                <h3 className="text-xl font-bold text-brand-navy-dark mb-4 flex items-center jp-text">
                  <CiCircleInfo className="h-6 w-6 mr-3 text-brand-navy" />
                  原材料
                </h3>
                <div className="bg-brand-blue-light/10 rounded-xl p-6 border border-brand-gray-light">
                  <p className="text-brand-navy whitespace-pre-wrap jp-text text-base leading-relaxed">
                    {selectedData.ingredients_text || "情報なし"}
                  </p>
                </div>
              </div>

              <div data-testid="modal_ingredients_text">
                <h3 className="text-xl font-bold text-brand-navy-dark mb-4 flex items-center jp-text">
                  <GiMedicines className="h-6 w-6 mr-3 text-brand-navy" />
                  添加物
                </h3>
                <div
                  data-testid="modal_additives_text"
                  className="bg-brand-blue-light/10 rounded-xl p-6 border border-brand-gray-light"
                >
                  <p className="text-brand-navy whitespace-pre-wrap jp-text text-base leading-relaxed">
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
