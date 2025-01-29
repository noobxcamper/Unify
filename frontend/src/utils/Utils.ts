function firstCharacterUppercase(value: string) {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

function breadcrumbUrl(url: string) {
    const cleanedPath = window.location.pathname.replace("/", "");
    const splitUrl = cleanedPath.split('/');

    return splitUrl;
}

export {
    firstCharacterUppercase,
    breadcrumbUrl
}