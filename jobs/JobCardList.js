import React from "react";
import JobCard from "./JobCard";


/**
 * Renders a list of JobCard components.
 *
 * @param {Object[]} jobs - Array of job objects to render
 * @param {Function} apply - Callback function when apply button clicked
 * @returns {JSX.Element} JSX for rendered list of JobCards
 */
function JobCardList({ jobs, apply }) {
  console.debug("JobCardList", "jobs=", jobs);

  return (
    <div className="JobCardList">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyName={job.companyName}
        />
      ))}
    </div>
  );
}

export default JobCardList;