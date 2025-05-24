import { supabase } from './supabase'

export const getAllData = async () => {
    const { data, error } = await supabase.from('alcohols').select();

    if (error) {
        throw new Error(error.message);
    }
    return data;
}