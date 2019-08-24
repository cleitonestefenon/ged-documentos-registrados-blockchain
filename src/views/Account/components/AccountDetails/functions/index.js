export const formHasError = errors => {
    if (Object.getOwnPropertyNames(errors).length > 0) {
        return true;
    }
    return false;
}