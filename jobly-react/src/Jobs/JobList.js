import React, { useState, useEffect } from 'react';
import JoblyApi from '../api/JoblyApi';
import JobCardList from './JobCardList';
import Search from '../Search';
import useDebounce from '../hooks/useDebounce';
import Loading from '../Common/Loading';
import NoResults from '../Common/NoResults';


/* Renders a list of jobs.*/
function JobList() {

  const [ jobs, setJobs ] = useState(null);
  const [ query, setQuery ] = useState('');

  const debouncedSearch = useDebounce(query, 1000);

  useEffect(() => {
      search(debouncedSearch);
  },[debouncedSearch]);

  const search = async search => {
    let jobs = await JoblyApi.searchJobs(search);
    setJobs(jobs);
  }

  async function apply(id) {
    let message = await JoblyApi.apply(id);
    setJobs(j => j.map(job =>
      job.id === id ? { ...job, state: message } : job
    ))
  }

  if (!jobs) return <Loading />;

  return (
    <>
      <Search doSearch={search} query={query} setQuery={setQuery} page="Jobs" />
      {jobs.length
        ? <JobCardList jobs={jobs} apply={apply} />
        : <NoResults />
      }
    </>
  )
}

export default JobList;