export const checkIfSomeFieldsAreEmpty = (values) => {
    return Object.values(values).some(value => value === '')
}

export const checkIfAllFieldsAreEmpty = (values) => {
    return Object.values(values).every(value => value === '')
}