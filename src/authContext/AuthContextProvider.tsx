import { ReactNode, createContext, useState } from "react";
import { Auth, Role } from "../types";

export const AuthContext = createContext<Auth>({ role: undefined, id: '' })

export default function AuthContextProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState<Auth>();
    const login = (role: Role, id: string, key?: string) => {
        setAuth({ role: role, id: id, key: key });
    }
    const register = (role: Role, id: string, key?: string) => {
        setAuth({ role: role, id: id, key: key });
    }

    return (<AuthContext.Provider value={{auth: auth, login: login, register: register}}>{children}</AuthContext.Provider>)

}
