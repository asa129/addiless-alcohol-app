import { supabase } from "./supabase";
import { Alcohols } from "../domain/Alcohols.ts";

export const getAllData: () => Promise<Partial<Alcohols>[]> = async () => {
  const { data, error } = await supabase
    .from("alcohols")
    .select(
      "* , alcohol_genres(genre_name) , manufacturers(manufacturer_name)"
    );

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
      data.updated_at,
      { genre_name: data.alcohol_genres?.genre_name },
      { manufacturer_name: data.manufacturers?.manufacturer_name }
    );
  });

  return alcohols;
};

export const searchData: () => Promise<Partial<Alcohols>[]> = async () => {
  const { data, error } = await supabase
    .from("alcohols")
    .select("* , alcohol_genres(genre_name) , manufacturers(manufacturer_name)")
    .like("ingredients_text", "%香料%");

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
      data.updated_at,
      { genre_name: data.alcohol_genres?.genre_name },
      { manufacturer_name: data.manufacturers?.manufacturer_name }
    );
  });

  return alcohols;
};
