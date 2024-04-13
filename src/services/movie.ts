import { axiosInstance } from '@/config/services';
import { Movie, MovieQuery } from '@/types/movie';
import { PaginationResponse } from '@/types/pagination';

export const getPopularMovies = async () => {
    return axiosInstance.get<PaginationResponse<Movie>>('/api/movie/popular');
};

export const getMovies = async (query: MovieQuery) => {
    return axiosInstance.get<PaginationResponse<Movie>>(`/api/movie`, {
        params: query,
    });
};

export const getMovieById = async (movieId: number) => {
    return axiosInstance.get<Movie>(`/api/movie/${movieId}`);
};
