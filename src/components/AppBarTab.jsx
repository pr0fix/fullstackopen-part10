import React from "react";
import { Text } from "react-native";
import theme from "../theme";
import { Link } from "react-router-native";

const AppBarTab = ({ title, to, onPress }) => {
  return (
    <Link to={to} onPress={onPress} underlayColor="transparent">
      <Text style={theme.appBarTab}>{title}</Text>
    </Link>
  );
};

export default AppBarTab;
