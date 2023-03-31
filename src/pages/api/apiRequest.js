const api = async (endpoint, method, params, isUpload) => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const refresh_time = parseInt(localStorage.getItem("refresh_time"));

  const headers = {};
  if (access_token && access_token?.length > 0) {
    headers.authorization = `Bearer ${access_token}`;
  }

  if (!isUpload) headers["Content-Type"] = "application/json";

  if (refresh_time && refresh_time <= Date.now()) {
    console.log(refresh_time, Date.now());
    fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers,
      body: JSON.stringify({ refresh_token }),
    })
      .then((res) => res.json())
      .then(({ data: resData }) => {
        localStorage.setItem("access_token", resData.access_token);
        localStorage.setItem("refresh_token", resData.refresh_token);
        localStorage.setItem(
          "refresh_time",
          (Date.now() + 3600 * 1000).toString()
        );
        headers.authorization = `Bearer ${resData.access_token}`;
      })
      .catch((e) => {
        window.location.href = "/login";
        try {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("refresh_time");
        } catch (error) {}
      });
  }

  const data = await fetch(`${process.env.BACKEND_URL}/${endpoint}`, {
    method: method,
    headers: headers,
    body: !isUpload ? JSON.stringify(params) : params,
  });

  return await data.json();
};

export default api;
