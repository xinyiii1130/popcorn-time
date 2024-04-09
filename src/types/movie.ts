export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    backdrop_path: string;
    poster_path: string;
}

export interface MovieQuery {
    page: number;
    genre?: number;
}
