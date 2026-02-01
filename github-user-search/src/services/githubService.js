import axios from 'axios';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const axiosInstance = axios.create({
headers: GITHUB_TOKEN ? {
Authorization: token ${GITHUB_TOKEN}
} : {}
});

import { useState } from "react";
import { searchUsers } from "../api/github"; // adjust path if needed

export default function Search({ onResults }) {
  const [form, setForm] = useState({
    username: "",
    location: "",
    minRepos: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const results = await searchUsers(form);
      onResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl"
      aria-label="Advanced GitHub user search"
    >
      <h2 className="text-xl font-semibold mb-5">Advanced Search</h2>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Username */}
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="e.g. torvalds"
            value={form.username}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label htmlFor="location" className="text-sm font-medium mb-1">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. Lagos"
            value={form.location}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Minimum repos */}
        <div className="flex flex-col">
          <label htmlFor="minRepos" className="text-sm font-medium mb-1">
            Minimum Repositories
          </label>
          <input
            id="minRepos"
            name="minRepos"
            type="number"
            min="0"
            placeholder="10"
            value={form.minRepos}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
