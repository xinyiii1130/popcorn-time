export async function GET() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
    };

    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);

    const data = await res.json();

    return Response.json(data);
}
