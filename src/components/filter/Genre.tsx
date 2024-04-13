import { Dispatch, SetStateAction } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllMovieGenres } from '@/services/genre';

interface GenreProps {
    genre: number | undefined;
    setGenre: Dispatch<SetStateAction<number | undefined>>;
}

const Genre: React.FC<GenreProps> = ({ genre, setGenre }) => {
    const { data } = useQuery({
        queryKey: ['genre', 'movie'],
        queryFn: async () => {
            const res = await getAllMovieGenres();
            return res.data.genres;
        },
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });

    return (
        <div>
            <h1 className="mb-2 text-xl font-bold">Genre</h1>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-3 text-sm font-semibold">
                {data?.map((mapGenre) => (
                    <div
                        key={`movieList-${mapGenre.id}`}
                        className={`bg-slate-200 py-2 px-6 rounded-md cursor-pointer hover:bg-yellow-300 transition-colors ${
                            mapGenre.id === genre ? 'bg-yellow-300' : ''
                        }`}
                        onClick={() => {
                            setGenre(mapGenre.id === genre ? undefined : mapGenre.id);
                        }}
                    >
                        {mapGenre.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Genre;
