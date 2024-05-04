/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../../services/api/api";
import { Owner } from "../../@types/owner/owner.type";
import { SignUpPayload } from "../../@types/signup/signup.type";
import { SignInPayload } from "../../@types/signin/signin.type";
import { AuthContext } from "../../hooks/useAuth/useAuth";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<Owner | null>(null);
    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem("authToken");

            if (storageData) {
                const { token } = JSON.parse(storageData);
                api.defaults.headers.authorization = `Bearer ${token}`;
                const response = await api.post("user/:id", storageData);
                setUser(response.data.user);
            }
        };

        validateToken();
    }, []);

    const signin = async (payload: SignInPayload) => {
        try {
            const response = await api.post("/login", payload);

            const { id, token } = response.data;

            const storagedData = JSON.stringify({ token });
            localStorage.setItem("authToken", storagedData);

            api.defaults.headers.authorization = `Bearer ${token}`;

            setUser(response.data);
            console.log(response.data);
            return { id, token };
        } catch (err: any) {
            if (err.response.status === 401) {
                console.log(err)
            }
            throw err;
        }
    };

    const register = async (payload: SignUpPayload) => {
        try {
            const response = await api.post("/register", payload);

            const { id, token } = response.data;

            const storagedData = JSON.stringify({ token });
            localStorage.setItem("authToken", storagedData);

            api.defaults.headers.authorization = `Bearer ${token}`;

            setUser({ id });
        } catch (err: any) {
            if (err.response.status === 401) {
                console.error(err);
            }
        }
    };

    const signout = async () => {
        await api.post("/logout");

        api.defaults.headers.authorization = null;

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signin, register, signout }}>
            {children}
        </AuthContext.Provider>
    );
};