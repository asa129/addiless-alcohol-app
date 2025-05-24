import { supabase } from "./supabase";
import { Alcohols } from "../domain/Alcohols.ts";

export const getAllData: () => Promise<Partial<Alcohols>[]> = async () => {
  const { data, error } = await supabase.from("alcohols").select();

  if (error) {
    throw new Error(error.message);
  }

  const alcohols = data?.map((data: Partial<Alcohols>) => {
    return new Alcohols(
      data.id,
      data.sake_name,
      data.sake_name_kana,
      data.genre_id,
      data.manufacturer_id,
      data.image_url,
      data.description,
      data.ingredients_text,
      data.has_additives,
      data.is_active,
      data.created_at,
      data.updated_at
    );
  });

  return alcohols;
};
