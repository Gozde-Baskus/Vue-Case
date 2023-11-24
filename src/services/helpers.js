
export const getValue = (type,properties) => {
     const yearObject = properties.find(property => property.name === type);
    return yearObject ? yearObject.value : '';

};