function getCountries() {
    return fetch("http://localhost:8080/countries")
        .then(response => response.json())
}

export default getCountries