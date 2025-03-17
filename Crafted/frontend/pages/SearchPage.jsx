import SearchComponent from "../components/SearchComponent.jsx";
import UserSideBar from "../components/UserSideBar";

const SearchPage = () => {
  // flex flex-row = flexbox container with horizontal orientation
  return (
    <div className="flex flex-row">
      <UserSideBar />

      <div className="flex-1 p-8 overflow-y-auto">
        <SearchComponent />
      </div>
    </div>
  );
};

export default SearchPage;
