/**
 * Renders a list of job cards.
 * Fetches jobs from the API and displays them in a JobCardList component.
 * Shows a loading spinner while waiting for data.
 * Allows searching for jobs by title.
 */
import React, { useState, useEffect } from "react";
import Search from "../common/SearchForm";
import JoblyApi from "../api/api";
import JobCardList from "./JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";

function JobList() { 
    console.debug("JobList");

    const [jobs, setJobs] = useState(null);

    useEffect(function getALLJobsOnMount() {
        console.debug("JobList useEffect getALLJobsOnMount");
        search();

    }, []);

    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return <LoadingSpinner />;

    return ( 
        <div className="JobList col-md-8 offset-md-2">
            <Search search={search} />
            {jobs.length 
                ? <JobCardList jobs={jobs} />
                : <p className="alert alert-info">No jobs found.</p>
            }
        </div>
    );
}

export default JobList;