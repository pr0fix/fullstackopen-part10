import { Pressable, FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate, useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import theme from "../theme";
import { format } from "date-fns";
import Text from "./Text";
import Selector from "./Selector";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  sortOption,
  setSortOption,
}) => {
  const navigate = useNavigate();
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <Selector sortOption={sortOption} setSortOption={setSortOption} />
      }
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  );
};

export const SingleRepositoryItem = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data.repository;

  return (
    <>
      <RepositoryItem repository={repository} showGithubButton={true} />
      <RepositoryReviews repository={repository} />
    </>
  );
};

export const RepositoryReviews = ({ repository }) => {
  const reviews = repository?.reviews?.edges || [];

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd.MM.yyyy");
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={{ paddingTop: 10 }}
      keyExtractor={(item) => item.node.id}
      renderItem={({ item }) => (
        <View style={theme.reviews.reviewContainer}>
          <View style={theme.reviews.ratingCircle}>
            <Text style={theme.reviews.ratingText}>{item.node.rating}</Text>
          </View>
          <View style={theme.reviews.reviewContent}>
            <Text fontWeight="bold">{item.node.user.username}</Text>
            <Text color="textSecondary">{formatDate(item.node.createdAt)}</Text>
            <Text>{item.node.text}</Text>
          </View>
        </View>
      )}
    />
  );
};

const RepositoryList = () => {
  const [sortOption, setSortOption] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
    sortValue: "latest",
  });

  const { repositories, loading, error } = useRepositories(sortOption);

  if (loading) return <Text>loading...</Text>;

  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortOption={sortOption}
      setSortOption={setSortOption}
    />
  );
};

export default RepositoryList;
