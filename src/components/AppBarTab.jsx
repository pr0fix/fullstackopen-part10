import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  tab: {
    color: theme.colors.appBarPrimary,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = ({ title }) => {
  return (
    <Pressable>
      <Text style={styles.tab}>{title}</Text>
    </Pressable>
  );
};

export default AppBarTab;
