import axios from 'axios';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const axiosInstance = axios.create({
  headers: GITHUB_TOKEN ? {
    Authorization: `token ${GITHUB_TOKEN}`
  } : {}
});

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchUsers = async ({ username, location, minRepos }) => {
  try {
    // Build query string
    let query = '';
    
    if (username) {
      query += username;
    }
    
    if (location) {
      query += `+location:${location}`;
    }
    
    if (minRepos) {
      query += `+repos:>=${minRepos}`;
    }

    const response = await axios.get(
      `https://api.github.com/search/users?q=${query}`
    );
    
    return response.data.items;
  } catch (error) {
    throw error;
  }
};
