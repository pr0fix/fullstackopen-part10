import { View, ScrollView, Text, Alert } from "react-native";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-native";

const AppBar = () => {
  const authStorage = useAuthStorage();
  const [accessToken, setAccessToken] = useState(null);
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await authStorage.getAccessToken();
      setAccessToken(token);
    };
    fetchToken();
  }, []);

  const { data, loading, error } = useQuery(GET_USER, {
    context: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });

  if (loading) return <Text>loading...</Text>;

  if (error) return <Text>Error fetching user data: {error.message}</Text>;

  const isLoggedIn = data && data.me;

  const handleLogOut = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      navigate("/signin");
    } catch (e) {
      Alert.alert("Logout Error", "There was an error while logging you out.");
    }
  };

  return (
    <View style={theme.appBar.container}>
      <ScrollView horizontal style={theme.appBar.scrollView}>
        <View style={theme.appBar.tabs}>
          <AppBarTab title="Repositories" to="/" />
          {isLoggedIn ? (
            <AppBarTab title="Log out" onPress={handleLogOut} />
          ) : (
            <AppBarTab title="Sign in" to="/signin" />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;
