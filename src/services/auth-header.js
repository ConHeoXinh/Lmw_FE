import { TOKEN_STORAGE } from "../utils/constants";
import { getLocalStrogageByKey } from "../utils/utils";

export default function authHeader() {
  const accessToken = getLocalStrogageByKey(TOKEN_STORAGE);
  if (accessToken) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
}
