// **BUG** Search page if left with inputs in field and toggle to another search term will crash 

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as userService from "../services/userService";
import * as groupService from "../services/groupService";
import ViewCarInGarage from './ViewCarInGarage';


function SearchPage() {
  
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('users');
  const [results, setResults] = useState([]);
  const [searchResults, setSearchResults] = useState('Search By Users or Cars')
  const [isLoading, setIsLoading] = useState(false);
  const [toggleViewCar, setToggleViewCar] = useState(false);
  
    useEffect(() => {
      setResults([]);
      setSearchResults('Search By Users or Cars');
    }, [searchType]);

  const handleSearch = async () => {
    setIsLoading(true);
    
    // calls show all users and search for matches
    // search logic https://stackoverflow.com/questions/78523196/how-to-optimize-search-filter-component-in-react
    try {
      if (searchType === 'users') {

        const usersData = await userService.showAllUsers();
        const filteredUsers = usersData.filter(user => 
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredUsers);
        
        if (filteredUsers.length === 0) {
          setSearchResults("No users found. Try a different search term.");
        } else {
          setSearchResults('');
        }

      } else if (searchType === 'cars') {

        const carsData = await userService.showAllCars();
        const filteredCars = carsData.filter(car => 
          car.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
          car.model.toLowerCase().includes(searchTerm.toLowerCase()) 
          
        );
        setResults(filteredCars);

        if (filteredCars.length === 0) {
          setSearchResults("No cars found. Try a different search term.");
        } else {
          setSearchResults('');
        }
        console.log(filteredCars);
      } 
      
    } catch (error) {
      console.error("Search failed:", error);
      
    } finally {
      setIsLoading(false);
    }
  };

// const handleAddUserToGroup = async () => {
//   try {
//     const addUser = await groupService.getUserToGroup()
//   }
// }

console.log(results)

  return (
    <div className="min-h-screen bg-white">
       {toggleViewCar && <ViewCarInGarage 
          results={results} 
          onClose={() => setToggleViewCar(false)} 
        />}
      <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Find Cars & Users</h1>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      
      }}>
        <div className="flex mb-6">
      
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-l"
          />
          
          <select 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
            className="px-4 py-2 border-t border-b border-r"
          >
            <option value="users">Users</option>
            <option value="cars">Cars</option>
            
          </select>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-teal-500 text-white px-6 py-2 m- rounded-r"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4">Results</h2>
        
        {results.length === 0 ? (
          <p className="text-gray-500">{searchResults}</p>
        ) : (
          <ul className="space-y-4">
            {searchType === 'users' && results.map(user => (
              <li key={user.id} className="border p-4 rounded shadow-sm bg-white relative">
                <h3 className="font-bold text-lg">{user.username}</h3>
                <p className="text-gray-600">Name: {user.name}</p>
                
                <p className="text-gray-600">Cars: {user.vehicles?.map(car => `${car.make} - ${car.model}`).join(' ')} 
                <button className="bg-blue-500 text-white text-sm py-1 px-3 rounded hover:bg-blue-600 transition duration-300 absolute bottom-2 right-2">
      Add to Group
    </button>
                </p>
              </li>
            ))}
            
            {searchType === 'cars' && results.map(car => (
              <li key={car.id} className="border p-4 rounded shadow-sm bg-white relative">
                <h3 className="font-bold text-lg"> {car.make} {car.model} </h3>
                <p className="text-gray-600">Name: {car.owner?.name} </p>
                <p className="text-gray-600">Username: {car.owner?.username} </p>
                <button className="bg-teal-500 text-white text-sm py-1 px-3 rounded hover:bg-teal-700 transition duration-100 absolute bottom-3 right-2" 
                onClick={() => setToggleViewCar(true)}>
      View Car
    </button>
              </li>
            ))}
            

          </ul>
        )}
      </div>
    </div>
    </div>
  );
}

export default SearchPage;

