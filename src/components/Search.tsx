import { CiSearch } from "react-icons/ci";
import { TbListDetails } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa6";
import { RiResetLeftFill } from "react-icons/ri";
import { useState } from "react";
import type { AdditivesSearch } from "../domain/AdditivesSearch";
import { IoMdClose } from "react-icons/io";
import type {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form";

export const Search = (props: {
  getData: () => Promise<void>;
  additivesSearch: (formData: AdditivesSearch) => Promise<void>;
  isDetailedFilterOpen: boolean;
  setIsDetailedFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<AdditivesSearch, AdditivesSearch>;
  register: UseFormRegister<AdditivesSearch>;
  setValue: UseFormSetValue<AdditivesSearch>;
  resetField: UseFormResetField<AdditivesSearch>;
  onAdditivesSubmit: SubmitHandler<AdditivesSearch>;
  handleReset: () => void;
}) => {
  const {
    getData,
    isDetailedFilterOpen,
    setIsDetailedFilterOpen,
    handleSubmit,
    register,
    setValue,
    resetField,
    onAdditivesSubmit,
    handleReset,
  } = props;
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="mb-10 md:mb-12">
      {/* Main Search Card */}
      <div className="shadow-xl border border-brand-gray bg-white rounded-2xl overflow-hidden">
        <div className="p-8 text-center">
          <h2
            className="text-2xl md:text-4xl font-bold text-brand-navy-dark jp-text mb-2"
            data-testid="title"
            onClick={() => {
              getData();
              setIsDetailedFilterOpen(false);
              handleReset();
            }}
          >
            成分表示でお酒を検索
          </h2>

          <p className="text-brand-navy jp-text text-sm md:text-lg">
            アレルギーや体質に合わせて、あなたにぴったりのお酒を見つけましょう
          </p>
        </div>
        <div className="p-8 pt-0 flex flex-col items-center">
          <form
            onSubmit={handleSubmit(onAdditivesSubmit)}
            className="w-full space-y-6"
          >
            <div className="relative w-full">
              <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark" />
              <input
                type="text"
                placeholder="お酒の名前で検索"
                id="sake_name"
                {...register("sake_name")}
                data-testid="search_sake_name"
                className="w-full pl-12 pr-4 py-3 bg-brand-cream-dark border border-brand-gray rounded-xl text-base h-14 shadow-sm placeholder:text-brand-gray-dark focus:ring-brand-blue focus:border-brand-blue"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={() => resetField("sake_name")}
              >
                <IoMdClose className="h-5 w-5 text-brand-gray-dark" />
              </button>
            </div>
            <div className="space-y-4 pt-2">
              <div className="text-center">
                <label className="block text-base font-semibold text-brand-navy-dark jp-text mb-4">
                  添加物
                </label>
                <div className="flex items-center justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("have_additives")}
                      value="1"
                      id="have_additives"
                      data-testid="have_additives"
                      onClick={() => {
                        setDisabled(false);
                      }}
                      className="text-brand-blue border border-brand-blue focus:ring-brand-blue w-5 h-5"
                    />
                    <label
                      htmlFor="have_additives"
                      className="font-medium text-brand-navy jp-text text-base cursor-pointer"
                    >
                      あり
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("have_additives")}
                      value="0"
                      onClick={() => {
                        setValue("additives", "");
                        setValue("additivesWord", "");
                        setDisabled(true);
                      }}
                      id="not_have_additives"
                      data-testid="not_have_additives"
                      className="text-brand-blue border border-brand-blue focus:ring-brand-blue w-5 h-5"
                    />
                    <label
                      htmlFor="not_have_additives"
                      className="font-medium text-brand-navy jp-text text-base cursor-pointer"
                    >
                      なし
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("have_additives")}
                      value=""
                      onClick={() => {
                        setDisabled(false);
                      }}
                      defaultChecked
                      id="not_specified_additives"
                      data-testid="not_specified_additives"
                      className="text-brand-blue border border-brand-blue focus:ring-brand-blue w-5 h-5"
                    />
                    <label
                      htmlFor="not_specified_additives"
                      className="font-medium text-brand-navy jp-text text-base cursor-pointer"
                    >
                      すべて
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                data-testid="search_button"
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-brand-blue to-brand-teal text-white rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 jp-text text-lg font-semibold h-14 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <CiSearch className="mr-3 h-6 w-6" />
                検索する
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full pt-4">
        <div className="shadow-xl border border-brand-gray bg-white rounded-2xl overflow-hidden">
          <button
            onClick={() => setIsDetailedFilterOpen(!isDetailedFilterOpen)}
            data-testid="detail_filter_button"
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 rounded-2xl transition-colors"
          >
            <div className="flex items-center gap-2">
              <TbListDetails />
              <span className="font-medium text-gray-700">詳細フィルター</span>
            </div>
            <FaChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                isDetailedFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isDetailedFilterOpen && (
            <div className="p-8 space-y-8">
              <div className="space-y-3">
                <label htmlFor="additives">添加物</label>
                <select
                  data-testid="select_additives"
                  id="additives"
                  {...register("additives")}
                  onChange={() => {
                    setValue("have_additives", "1");
                  }}
                  disabled={disabled}
                  className="w-full bg-white border border-brand-gray focus:ring-brand-blue focus:border-brand-blue rounded-xl jp-text text-base h-12 shadow-sm  disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-300"
                >
                  <option value="" className="text-brand-gray-dark">
                    添加物を選んでください
                  </option>
                  <option value="甘味料">人工甘味料</option>
                  <option value="酸味料">酸味料</option>
                  <option value="着色料">着色料</option>
                  <option value="発色剤">発色剤</option>
                  <option value="酸化防止剤">酸化防止剤</option>
                  <option value="香料">香料</option>
                </select>
              </div>
              <div className="space-y-4">
                <label htmlFor="additivesWord">添加物で検索</label>
                <div className="relative w-full">
                  <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray-dark" />
                  <input
                    type="text"
                    id="additivesWord"
                    {...register("additivesWord")}
                    onChange={() => {
                      setValue("have_additives", "1");
                    }}
                    data-testid="additives_word"
                    disabled={disabled}
                    placeholder="添加物名を入力..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-brand-gray focus:ring-brand-blue focus:border-brand-blue rounded-xl jp-text text-base h-12 shadow-sm disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-300"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => resetField("additivesWord")}
                  >
                    <IoMdClose className="h-5 w-5 text-brand-gray-dark" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <label htmlFor="maker">メーカー</label>
                <select
                  id="maker"
                  {...register("maker")}
                  data-testid="maker"
                  className="w-full bg-white border border-brand-gray focus:ring-brand-blue focus:border-brand-blue rounded-xl jp-text text-base h-12 shadow-sm"
                >
                  <option value="">メーカーを選んでください</option>
                  <option value="1">サントリー</option>
                  <option value="2">アサヒ</option>
                  <option value="3">キリン</option>
                  <option value="4">サッポロ</option>
                </select>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleReset}
                  className="border border-brand-teal text-brand-teal-dark hover:bg-brand-teal-light/20 rounded-xl transition-all duration-300 ease-in-out jp-text text-base font-semibold h-12 shadow-lg hover:shadow-xl flex items-center justify-center px-6"
                >
                  <RiResetLeftFill className="mr-3 h-5 w-5" />
                  リセット
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
