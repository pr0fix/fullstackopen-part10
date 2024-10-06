import { Picker } from "@react-native-picker/picker";

const Selector = ({ sortOption, setSortOption }) => {
  const handleSortChange = (value) => {
    if (value === "latest") {
      setSortOption({
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
        sortValue: "latest",
      });
    } else if (value === "highest") {
      setSortOption({
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
        sortValue: "highest",
      });
    } else if (value === "lowest") {
      setSortOption({
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
        sortValue: "lowest",
      });
    }
  };

  return (
    <Picker
      selectedValue={sortOption.sortValue}
      onValueChange={(itemValue) => handleSortChange(itemValue)}
    >
      <Picker.Item
        style={{ color: "gray" }}
        label="Select an item..."
        enabled={false}
        value={null}
      />
      <Picker.Item
        style={{ color: "black" }}
        label="Latest repositories"
        value="latest"
      />
      <Picker.Item
        style={{ color: "black" }}
        label="Highest rated repositories"
        value="highest"
      />
      <Picker.Item
        style={{ color: "black" }}
        label="Lowest rated repositories"
        value="lowest"
      />
    </Picker>
  );
};

export default Selector;
