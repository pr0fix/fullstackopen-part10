import { FlatList, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import Text from "./Text";
import theme from "../theme";
import { ItemSeparator } from "./RepositoryList";
import { formatDate } from "../utils/formatDate";

const UserReviews = () => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges || [];

  if (reviews.length === 0)
    return <Text>You haven't submitted any reviews yet</Text>;

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.node.id}
      renderItem={({ item }) => (
        <View style={theme.reviews.reviewContainer}>
          <View style={theme.reviews.ratingCircle}>
            <Text style={theme.reviews.ratingText}>{item.node.rating}</Text>
          </View>
          <View style={theme.reviews.reviewContent}>
            <Text fontWeight="bold">{item.node.repository.fullName}</Text>
            <Text color="textSecondary">{formatDate(item.node.createdAt)}</Text>
            {item.node.text ? <Text>{item.node.text}</Text> : ""}
          </View>
        </View>
      )}
    />
  );
};

export default UserReviews;
