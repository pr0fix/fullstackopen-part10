import { View, StyleSheet } from "react-native";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    paddingTop: 60,
    paddingLeft: 15,
    paddingBottom: 30,
    backgroundColor: theme.colors.textPrimary,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab title="Repositories" to="/" />
      <AppBarTab title="Sign in" to="/signin" />
    </View>
  );
};

export default AppBar;
