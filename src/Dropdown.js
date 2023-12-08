const Dropdown = (props) => {
  const dropDownLimit = 5;
  const locationData = require("./data/Us.json");
  const search = props.search;
  const setSearch = props.setSearch;
  const setSearchLength = props.setSearchLength;
  const handleSubmit = props.handleSubmit;
  return (
    // dropdown menue when searching
    <div className="dropdown">
      {locationData
        .filter((item) => {
          const searchTerm = search.toLowerCase();
          const searchInput = item.name.toLowerCase();

          return (
            searchTerm &&
            searchInput.startsWith(searchTerm) &&
            searchTerm !== searchInput
          );
        })
        .slice(0, dropDownLimit)
        .map((item) => (
          <div
            className="dropdown-row"
            onClick={() => {
              setSearch(item.name);
              setSearchLength(item.name.length);
              handleSubmit(item.name);
            }}
            key={item.name}
          >
            {item.name}
          </div>
        ))}
    </div>
  );
};

export default Dropdown;
