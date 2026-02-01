import { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBasicSearch = async (event) => {
    event.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);
    setSearchResults([]);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (event) => {
    event.preventDefault();
    
    setLoading(true);
    setError(null);
    setUserData(null);
    setSearchResults([]);

    try {
      const results = await searchUsers({ username, location, minRepos });
      setSearchResults(results);
    } catch (err) {
      setError('Error fetching search results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Basic Search Form */}
      <form onSubmit={handleBasicSearch} className="mb-8 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Basic Search</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* Advanced Search Form */}
      <form onSubmit={handleAdvancedSearch} className="mb-8 p-6 bg-gray-50 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold mb-4">Advanced Search</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="number"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="Min Repositories"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit"
          className="w-full px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Advanced Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      
      {/* Error State */}
      {error && <p className="text-center text-red-600">{error}</p>}
      
      {/* Basic Search Result */}
      {userData && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-start gap-4">
            <img 
              src={userData.avatar_url} 
              alt={userData.name} 
              className="w-24 h-24 rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-gray-600">@{userData.login}</p>
              {userData.location && <p className="text-gray-600">📍 {userData.location}</p>}
              <p className="text-gray-600">📦 {userData.public_repos} repositories</p>
              <a 
                href={userData.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Full Profile →
              </a>
              <div className="flex gap-4 mt-2">
                <span>Followers: {userData.followers}</span>
                <span>Following: {userData.following}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Search Results ({searchResults.length})</h3>
          {searchResults.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
              <img 
                src={user.avatar_url} 
                alt={user.login} 
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-bold">{user.login}</h3>
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Profile →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
