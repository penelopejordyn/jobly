import React, { useState, useEffect } from "react";
import JoblyApi from "../api/JoblyApi"
import CompanyCard from "./CompanyCard";
import Search from '../Search';
import useDebounce from '../hooks/useDebounce';
import Loading from "../Common/Loading";
import NoResults from "../Common/NoResults";

/** Companies - Renders a list of companies.
 *   - CompanyList > CompanyCard > Company
 */
function CompanyList() {

  const [companies, setCompanies] = useState(null);
  const [query, setQuery] = useState('');

  // debounce search query for automatic retrieval
  const debouncedSearch = useDebounce(query, 1000);

  useEffect(() => {
    search(debouncedSearch);
  }, [debouncedSearch]);

  const search = async search => {
    let companies = await JoblyApi.searchCompanies(search);
    setCompanies(companies);
  }

  if (!companies) return <Loading />;

  return (
    <div>
      <Search doSearch={search} query={query} setQuery={setQuery} page="Companies" />
          {companies.length
            ? companies.map((company, i) => <CompanyCard key={i} company={company} />)
            : <NoResults />
          }
    </div>
  );
}

export default CompanyList;