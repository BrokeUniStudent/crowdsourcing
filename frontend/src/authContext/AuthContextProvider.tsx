import { ReactNode, createContext, useState } from "react";
import { Auth, Role } from "../types";

export const AuthContext = createContext<Auth>({ role: undefined, id: '' } as Auth)

export default function AuthContextProvider({ children }: { children: ReactNode }) {
    // const [auth, setAuth] = useState<Auth>();
    // const login = (role: Role, id: string, metadata?: Object) => {
    //     setAuth({ role: role, id: id, metadata: metadata } as Auth);
    // }
    // const register = (role: Role, id: string, metadata?: string) => {
    //     setAuth({ role: role, id: id, metadata: metadata } as Auth);
    // }

    // return (<AuthContext.Provider value={{}}>{children}</AuthContext.Provider>)

}
