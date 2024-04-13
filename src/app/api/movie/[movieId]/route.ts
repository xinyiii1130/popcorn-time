export async function GET(request: Request, { params }: { params: { movieId: string } }) {
    const { movieId } = params;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
    };

    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`, options);
    const data = await res.json();

    return Response.json(data);
}
