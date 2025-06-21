import { useForm, type SubmitHandler } from "react-hook-form";
import type { AdditivesSearch } from "../domain/AdditivesSearch";

export const useSearchForm = (
  additivesSearch: (formData: AdditivesSearch) => Promise<void>
) => {
  const { handleSubmit, register, setValue, resetField } =
    useForm<AdditivesSearch>();

  const onAdditivesSubmit: SubmitHandler<AdditivesSearch> = (formData) => {
    if (formData.have_additives === "0") {
      formData.additives = "";
      formData.additivesWord = "";
    }
    additivesSearch(formData);
  };

  const handleReset = (have_additives_rest: boolean) => {
    resetField("sake_name");
    if (have_additives_rest) {
      setValue("have_additives", "");
    }
    resetField("additives");
    resetField("additivesWord");
    resetField("maker");
  };

  return {
    handleSubmit,
    register,
    setValue,
    resetField,
    onAdditivesSubmit,
    handleReset,
  };
};
