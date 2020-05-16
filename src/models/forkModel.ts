import Api from "../modules/api";
import constants from "../modules/constants";

class ForkModel {
  static forkRepository(body: object): Promise<object> {
    return Api.post(`${constants.HOST}`, body)
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
