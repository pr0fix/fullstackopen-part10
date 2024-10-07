import { View, Image, Linking, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const formatCount = (count) => {
  return count >= 1000 ? (count / 1000).toFixed(1) + "k" : count.toString();
};

const RepositoryAvatar = ({ uri }) => (
  <Image style={theme.repositoryItem.avatar} source={{ uri }} />
);

const RepositoryDetails = ({ repository }) => (
  <View>
    <Text fontWeight="bold" fontSize="subheading" style={{ marginBottom: 5 }}>
      {repository.fullName}
    </Text>
    <Text color="textSecondary">{repository.description}</Text>
    <RepositoryLanguage language={repository.language} />
  </View>
);

const RepositoryLanguage = ({ language }) => (
  <Text style={theme.repositoryItem.language}>{language}</Text>
);

const RepositoryStats = ({ repository }) => (
  <View style={theme.repositoryItem.statsContainer}>
    <View style={theme.repositoryItem.stat}>
      <Text fontWeight="bold">{formatCount(repository.stargazersCount)}</Text>
      <Text color="textSecondary">Stars</Text>
    </View>
    <View style={theme.repositoryItem.stat}>
      <Text fontWeight="bold">{formatCount(repository.forksCount)}</Text>
      <Text color="textSecondary">Forks</Text>
    </View>
    <View style={theme.repositoryItem.stat}>
      <Text fontWeight="bold">{formatCount(repository.reviewCount)}</Text>
      <Text color="textSecondary">Reviews</Text>
    </View>
    <View style={theme.repositoryItem.stat}>
      <Text fontWeight="bold">{formatCount(repository.ratingAverage)}</Text>
      <Text color="textSecondary">Rating</Text>
    </View>
  </View>
);

const RepositoryItem = ({ repository, showGithubButton }) => {
  return (
    <View style={theme.repositoryItem.container} testID="repositoryItem">
      <RepositoryAvatar uri={repository.ownerAvatarUrl} />
      <View style={theme.repositoryItem.details}>
        <RepositoryDetails repository={repository} />
        <RepositoryStats repository={repository} />
        

        {showGithubButton && (
          <View style={theme.repositoryItem.buttonContainer}>
            <Pressable
              style={theme.forms.inputButton}
              onPress={() => Linking.openURL(repository.url)}
              >
              <Text fontWeight="bold" style={styles.text}>
                Open in GitHub
              </Text>
            </Pressable>
          </View>
        )}
        
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 4,
    padding: 20,
    backgroundColor: "#0366d6",
  },
  text: {
    color: "white",
  },
});
export default RepositoryItem;
