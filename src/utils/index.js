/**
 * Is a function to convert the images received
 * from the service to a custmo model with only
 * the fields that we need
 * @param {*} data
 */
export const createImageStruct = data => {
  const {
    id,
    title,
    images: { original }
  } = data;

  const imageStruct = { id, title, original };

  return imageStruct;
};
