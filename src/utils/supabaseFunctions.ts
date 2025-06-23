import { supabase } from "./supabase";
import { Alcohols } from "../domain/Alcohols.ts";
import type { AdditivesSearch } from "../domain/AdditivesSearch.ts";

export const getAllData: () => Promise<Partial<Alcohols>[]> = async () => {
  const { data, error } = await supabase
    .from("alcohols")
    .select(
      "* , alcohol_genres(genre_name) , manufacturers(manufacturer_name), alcohol_details(drinking_methods, cocktail_recipes, recommended_snacks)"
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
      data.additives_text,
      data.alcohol_percentage,
      data.calories,
      data.carbohydrates,
      {
        drinking_methods: data.alcohol_details?.drinking_methods,
        cocktail_recipes: data.alcohol_details?.cocktail_recipes,
        recommended_snacks: data.alcohol_details?.recommended_snacks,
      }
    );
  });

  return alcohols;
};

export const searchData: (
  props: AdditivesSearch
) => Promise<Partial<Alcohols>[]> = async (props) => {
  const { additives, additivesWord, have_additives, sake_name, maker } = props;
  let query = supabase
    .from("alcohols")
    .select(
      "* , alcohol_genres(genre_name) , manufacturers(manufacturer_name)"
    );

  if (additives) {
    query = query.like(`additives_text`, `%${additives}%`);
  }

  if (additivesWord) {
    query = query.like(`additives_text`, `%${additivesWord}%`);
  }

  if (have_additives !== undefined && have_additives !== "") {
    query = query.eq(`has_additives`, have_additives === "1");
  }

  if (sake_name) {
    query = query.like(`sake_name`, `%${sake_name}%`);
  }

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
      data.additives_text,
      data.alcohol_percentage,
      data.calories,
      data.carbohydrates,
      {
        drinking_methods: data.alcohol_details?.drinking_methods,
        cocktail_recipes: data.alcohol_details?.cocktail_recipes,
        recommended_snacks: data.alcohol_details?.recommended_snacks,
      }
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
      data.additives_text,
      data.alcohol_percentage,
      data.calories,
      data.carbohydrates,
      {
        drinking_methods: data.alcohol_details?.drinking_methods,
        cocktail_recipes: data.alcohol_details?.cocktail_recipes,
        recommended_snacks: data.alcohol_details?.recommended_snacks,
      }
    );
  });
  return alcohols;
};

export const insertAlcoholData = async (data: Partial<Alcohols>[]) => {
  console.log(data);
  const { data: insertData, error } = await supabase
    .from("alcohols")
    .insert(data)
    .select();

  if (error) {
    throw new Error(`Insert error: ${error.message}`);
  }
  return insertData;
};

export const insertAlcoholDetails = async (data: object) => {
  const { data: detailsData, error } = await supabase
    .from("alcohol_details")
    .upsert(data)
    .select("id")
    .single();

  if (error) {
    throw new Error(`Insert error: ${error.message}`);
  }

  // 取得したIDをdetails_idに更新
  const { error: updateError } = await supabase
    .from("alcohols")
    .update({ details_id: detailsData.id })
    .eq("id", detailsData.id);

  if (updateError) {
    throw new Error(`Update error: ${updateError.message}`);
  }
};
