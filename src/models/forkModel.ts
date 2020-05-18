import Api from "../modules/api";
import constants from "../modules/constants";

export default class ForkModel {
  static fork(body: object): Promise<object> {
    return Api.post(`${constants.HOST}/func/repo/fork`, body)
      .then((res) => {
        if (res.ok) {
          return {
            success: true,
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
