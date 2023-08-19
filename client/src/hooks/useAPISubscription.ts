
import { useEffect, useState } from "react";
import { DocumentNode, useQuery, useSubscription } from "@apollo/client";

export function useAPISubscription(QUERY: DocumentNode, SUBSCRIPTION: DocumentNode, variables = {}) {
  let queryResult = useQuery(QUERY, { variables });
  let subscriptionResult = useSubscription(SUBSCRIPTION, { variables });
  let [ loading, setLoading ] = useState(false);
  let [ data, setData ] = useState({});

  useEffect(() => {
    if (!loadedQuery && queryResult.data && !queryResult.loading) {
      setUserData(queryResult.data.loggedInUserData);
      setLoadedQuery(true);
    } else if(!subscriptionResult.loading && subscriptionResult.data) {
      setUserData(subscriptionResult.data.loggedInUserData);
    }
  }, [queryResult.loading, subscriptionResult.loading]);
}