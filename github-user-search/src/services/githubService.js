




import axios from "axios";
import { useState } from "react";

/* =========================
   AXIOS SETUP
========================= */

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const axiosInstance = axios.create({
  headers: GITHUB_TOKEN
    ? { Authorization: `token ${GITHUB_TOKEN}` }
    : {},
});

/* =========================
   API FUNCTION
   MUST contain this exact URL
========================= */

export const searchUsers = async ({ username, location, minRepos }) => {
  let query = "";

  if (username) query += username;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>=${minRepos}`;

  const response = await axiosInstance.get(
    `https://api.github.com/search/users?q=${query}`
  );

  return response.data.items;
};

/* =========================
   SEARCH COMPONENT
========================= */

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
    >
      <h2 className="text-xl font-semibold mb-5">Advanced Search</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <input
          name="minRepos"
          type="number"
          placeholder="Min repos"
          value={form.minRepos}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
