import React, { useReducer, useState, useCallback } from 'react';
import JobSetEditorDispatchContext from './JobSetEditorDispatchContext';
import JobSetEditorStateContext from './JobSetEditorStateContext';
import reducer, { init as jobSetEditorInit } from './store/reducer';
import { Fab, Tooltip } from '@material-ui/core';
import { Code } from '@material-ui/icons';
import Title from './Title';
// import Machines from './Machines';
// import Jobs from './Jobs';
// import TimeOptions from './TimeOptions';
// import JsonEditor from './JsonEditor';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

const JobSetEditor = () => {
  const [isJsonEditorOpen, setIsJsonEditorOpen] = useState(false);
  const openJsonEditorCallback = useCallback(
    () => setIsJsonEditorOpen(true),
    []
  );
  const closeJsonEditorCallback = useCallback(
    () => setIsJsonEditorOpen(false),
    []
  );
  return (
    <SplitterLayout primaryIndex={1} >
      <form>
        <h1>New Job Set</h1>
        <Tooltip
          title={isJsonEditorOpen ? "Already opened JSON Editor" : "Open JSON Editor"}
        >
          <div style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            margin: "16px"
          }}>
            <Fab disabled={isJsonEditorOpen} onClick={openJsonEditorCallback}>
              <Code />
            </Fab>
          </div>
          {/* add error*/}
        </Tooltip>
        <Title />
        {/* <Machines />
        <Jobs />
        <TimeOptions /> */}
      </form>
      {isJsonEditorOpen ? null/*<JsonEditor closeJsonEditorCallback={closeJsonEditorCallback} />*/ : null}
    </SplitterLayout >
  );
};

// const JobSetEditorContainer = () => {
//   const [isJsonEditorOpen, setIsJsonEditorOpen] = useState(false);
//   const openJsonEditorCallback = useCallback(
//     () => setIsJsonEditorOpen(true),
//     []
//   );
//   const closeJsonEditorCallback = useCallback(
//     () => setIsJsonEditorOpen(false),
//     []
//   );
//   return (
    
//   );
// };

const JobSetEditorWithContext = ({
  title,
  description,
  jobSet = {},
  isAutoTimeOptions,
  timeOptions,
  jobColors
}) => {
  const { machines, jobs } = jobSet;
  const [state, dispatch] = useReducer(
    reducer,
    {
      title,
      description,
      machines,
      jobs,
      isAutoTimeOptions,
      timeOptions,
      jobColors
    },
    jobSetEditorInit
  );
  return (
    <JobSetEditorDispatchContext.Provider value={dispatch}>
      <JobSetEditorStateContext.Provider value={state}>
        <JobSetEditor />
      </JobSetEditorStateContext.Provider>
    </JobSetEditorDispatchContext.Provider>
  );
};

export default JobSetEditorWithContext;