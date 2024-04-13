import { Genre } from './genre';
import { RatingObject } from './rating';
import { SortBy } from './sortBy';

export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    backdrop_path: string;
    poster_path: string;
    genres: Genre[];
    vote_average: number;
    credits: {
        cast: MovieCast[];
    };
}

export interface MovieQuery {
    page: number;
    genre?: number;
    sortBy?: SortBy;
    rate?: RatingObject;
}

export interface MovieCast {
    id: number;
    name: string;
    character: string;
}
