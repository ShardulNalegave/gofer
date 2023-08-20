
import { OperationVariables, useQuery } from "@apollo/client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Center, Loader } from "@mantine/core";

import { queries } from "../api/api";
import Page from "../components/Page";
import { logoutUser } from "../authUtils";

interface ILoggedInUserData {
  userData: any,
  refetch: (variables: Partial<OperationVariables>) => Promise<void>,
}

const initialValue = {};
const loggedInUserDataContext = createContext<ILoggedInUserData>({
  userData: initialValue,
  refetch: async (_: Partial<OperationVariables>) => {},
});

export const useLoggedInUserData = () => useContext(loggedInUserDataContext);

interface LoggerInUserDataProviderProps {
  children: ReactNode,
}

export function LoggerInUserDataProvider({ children } : LoggerInUserDataProviderProps) {
  let [ value, setValue ] = useState(initialValue);
  let { loading, error, data, refetch } = useQuery(queries.LOGGED_IN_USER_DATA, {
    variables: {},
    pollInterval: 1000,
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setValue(data.loggedInUserData);
    } else if (error) {
      setValue({});
      logoutUser();
    }
  }, [loading, data]);

  return (
    (!loading) ?
      <loggedInUserDataContext.Provider value={{
        userData: value,
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