// serverless functions
const fetch = require("node-fetch");
exports.handler = async function (event) {
  const body = JSON.parse(event.body);
  const genre = body.genre;
  const pageState = body.pageState;
  const url = process.env.ASTRA_DB_TOKEN_ENDPOINT;
  const query = `
    query {
        movie_by_genre(
            value: {genre:${JSON.stringify(genre)}}
          	orderBy:[year_DESC],
          	options: {pageSize: 2, pageState: ${JSON.stringify(pageState)}}
        )
        {
            values{
              title,
              year,
              synosis,
              duration,
              thumnail
            }
            pageState
        }
    }`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-cassandra-token": process.env.ASTRA_DB_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  try {
    const responseBody = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
