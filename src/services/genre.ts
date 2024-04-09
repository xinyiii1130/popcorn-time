import { axiosInstance } from '@/config/services';
import { Genre } from '@/types/genre';

export const getAllMovieGenres = async () => {
    return axiosInstance.get<{
        genres: Genre[];
    }>('/api/genres');
};
