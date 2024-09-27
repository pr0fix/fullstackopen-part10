import { Platform } from "react-native";

const theme = {
  // General themes
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    mainBackground: "#e1e4e8",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      default: "System",
      android: "Roboto",
      ios: "Arial",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },

  // RepositoryItem.jsx styles
  repositoryItem: {
    container: {
      flexDirection: "row",
      backgroundColor: "white",
      padding: 15,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 5,
      marginRight: 15,
    },
    details: {
      flex: 1,
      justifyContent: "space-between",
      marginRight: 10,
    },
    language: {
      backgroundColor: "#0366d6",
      color: "white",
      padding: 5,
      borderRadius: 4,
      alignSelf: "flex-start",
      marginTop: 5,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    stat: {
      alignItems: "center",
    },
  },

  // AppBar.jsx styles
  appBar: {
    container: {
      paddingTop: 60,
      paddingLeft: 15,
      paddingBottom: 30,
      backgroundColor: "#24292e",
    },
    tabs: {
      flexDirection: "row",
    },
    scrollView: {
      flexGrow: 0,
    },
  },

  // AppBar.jsx styles
  appBarTab: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginRight: 25,
  },

  // SignIn.jsx styles
  signInForm: {
    container: {
      padding: 20,
      backgroundColor: "white",
      borderRadius: 5,
    },
    input: {
      height: 60,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 15,
    },
    error: {
      color: "#d73a4a",
      marginBottom: 10,
    },
    inputError: {
      borderColor: "#d73a4a",
    },
  },
};

export default theme;
