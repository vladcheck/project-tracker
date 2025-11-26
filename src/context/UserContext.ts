import { createContext } from "react";

interface IUserContext {
  isLoggedIn: boolean;
}
export default createContext<IUserContext>({ isLoggedIn: false });
