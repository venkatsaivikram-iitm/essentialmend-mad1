
const regexMap = {
    email: /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z]+$/,
    name: /^[a-zA-Z0-9. ]+$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
}

export { regexMap };