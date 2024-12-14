import { userAction, userState } from "../interfaces/User";

export const userReducer = (state: userState, action: userAction): userState => {
  const { type, payload } = action;
  switch (type) {
    case "login":
      if (payload) {
        return { ...state, token: payload.token, user: payload.user };
      }
      throw new Error("Payload is required for login action.");
    case "logout":
      return { ...state, token: "", user: null };
    default:
      return state;
  }
};