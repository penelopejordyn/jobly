import React from "react";
import { Card } from '../Common/Card';
import { Image } from '../Common/Image';
import { Button } from '../Common/Button';
import { Heading, Body, LightMiceType } from '../Common/Type';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom'

export const DetailsDiv = styled.div`
  margin-left: 16px;
`;

const Container = styled.div`
  display: flex;
`;

const JobsCTA = styled.div`
  padding: 8px 8px 8px 16px;
  border: 1px solid rgb(228, 231, 240);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  &:hover {
    border: 1px solid #acbdd5;
  }
`;

/** CompanyCard - display component with company details
 *
 * @param {company} prop: company details
 */
function CompanyCard({ company }) {

  // separate details for easier reading
  const { handle, name, description, num_employees, logo_url, job_count } = company;

  const history = useHistory();

  return (
    <Card column>
      <Container>
        <Image
          src={logo_url}
          size={72}
          alt={`logo for ${name}`}
        >
        </Image>
        <DetailsDiv>
          <Heading>{name}</Heading>
          <Body>{description}</Body>
          <LightMiceType>
            <FontAwesomeIcon icon={faUsers} /> {num_employees} EMPLOYEES
          </LightMiceType>
        </DetailsDiv>
      </Container>
      <JobsCTA>
        <Body>
          <FontAwesomeIcon icon={faBriefcase} /> {job_count} Jobs Available
        </Body>
        <Button onClick={() => history.push(`/companies/${handle}`)}>See Jobs</Button>
      </JobsCTA>
    </Card>
  )
}

export default CompanyCard;