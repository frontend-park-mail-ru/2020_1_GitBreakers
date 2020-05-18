import { IReturnPromise } from "./../modules/IModel";
import Api from "../modules/api";
import constants from "../modules/constants";

export default class SearchModel {
  static search(
    params: string,
    query: string,
    limit = 20,
    offset = 0
  ): Promise<IReturnPromise> {
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
      .catch(() => {
        return {
          success: false,
          status: 0,
        };
      });
  }
}
