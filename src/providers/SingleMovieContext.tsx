import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Descriptions, DescriptionsProps, Modal, Space, Spin, Tag } from 'antd';
import { getMovieById } from '@/services/movie';

interface SingleMovieContextProps {
    setMovieId: Dispatch<SetStateAction<number | null>>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SingleMovieContext = createContext<SingleMovieContextProps | null>(null);

interface SingleMovieProviderProps extends PropsWithChildren {}

export const SingleMovieProvider: React.FC<SingleMovieProviderProps> = ({ children }) => {
    const [movieId, setMovieId] = useState<number | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const { isFetching, data } = useQuery({
        queryKey: ['movie', movieId],
        enabled: !!movieId && open,
        queryFn: async () => {
            const res = await getMovieById(movieId as number);
            console.log(res.data);
            return res.data;
        },
    });

    const movieDescriptionItems: DescriptionsProps['items'] = [
        {
            key: 'overview',
            label: 'Overview',
            children: data?.overview && data.overview.trim() === '' ? '-' : data?.overview,
        },
        {
            key: 'release_date',
            label: 'Release Date',
            children: data?.release_date && data.release_date.trim() === '' ? '-' : data?.release_date,
        },
        {
            key: 'genre',
            label: 'Genre',
            children: (
                <Space className="flex flex-wrap">
                    {data?.genres && data.genres.length > 0
                        ? data.genres.map((genre) => (
                              <Tag key={genre.id} color="blue">
                                  {genre.name}
                              </Tag>
                          ))
                        : '-'}
                </Space>
            ),
        },
        {
            key: 'vote_average',
            label: 'Rating',
            children: data?.vote_average ?? '-',
        },
        {
            key: 'casting',
            label: 'Casting',
            children:
                data?.credits.cast && data.credits.cast.length > 0
                    ? data?.credits.cast.slice(0, 5).map((cast) => (
                          <div key={cast.id}>
                              {cast.name} ({cast.character.trim() === '' ? '-' : cast.character})
                          </div>
                      ))
                    : '-',
        },
    ];

    return (
        <SingleMovieContext.Provider value={{ setMovieId, open, setOpen }}>
            {children}
            <Modal
                open={open}
                title={data ? data.title : 'loading...'}
                footer={null}
                onCancel={() => {
                    setOpen(false);
                    setMovieId(null);
                }}
                className="min-w-[500px]"
                classNames={{
                    mask: 'w-screen h-screen !bg-[#00000026] backdrop-blur backdrop-saturate-150',
                }}
            >
                <Spin spinning={isFetching}>
                    <img
                        src={
                            data?.backdrop_path
                                ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
                                : `https://via.placeholder.com/1920x1080?text=${data?.title}`
                        }
                        className="aspect-[16/9] w-full object-cover rounded-md"
                    />
                    <Descriptions items={movieDescriptionItems} column={1} bordered className="mt-4" />
                </Spin>
            </Modal>
        </SingleMovieContext.Provider>
    );
};

export const useSingleMovieContext = () => {
    const context = useContext(SingleMovieContext);

    if (!context) {
        throw new Error('useSingleMovieContext must be used within Provider');
    }

    return context;
};
