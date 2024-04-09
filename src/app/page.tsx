'use client';

import HomeHeader from '@/components/HomeHeader';
import MovieList from '@/components/MovieList';

export default function HomePage() {
    return (
        <main className="min-h-screen">
            <HomeHeader />
            <MovieList />
        </main>
    );
}
