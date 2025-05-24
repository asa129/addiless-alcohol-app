export class Alchols {
    constructor(
        public id: number,
        public sake_name: string,
        public genre_id: number,
        public manufacturer_id: number,
        public image_url: string,
        public description: string,
        public ingredients_text: string,
        public has_additives: boolean,
        public is_active: boolean,
        public created_at: string,
        public updated_at: string,
    ){}
}