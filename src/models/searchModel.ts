import ReturnPromise from 'Modules/IModel.ts';
import Api from 'Modules/api';
import constants from 'Modules/constants';

export default class SearchModel {
  static search(
    params: string,
    query: string,
    limit = 20,
    offset = 0
  ): Promise<ReturnPromise> {
    return Api.get(
      `${constants.HOST}/func/search/${params}?query=${query}&limit=${limit}&offset=${offset}`
    )
      .then((res) => {
        if (res.ok) {
          return {
            success: true,
            body: res.json(),
          };
        }
        return {
          success: false,
          status: res.status,
        };
      })
      .catch(() => ({
        success: false,
        status: 0,
      }));
  }
}
