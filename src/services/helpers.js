export const getPropertiesValue = (type, properties) => {
    if (!properties) {
        return '';
    }
    const yearObject = properties.find(property => property.name === type);
    return yearObject ? yearObject.value : '';

};