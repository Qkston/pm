import { createContext, useState, useContext } from "react";

interface UserContextData {
	userID?: string;
	setUserID: (id: string) => void;
}

const UserContext = createContext({} as UserContextData);

export const UserProvider = ({ children }: { children: any }) => {
	const [userID, setUserID] = useState<string>();

	return <UserContext.Provider value={{ userID, setUserID }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
