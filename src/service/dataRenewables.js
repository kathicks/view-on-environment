function getRenewables() {
    return fetch("http://localhost:8080/renewables")
        .then(response => response.json())
}

export default getRenewables