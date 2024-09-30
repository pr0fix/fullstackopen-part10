import { Text } from "react-native";

import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (loading) return <Text>loading...</Text>;

  if (error) return <Text>Error: {error.message}</Text>;

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
