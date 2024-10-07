import { Alert, Text, FlatList, Pressable, View } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import theme from "../theme";
import { ItemSeparator } from "./RepositoryList";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";

const UserReviews = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges || [];

  if (reviews.length === 0)
    return <Text>You haven't submitted any reviews yet</Text>;

  const handleViewRepository = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  const handleDelete = (reviewId) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log(),
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteReview({ variables: { deleteReviewId: reviewId } });
              refetch();
            } catch (error) {
              Alert.alert(
                "Error",
                `An error occurred while deleting your review: ${error.message}`
              );
            }
          },
        },
      ]
    );
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.node.id}
      renderItem={({ item }) => (
        <View style={theme.myReviews.reviewContainer}>
          <View style={theme.myReviews.stats}>
            <View style={theme.myReviews.ratingCircle}>
              <Text style={theme.myReviews.ratingText}>{item.node.rating}</Text>
            </View>
            <View style={theme.myReviews.reviewContent}>
              <Text fontWeight="bold">{item.node.repository.fullName}</Text>
              <Text color="textSecondary">
                {formatDate(item.node.createdAt)}
              </Text>
              {item.node.text ? <Text>{item.node.text}</Text> : ""}
            </View>
          </View>
          <View style={theme.myReviews.buttonRow}>
            <Pressable
              style={theme.myReviews.viewButton}
              onPress={() => handleViewRepository(item.node.repository.id)}
            >
              <Text style={theme.myReviews.buttonText}>View repository</Text>
            </Pressable>
            <Pressable
              style={theme.myReviews.deleteButton}
              onPress={() => handleDelete(item.node.id)}
            >
              <Text style={theme.myReviews.buttonText}>Delete review</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
};

export default UserReviews;
