import { useQuery } from '@tanstack/react-query';
import { Carousel } from 'antd';
import clsx from 'clsx';
import { getPopularMovies } from '@/services/movie';

const HomeHeader: React.FC = () => {
    const { data } = useQuery({
        queryKey: ['movie', 'pagination'],
        queryFn: async () => {
            const res = await getPopularMovies();
            return res.data.results;
        },
    });

    return (
        <section id="home-header" className="min-h-screen">
            <div className="w-full h-screen relative">
                <Carousel autoplay className="relative w-full overflow-hidden h-full">
                    {data?.map((movie, index) => (
                        <div key={`gallery-${index}`} className="relative w-full min-w-[calc(100%)] max-w-[calc(100%)] h-screen">
                            <div className="w-full h-full relative">
                                <div
                                    className={clsx('absolute inset-0 bg-cover bg-center w-full')}
                                    style={{
                                        backgroundImage: `url(${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : `https://via.placeholder.com/1920x1080?text=${movie.title}`})`,
                                    }}
                                ></div>
                                <div className="layout-container flex items-center justify-center h-full">
                                    <div className="flex flex-col items-center justify-between z-10 text-white text-center">
                                        <div className="px-4 title">
                                            <h1 className="text-2xl md:text-5xl font-semibold">{movie.title}</h1>
                                        </div>
                                        <div className="px-8 w-auto max-w-[1000px]">
                                            <h2 className="pt-4 text-sm md:text-base lg:text-lg">{movie.overview}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 opacity-50 bg-black"></div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default HomeHeader;
