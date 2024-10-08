import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      variables,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    const did = fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
    if (did) {
      console.log("end");
    }
  };

  const repositories = data?.repositories?.edges
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return {
    repositories,
    fetchMore: handleFetchMore,
    error,
    loading,
    ...result,
  };
};

export default useRepositories;
