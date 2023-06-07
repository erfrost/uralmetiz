const serverApi = async (endpoint, method = "GET", params) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const data = await fetch(`${process.env.BACKEND_URL}/${endpoint}`, {
    next: {
      revalidate: 3600,
    },
    method: method,
    headers: headers,
    body: JSON.stringify(params),
  });

  return await data.json();
};

export default serverApi;
