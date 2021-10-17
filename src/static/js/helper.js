async function fetchAPI(endpoint, options) {
    const res = await fetch(endpoint, options);
    const data = await res.json();
    if (res.ok) {
        return data;
    }
    else {
        throw new Error(data);
    }
}

function getQueryValue(querystring, query) {
    return new URLSearchParams(querystring).get(query)
}

export { fetchAPI, getQueryValue };