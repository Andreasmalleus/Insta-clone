export const checkIfFieldsAreEmpty = (values) => {
    return Object.values(values).some(value => value === '')
}