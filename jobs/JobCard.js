/**
 * JobCard component displays information about a job
 * and Apply/Applied button to apply for job.
 *
 * Uses UserContext to get applyToJob function
 * and hasAppliedToJob status.
 *
 * Handles applying for job on click of Apply button.
 *
 * Renders job title, company, salary, equity.
 *
 * Calls formatSalary to format salary number.
 */
import React, { useContext, useState } from "react";
import "./JobCard.css";
import UserContext from "../auth/UserContext";

function JobCard({ id, title, salary, equity, companyName }) {
  console.debug("JobCard");

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  React.useEffect(
    function updateAppliedStatus() {
      console.debug("JobCard useEffect updateAppliedStatus", "id=", id);
      setApplied(hasAppliedToJob(id));
    },
    [id, hasAppliedToJob]
  );

  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>{companyName}</p>
        {salary && <div>Salary: {salary}</div>}
        {equity !== undefined && <div>Equity: {equity}</div>}
        <button
          className="btn btn-danger font-weight-bold text-uppercase float-right"
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

function formatSalary(salary) {
  const digitsRev = [];
  const salaryStr = salary.toString();

  for (let i = salaryStr.length - 1; i >= 0; i--) {
    digitsRev.push(salaryStr[i]);
    if (i >= 0 && i % 3 === 0) digitsRev.push(",");
  }

  return digitsRev.reverse().join("");
}

export default JobCard;
