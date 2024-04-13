import { Dispatch, SetStateAction } from 'react';
import { Button } from 'antd';
import { SortBy } from '@/types/sortBy';
import Genre from './filter/Genre';
import Rating from './filter/Rating';
import SortByFilter from './filter/SortBy';

interface FilterProps {
    genre: number | undefined;
    setGenre: Dispatch<SetStateAction<number | undefined>>;
    sortBy: SortBy;
    setSortBy: Dispatch<SetStateAction<SortBy>>;
    rating: number[];
    setRating: Dispatch<SetStateAction<number[]>>;
}

const Filter: React.FC<FilterProps> = ({ genre, setGenre, sortBy, setSortBy, rating, setRating }) => {
    return (
        <div className="bg-slate-100 rounded-md p-6">
            <Genre genre={genre} setGenre={setGenre} />
            <Rating rating={rating} setRating={setRating} />
            <SortByFilter sortBy={sortBy} setSortBy={setSortBy} />
            <div className="mt-4 flex justify-end">
                <Button
                    type="primary"
                    className="bg-yellow-300 hover:!bg-yellow-200 !text-black font-bold"
                    onClick={() => {
                        setGenre(undefined);
                        setSortBy({ value: 'popularity.desc', order: 'desc', label: 'Popularity' });
                        setRating([0, 10]);
                    }}
                >
                    Clear Filter
                </Button>
            </div>
        </div>
    );
};

export default Filter;
