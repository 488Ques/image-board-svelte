async function fetchAPI(endpoint, options) {
    const res = await fetch(endpoint, options);
    const contentType = res.headers.get('content-length');
    let data
    if (!contentType.includes("0")) {
        data = await res.json();
    }
    if (res.ok) {
        return data;
    }
    else {
        throw new Error(data);
    }
}

export { fetchAPI };