export const validate = (obj) => {
    Object.entries(obj).forEach(([key, value]) => {
        if (!value) {
            throw new Error(`${key} is required!`);
        }
    });
};
