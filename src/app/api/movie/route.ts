export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('page');
    const genre = searchParams.get('genre');
    const sortByValue = searchParams.get('sortBy[value]');
    const minRate = searchParams.get('rate[from]');
    const maxRate = searchParams.get('rate[to]');

    if (!page || !sortByValue) {
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

    // Fetch only movie release date in future one month and back 30 years from now
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 30);

    const maxDate = futureDate.toISOString().split('T')[0];
    const minDate = pastDate.toISOString().split('T')[0];

    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}&vote_average.gte=${minRate}&vote_average.lte=${maxRate}${genre ? `&with_genres=${genre}` : ''}${sortByValue ? `&sort_by=${sortByValue}` : ''}`;

    const res1 = await fetch(url + `&page=${apiFirstPage}`, options);
    const res2 = await fetch(url + `&page=${apiSecondPage}`, options);

    const data1 = await res1.json();
    const data2 = await res2.json();

    const joinNextPage = apiFirstPage % 2 !== 0;

    const returnData = {
        results: [...(joinNextPage ? data1.results : data1.results.slice(-10)), ...(joinNextPage ? data2.results.slice(0, 10) : data2.results)],
        total_results: data1.total_results > 100 * 30 ? 100 * 30 : data1.total_results,
    };

    return Response.json(returnData);
}
