import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  tab: {
    color: theme.colors.appBarPrimary,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = ({ title, to }) => {
  return (
    <Link to={to}>
      <Text style={styles.tab}>{title}</Text>
    </Link>
  );
};

export default AppBarTab;
