/**
 * SearchForm component renders a form with a search input field
 * and submit button. Allows user to enter search term and submit
 * search request.
 *
 * Props:
 * - searchFor: Callback function passed in to handle search
 *   request on submit.
 */
import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ searchFor }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-lg flex-grow-1"
          name="searchTerm"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-lg btn-primary">
          submit{" "}
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
