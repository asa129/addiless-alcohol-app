import { CiWarning } from "react-icons/ci";
import { BsCheck2Circle } from "react-icons/bs";
import { BiMessageSquareDetail } from "react-icons/bi";
import { LuSearchX } from "react-icons/lu";
import type { Alcohols } from "../domain/Alcohols";
import { GiMedicines } from "react-icons/gi";

export const Card = (props: {
  data: Partial<Alcohols>[] | undefined;
  handleOpenModal: (data: Partial<Alcohols>) => void;
}) => {
  const { data, handleOpenModal } = props;
  return (
    <>
      {data && data.length === 0 ? (
        <div className="text-center py-12">
          <LuSearchX className="mx-auto h-16 w-16 text-brand-gray-dark mb-4" />
          <h3 className="text-xl font-semibold text-brand-navy-dark jp-text mb-2">
            検索結果がありません
          </h3>
          <p className="text-brand-gray-dark jp-text">
            検索条件を変更してお試しください。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {data &&
            data.map((data) => {
              return (
                <div key={data.id} className="h-full">
                  <div className="w-full h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border border-brand-gray bg-white flex flex-col group hover:scale-105">
                    <div className="relative">
                      <div className="aspect-[3/2] w-full relative overflow-hidden rounded-t-2xl">
                        <img
                          src={data.image_url!}
                          alt={data.sake_name}
                          data-testid="sake_image"
                          className="absolute top-0 left-0 w-full h-full object-contain bg-brand-blue-light/20 p-4 group-hover:scale-110 transition-transform duration-300"
                        />

                        <div
                          className={`absolute top-4 right-4 text-sm px-3 py-2 rounded-full font-bold jp-text shadow-lg ${
                            data.has_additives
                              ? "bg-brand-teal-light text-brand-teal-dark border border-brand-teal"
                              : "bg-brand-blue-light text-brand-blue-dark border border-brand-blue"
                          }`}
                        >
                          <div
                            className="flex items-center justify-center"
                            data-testid="sake_additives"
                          >
                            {data.has_additives ? (
                              <CiWarning className="h-4 w-4 mr-1.5" />
                            ) : (
                              <BsCheck2Circle className="h-4 w-4 mr-1.5" />
                            )}
                            {data.has_additives ? "添加物あり" : "添加物なし"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <div className="mb-4">
                        <h2
                          data-testid="sake_name"
                          className="text-xl font-bold text-brand-navy-dark mb-2 jp-text leading-tight line-clamp-2"
                        >
                          {data.sake_name}
                        </h2>
                        <p className="text-base text-brand-navy jp-text font-medium">
                          {data.manufacturers?.manufacturer_name}
                        </p>
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-base font-bold text-brand-navy-dark mb-2 flex items-center jp-text">
                          <GiMedicines className="h-4 w-4 mr-2 text-brand-navy" />
                          添加物
                        </h3>
                        <p
                          data-testid="modal_additives_text"
                          className="text-sm text-brand-navy jp-text leading-relaxed"
                        >
                          {data.additives_text || "情報なし"}
                        </p>
                      </div>
                    </div>

                    {/* ボタンセクション */}
                    <div className="p-6 pt-0">
                      <button
                        onClick={() => handleOpenModal(data)}
                        data-testid="sake_detail"
                        className="w-full flex items-center justify-center py-3 text-brand-blue border border-brand-blue hover:bg-brand-blue hover:text-brand-navy-dark rounded-xl transition-all duration-300 jp-text font-semibold shadow-md hover:shadow-lg"
                      >
                        <BiMessageSquareDetail className="mr-2 h-5 w-5" />
                        詳細
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};
