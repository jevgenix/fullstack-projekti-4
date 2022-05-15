const SearchForm = ({ searchValue, handleFormSearch }) => {
  return (
    <form className="search-box">
      <input
        value={searchValue}
        onChange={handleFormSearch}
        type="text"
        id="search"
        className="input-search"
        placeholder="Search..."
        autoComplete="off"
      />
    </form>
  );
};

export default SearchForm;
