import { createAxiosInstance } from '../../service/Service';
import { BASE_URL_SEARCH } from '../../const';

/**
 * A class that implements the service the base
 * axios configuration and we used to call the
 * giphy api
 */

class GiphyService {
  axiosInstance;

  constructor(baseURL = BASE_URL_SEARCH) {
    this.axiosInstance = createAxiosInstance(baseURL);
  }

  /**
   * A function to call the search api, this function
   * is paginated and return the images that we are
   * going to display on the screen
   *
   * @param value
   * @param offset
   * @param limit
   */
  async findGift(value, offset = 0, limit = 21) {
    return await this.axiosInstance.get('gifs/search', {
      params: {
        limit,
        offset,
        q: value
      }
    });
  }
}

export default GiphyService;
