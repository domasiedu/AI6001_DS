async function apiFetch(
  url,
  options = {}
) {
  const token =
    localStorage.getItem("token");

  if (!options.headers) {
    options.headers = {};
  }

  if (token) {
    options.headers[
      "Authorization"
    ] = token;
  }

  const response =
    await fetch(url, options);

  if (response.status === 401) {
    alert(
      "Session expired. Please login again."
    );

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "userName"
    );

    window.location = "/";

    return;
  }

  return response;
}
