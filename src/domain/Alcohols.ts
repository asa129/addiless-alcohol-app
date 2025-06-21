export class Alcohols {
  constructor(
    public id: number | undefined,
    public sake_name: string | undefined,
    public sake_name_kana: string | undefined,
    public genre_id: number | undefined,
    public manufacturer_id: number | undefined,
    public image_url: string | null | undefined,
    public description: string | null | undefined,
    public ingredients_text: string | undefined,
    public has_additives: boolean | undefined,
    public is_active: boolean | undefined,
    public created_at: string | undefined,
    public updated_at: string | undefined,
    public alcohol_genres: {
      genre_name: string | undefined;
    },
    public manufacturers: {
      manufacturer_name: string | undefined;
    },
    public additives_text: string | undefined,
    public alcohol_percentage: number | undefined,
    public calories: number | undefined,
    public carbohydrates: string | undefined,
    public alcohol_details: {
      drinking_methods: string | undefined;
      cocktail_recipes: string | undefined;
      recommended_snacks: string | undefined;
    }
  ) {}
}
