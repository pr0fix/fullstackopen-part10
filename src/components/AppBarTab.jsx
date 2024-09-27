import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "../theme";
import { Link } from "react-router-native";

const AppBarTab = ({ title, to }) => {
  return (
    <Link to={to}>
      <Text style={theme.appBarTab}>{title}</Text>
    </Link>
  );
};

export default AppBarTab;
