export async function GET() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
    };

    const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);

    const data = await res.json();

    // Get first 6 movies only
    data.results = data.results.slice(0, 6);

    return Response.json(data);
}
