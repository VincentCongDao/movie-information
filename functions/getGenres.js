// serverless functions
const fetch = require("node-fetch");
exports.handler = async function (event) {
  limit = JSON.parse(event.body);
  const url = process.env.ASTRA_DB_TOKEN_ENDPOINT;
  const query = `
    query getAllGenre {
        reference_list(
            value:{label: "genre"}
            options: {limit: ${JSON.stringify(limit)}}
        )
        {
            values{
                Value
            }
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
