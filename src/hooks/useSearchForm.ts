import { useForm, type SubmitHandler } from "react-hook-form";
import type { AdditivesSearch } from "../domain/AdditivesSearch";
import { useRef } from "react";

export const useSearchForm = (
  additivesSearch: (formData: AdditivesSearch) => Promise<void>
) => {
  const { handleSubmit, register, setValue, resetField } =
    useForm<AdditivesSearch>();
  const cardListRef = useRef<HTMLDivElement>(null);

  const onAdditivesSubmit: SubmitHandler<AdditivesSearch> = (formData) => {
    if (formData.have_additives === "0") {
      formData.additives = "";
      formData.additivesWord = "";
    }
    additivesSearch(formData);
    cardListRef.current?.scrollIntoView({ behavior: "smooth" });
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
    cardListRef,
  };
};
