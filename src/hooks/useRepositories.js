import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sortOption, searchKeyword) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: sortOption.orderBy,
      orderDirection: sortOption.orderDirection,
      searchKeyword,
    },
  });

  const repositories = data?.repositories?.edges
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return { repositories, error, loading };
};

export default useRepositories;
