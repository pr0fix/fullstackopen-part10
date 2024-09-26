const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    appBarPrimary: "#FFFFFF",
    mainBackground: "#e1e4e8",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: "System",
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
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
};

export default theme;
