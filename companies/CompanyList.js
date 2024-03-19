/**
 * CompanyList component fetches and displays a list of companies.
 *
 * On mount, calls JoblyApi.searchCompanies() to fetch all companies.
 * Displays them in a list of CompanyCard components.
 * Renders LoadingSpinner while waiting for data.
 *
 * Contains search() method to search for companies by name.
 * Passed to SearchForm component.
 */
import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";

function CompanyList() {
  console.debug("CompanyList");

  const [companies, setCompanies] = useState(null);

  useEffect(function getCompaniesonMount() {
    console.debug("CompanyList useEffect getCompaniesOnMount");
    SearchForm();
  }, []);

  async function search(name) {
    let companies = await JoblyApi.searchCompanies(name);
    setCompanies(companies);
  }

  if (!companies) return <LoadingSpinner />;

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {companies.length ? (
        <div className="CompanyList-list">
          {companies.map((c) => (
            <CompanyCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              description={c.description}
              logoUrl={c.logoUrl}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default CompanyList;
