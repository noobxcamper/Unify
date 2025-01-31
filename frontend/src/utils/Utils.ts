function firstCharacterUppercase(value: string) {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

function formatPrice(price: number) {
    return price.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

export {
    firstCharacterUppercase,
    formatPrice
}