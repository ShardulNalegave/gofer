
import { OperationVariables, useQuery } from "@apollo/client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Center, Loader } from "@mantine/core";

import { queries } from "../api/api";
import Page from "../components/Page";
import { logoutUser } from "../authUtils";

interface ILoggedInUserData {
  userData: any,
  rights: String[],
  refetch: (variables: Partial<OperationVariables>) => Promise<void>,
}

const initialValue: ILoggedInUserData = {
  userData: {},
  rights: [],
  refetch: async (_: Partial<OperationVariables>) => {},
};
const loggedInUserDataContext = createContext<ILoggedInUserData>(initialValue);

export const useLoggedInUserData = () => useContext(loggedInUserDataContext);

interface LoggerInUserDataProviderProps {
  children: ReactNode,
}

export function LoggerInUserDataProvider({ children } : LoggerInUserDataProviderProps) {
  let [ value, setValue ] = useState({});
  let [ rights, setRights ] = useState<String[]>([]);
  let { loading, error, data, refetch } = useQuery(queries.LOGGED_IN_USER_DATA, {
    variables: {},
    pollInterval: 1000,
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setValue(data.loggedInUserData);
      if (data.loggedInUserData.roles) {
        let rights: String[] = [];
        data.loggedInUserData.roles.forEach((role: any) => {
          rights = [
            ...rights,
            ...role.rights,
          ];
        });
        setRights(rights);
      } else setRights([]);
    } else if (error) {
      console.log(error);
      setValue({});
      logoutUser();
    }
  }, [loading, data]);

  return (
    (!loading) ?
      <loggedInUserDataContext.Provider value={{
        userData: value,
        rights,
        refetch: async (variables: Partial<OperationVariables>) => {
          await refetch(variables);
        },
      }}>
        {children}
      </loggedInUserDataContext.Provider>
      :
      <Page scroll={false} padding={0}>
        <Center style={{ height: '100vh' }}>
          <Loader />
        </Center>
      </Page>
  );
}