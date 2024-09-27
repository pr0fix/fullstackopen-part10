import { View, StyleSheet, ScrollView } from "react-native";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const AppBar = () => {
  return (
    <View style={theme.appBar.container}>
      <ScrollView horizontal style={theme.appBar.scrollView}>
        <View style={theme.appBar.tabs}>
          <AppBarTab title="Repositories" to="/" />
          <AppBarTab title="Sign in" to="/signin" />
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
