import { Dispatch, SetStateAction } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { sortingButton, sortingOptions } from '@/data/sortingOptions';
import { SortBy } from '@/types/sortBy';

interface SortByProps {
    sortBy: SortBy;
    setSortBy: Dispatch<SetStateAction<SortBy>>;
}

const SortByFilter: React.FC<SortByProps> = ({ sortBy, setSortBy }) => {
    const handleSortBy = (option: string, order: string) => {
        const sorting = sortingOptions.find((sort) => sort.label === option && sort.order === order);

        setSortBy({ value: sorting!.value, order: sorting!.order, label: sorting!.label });
    };

    return (
        <>
            <h1 className="mt-4 mb-2 text-xl font-bold">Sort By</h1>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-3 text-sm font-semibold">
                {sortingButton?.map((option) => (
                    <div
                        key={`sortOption-${option}`}
                        className={`bg-slate-200 py-2 px-6 rounded-md cursor-pointer hover:bg-yellow-300 transition-colors ${
                            option === sortBy?.label ? 'bg-yellow-300' : ''
                        }`}
                        onClick={() => {
                            handleSortBy(option, sortBy?.label === option ? (sortBy?.order === 'desc' ? 'asc' : 'desc') : 'desc');
                        }}
                    >
                        <div className="flex justify-center items-center gap-1">
                            {option}
                            {sortBy?.label === option && (sortBy.order === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />)}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SortByFilter;
