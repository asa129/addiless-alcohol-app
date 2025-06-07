import { supabase } from "./supabase";
import { Alcohols } from "../domain/Alcohols.ts";
import type { AdditivesSearch } from "../domain/AdditivesSearch.ts";

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
      { manufacturer_name: data.manufacturers?.manufacturer_name },
      data.additives_text
    );
  });

  return alcohols;
};

export const searchData: (
  props: AdditivesSearch
) => Promise<Partial<Alcohols>[]> = async (props) => {
  const { additives, additivesWord, have_additives } = props;
  const { data, error } = await supabase
    .from("alcohols")
    .select("* , alcohol_genres(genre_name) , manufacturers(manufacturer_name)")
    .like(`additives_text`, `%${additives}%`)
    .like(`additives_text`, `%${additivesWord}%`)
    .eq(`has_additives`, `${have_additives === "1"}`);

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
      { manufacturer_name: data.manufacturers?.manufacturer_name },
      data.additives_text
    );
  });

  return alcohols;
};

export const getDataByAlcohols: (
  props: AdditivesSearch
) => Promise<Partial<Alcohols>[]> = async (props) => {
  const { sake_name, maker } = props;
  let query = supabase
    .from("alcohols")
    .select("* , alcohol_genres(genre_name) , manufacturers(manufacturer_name)")
    .like(`sake_name`, `%${sake_name}%`);

  if (maker) {
    query = query.eq(`manufacturer_id`, `${maker}`);
  }
  const { data, error } = await query;
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
      { manufacturer_name: data.manufacturers?.manufacturer_name },
      data.additives_text
    );
  });
  return alcohols;
};

export const getDataByGenres: (
  props: string[]
) => Promise<Partial<Alcohols>[]> = async (genreId: string[]) => {
  const { data, error } = await supabase
    .from("alcohols")
    .select("* , alcohol_genres(genre_name) , manufacturers(manufacturer_name)")
    .in("genre_id", genreId);

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
      { manufacturer_name: data.manufacturers?.manufacturer_name },
      data.additives_text
    );
  });
  return alcohols;
};
