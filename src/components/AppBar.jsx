import { View, StyleSheet, ScrollView } from "react-native";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 15,
    paddingBottom: 30,
    backgroundColor: theme.colors.textPrimary,
  },
  tabs: {
    flexDirection: "row",
  },
  scrollView: {
    flexGrow: 0,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <View style={styles.tabs}>
          <AppBarTab title="Repositories" to="/" />
          <AppBarTab title="Sign in" to="/signin" />
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
