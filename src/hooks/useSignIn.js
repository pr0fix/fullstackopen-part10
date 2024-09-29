import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { useNavigate } from "react-router-native";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);
  const navigate = useNavigate();

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { username, password },
      });

      const accessToken = data?.authenticate?.accessToken;

      if (accessToken) {
        await authStorage.setAccessToken(accessToken);
        await apolloClient.resetStore();
        navigate("/repositories");
      }

      return data;
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return [signIn, result];
};

export default useSignIn;
