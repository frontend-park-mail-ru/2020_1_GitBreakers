import Api from "../modules/api";
import constants from "../modules/constants";

class SearchModel {
  static search(params: string, query: string, limit: number, offset: number) {
    return Api.get(
      `/func/search/${params}?query=${query}&limit=${limit}&offset=${offset}`
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
      .catch((err) => {
        return {};
      });
  }
}
