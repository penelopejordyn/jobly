import React from "react";
import { Card } from '../Common/Card';
import { Button } from '../Common/Button';
import { Div } from '../Common/Div';
import { Heading, Body } from '../Common/Type';

// todo: style nicely

/** JobCard - display component for showing job details.
 *  Can apply for jobs.
 * @param {job} prop: job details
 * @param {apply} prop: handles applying to a job
 */
function JobCard({ job, apply }){

  // separate details for easier reading
  const { id, title, salary, equity, state, company_name } = job;

  // apply for job
  function handleApply() {
    apply(id);
  }

  return (
    <Card justify="space-between" align="center">
        <Div>
          <Heading>{title}</Heading>
          <Body>{company_name}</Body>
          <Body>Salary: ${salary}</Body>
          <Body>Equity: {parseInt(equity * 100)}%</Body>
        </Div>
        <Button
          className={state ? "alreadyApplied" : "buttonApply"}
          disabled={state}
          onClick={handleApply}
          >
          {state ? "Applied!" : "Apply"}
        </Button>
    </Card>
  )
}

export default JobCard;