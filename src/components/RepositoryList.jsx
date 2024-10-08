import { Pressable, FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate, useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import theme from "../theme";
import Text from "./Text";
import Selector from "./Selector";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
import { formatDate } from "../utils/formatDate";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListHeader = ({
  sortOption,
  setSortOption,
  searchKeyword,
  setSearchKeyword,
}) => {
  return (
    <View style={{ gap: 5, marginBottom: 5 }}>
      <Searchbar
        style={{ backgroundColor: "white" }}
        placeholder="Search repositories..."
        onChangeText={setSearchKeyword}
        value={searchKeyword}
      />
      <Selector sortOption={sortOption} setSortOption={setSortOption} />
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sortOption, setSortOption, searchKeyword, setSearchKeyword } =
      this.props;

    return (
      <RepositoryListHeader
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const { repositories, navigate, onEndReach } = this.props;

    return (
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

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
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
    sortValue: "latest",
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const variables = {
    orderBy: sortOption.orderBy,
    orderDirection: sortOption.orderDirection,
    searchKeyword: debouncedSearchKeyword,
    first: 5,
  };

  const { repositories, loading, error, fetchMore } =
    useRepositories(variables);

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) return <Text>loading...</Text>;

  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      onEndReach={onEndReach}
      sortOption={sortOption}
      setSortOption={setSortOption}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
