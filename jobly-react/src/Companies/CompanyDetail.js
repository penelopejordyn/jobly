import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/JoblyApi"
import JobCardList from "../Jobs/JobCardList";
import AuthContext from '../AuthContext';
import Loading from "../Common/Loading";
import { Heading, Body, LightMiceType } from '../Common/Type';
import { Card } from '../Common/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Div } from "../Common/Div";
import { Image } from "../Common/Image";
import { DetailsDiv } from './CompanyCard';
import styled from '@emotion/styled';

const JobCountDiv = styled.div`
  margin: .5rem;
  @media (min-width: 768px) {
    width: 700px;
    margin: 1rem auto;
  }
`;

/** Company - Shows both company details and a list of available
 *  jobs at that company.
 */
function CompanyDetail() {

  const { handle } = useParams();
  const [currentCompany, setCompany] = useState(null);
  const { userInfo } = useContext(AuthContext);

  // Get list of jobs for this company from DB
  useEffect(() => {
    async function fetchCompany() {
      const { jobs } = userInfo;
      let companyData = await JoblyApi.getCompany(handle);

      // save applied job ids to a set for faster access
      const jobsAppliedTo = new Set(jobs.map(job => job.id));

      // add tag to jobs already applied to
      companyData.jobs = companyData.jobs.map(job => ({
        ...job,
        state: jobsAppliedTo.has(job.id) ? "applied" : null
      }));

      setCompany(companyData);
    }
    fetchCompany();
  }, [handle, userInfo]);

  const apply = async id => {
    if (currentCompany) {
      let message = await JoblyApi.apply(id);
      setCompany(company => ({
        ...company,
        jobs: company.jobs.map(job =>
          job.id === id ? { ...job, state: message } : job
        )
      }));
    }
  }

  if (!currentCompany) return <Loading />;

  return (
    <>
      <Card column>
        <Div display="flex">
          <Image
            src={currentCompany.logo_url}
            size={72}
            alt={`logo for ${currentCompany.name}`}
          >
          </Image>
          <DetailsDiv>
            <Heading>{currentCompany.name}</Heading>
            <Body>{currentCompany.description}</Body>
            <LightMiceType>
              <FontAwesomeIcon icon={faUsers} /> {currentCompany.num_employees} EMPLOYEES
          </LightMiceType>
          </DetailsDiv>
        </Div>
      </Card>
      <JobCountDiv>
        <Body>
          <FontAwesomeIcon icon={faBriefcase} /> {currentCompany.jobs.length} Jobs Available
        </Body>
      </JobCountDiv>
      <div className="jobList">
        <div className="Job-card-area">
          <JobCardList jobs={currentCompany.jobs} apply={apply} />
        </div>
      </div>
    </>
  )
}

export default CompanyDetail;
