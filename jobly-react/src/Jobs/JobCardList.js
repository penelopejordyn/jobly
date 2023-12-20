import React from "react";
import JobCard from "./JobCard";

export const CARDS_PER_PAGE = 10;

/** JobCardList - Used by both JobList and CompanyDetail to list jobs.
 *
 * - jobs – prop: list of jobs to render
 * - apply – prop: handles applying to a job
 */
function JobCardList({ jobs, apply }) {

  return (
    <div>
      <div className="JobsList">
        {jobs.map((job) => <JobCard key={job.id} job={job} apply={apply} />)}
      </div>
    </div>
  );
}

export default JobCardList;