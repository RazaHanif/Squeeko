export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

export const validatePhone = (phoneNumber) => {
    const re = /^(1[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{4}$/
    return re.test(phoneNumber)
}

export const validateName = (name) => {
    const re = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/
    return re.test(name)
}

export const validateDateTime = (dateTime) => {
    const date = new Date(dateTime)
    return !isNaN(date.getTime())
}