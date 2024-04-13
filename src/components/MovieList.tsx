import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Pagination, Spin } from 'antd';
import { defaultSortOption } from '@/data/sortingOptions';
import { useSingleMovieContext } from '@/providers/SingleMovieContext';
import { getMovies } from '@/services/movie';
import { RatingObject } from '@/types/rating';
import { SortBy } from '@/types/sortBy';
import Filter from './Filter';

const MovieList: React.FC = () => {
    const [genre, setGenre] = useState<number | undefined>(undefined);
    const [sortBy, setSortBy] = useState<SortBy>(defaultSortOption);
    const [rating, setRating] = useState<number[]>([0, 10]);
    const [page, setPage] = useState<number>(1);

    const { setOpen, setMovieId } = useSingleMovieContext();

    const { data, isFetching } = useQuery({
        queryKey: ['movie', 'list', genre, page, sortBy, rating],
        queryFn: async () => {
            const rate: RatingObject = {
                from: rating[0],
                to: rating[1],
            };

            const res = await getMovies({ page, genre, sortBy, rate });

            return res.data;
        },
    });

    return (
        <div className="p-6">
            <div className="max-w-screen-xl mx-auto">
                <div className="mt-2 mb-6">
                    <Filter genre={genre} setGenre={setGenre} sortBy={sortBy} setSortBy={setSortBy} rating={rating} setRating={setRating} />
                </div>
                <Spin spinning={isFetching}>
                    <div className="grid grid-cols-1 grid-flow-row gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center items-center">
                        {data?.results.map((movie) => (
                            <div
                                key={movie.id}
                                className="w-auto h-auto flex justify-center rounded-xl"
                                onClick={() => {
                                    setOpen(true);
                                    setMovieId(movie.id);
                                }}
                            >
                                {/* When hover image, image blurred lower part, a div with information slide up from bottom */}
                                <div className="relative w-full h-full group overflow-hidden">
                                    <img
                                        className="object-cover rounded-xl w-full h-full cursor-pointer group-hover:blur-[1.5px] aspect-[2/3]"
                                        src={
                                            movie.poster_path
                                                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                                : `https://via.placeholder.com/1920x1080?text=${movie.title}`
                                        }
                                        loading="lazy"
                                    />
                                    <div className="group-hover:bottom-0 transition-[bottom] duration-200 absolute inset-x-0 -bottom-full p-4 bg-black bg-opacity-70 rounded-b-xl">
                                        <h1 className="text-white text-lg font-semibold">{movie.title}</h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-4">
                        <Pagination
                            showQuickJumper
                            pageSize={30}
                            pageSizeOptions={[]}
                            total={data?.total_results}
                            onChange={(page: number) => {
                                setPage(page);
                            }}
                        />
                    </div>
                </Spin>
            </div>
        </div>
    );
};

export default MovieList;
