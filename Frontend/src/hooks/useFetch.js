function useFetch() {
  const fetchRequest = async ({
    uri,
    method = "GET",
    body,
    headers,
    signal,
  }) => {
    let response = await fetch(uri, {
      method,
      body,
      headers,
      signal,
    });

    if (!response.ok) throw response;

    return response;
  };

  return { fetchRequest };
}

export { useFetch };
