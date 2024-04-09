export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('page');
    const genre = searchParams.get('genre');

    console.log('page', page);
    console.log('genre', genre);

    if (!page) {
        return Response.error();
    }

    const apiSecondPage = Math.ceil((parseInt(page) / 2) * 3);
    const apiFirstPage = apiSecondPage - 1;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
    };

    const res1 = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${apiFirstPage}${genre ? `&with_genres=${genre}` : ''}`,
        options,
    );

    const res2 = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${apiSecondPage}${genre ? `&with_genres=${genre}` : ''}`,
        options,
    );

    const data1 = await res1.json();
    const data2 = await res2.json();

    const joinNextPage = apiFirstPage % 2 !== 0;

    const returnData = {
        results: [...(joinNextPage ? data1.results : data1.results.slice(-10)), ...(joinNextPage ? data2.results.slice(0, 10) : data2.results)],
        total_results: data1.total_results > 100 * 30 ? 100 * 30 : data1.total_results,
    };

    return Response.json(returnData);
}
