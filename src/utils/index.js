export const validateProduct = product => {
    let result = true;
    if (!product.title || !product.description || !product.code || !product.price || !product.stock  || !product.category) {
        result = false;
    }
    return result;
}