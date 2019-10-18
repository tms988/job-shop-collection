import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tooltip } from '@material-ui/core';
import { useJobIds } from './store/useSelectors';
import Job from './Job';
import CreateJob from './CreateJob';

const useStyles = makeStyles(theme => ({
  list: {
    listStyleType: "none",
    marginBlockStart: 0,
    marginBlockEnd: 0,
    marginInlineStart: 0,
    marginInlineEnd: 0,
    paddingInlineStart: 0,
  }
}));

const Jobs = React.memo(({
  jobIds,
  count
}) => {
  const classes = useStyles();
  const countMessage = count === 0 ? "" : ` (${count})`;
  
  return (
    <section>
      <h2>
        Jobs
      <Tooltip title={`${count} Jobs`}><span>{countMessage}</span></Tooltip>
      </h2>
      {count === 0 ? <Box fontStyle="italic" color="text.hint"> No jobs</Box> : null}
      <ol className={classes.list}>
        {jobIds.map(id => <li key={id}><Job id={id} /></li>)}
        <li key="createJob"><CreateJob /></li>
      </ol>
    </section>
  );
});

const JobsContainer = () => {
  const jobIds = useJobIds();
  const count = jobIds.length;
  return (
    <Jobs
      jobIds={jobIds}
      count={count}
    />
  );
};

export default JobsContainer;