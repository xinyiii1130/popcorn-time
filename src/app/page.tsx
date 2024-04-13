'use client';

import HomeHeader from '@/components/HomeHeader';
import MovieList from '@/components/MovieList';
import { SingleMovieProvider } from '@/providers/SingleMovieContext';

export default function HomePage() {
    return (
        <main className="min-h-screen">
            <HomeHeader />
            <SingleMovieProvider>
                <MovieList />
            </SingleMovieProvider>
        </main>
    );
}
