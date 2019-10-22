import { useMemo, useContext } from 'react';
import JobShopCollectionStateContext from '../components/JobShopCollectionStateContext';

export const useSnackbar = () => {
  const state = useContext(JobShopCollectionStateContext);
  const { isOpen, message } = state.snackbar;
  return [isOpen, message];
};

export const useJobSetIds = () => {
  const state = useContext(JobShopCollectionStateContext);
  const jobSetIds = useMemo(
    () => {
      return Object.keys(state.jobSets).sort((a, b) => parseInt(b) - parseInt(a));
    },
    [state.jobSets]
  )
  return jobSetIds;
};

export const useGetJobSetIsLoading = () => {
  const state = useContext(JobShopCollectionStateContext);
  return state.getJobSetIsLoading;
};

export const useGetJobSetFailedMessage = () => {
  const state = useContext(JobShopCollectionStateContext);
  return state.getJobSetFailedMessage;
};

export const useJobSetHeaders = () => {
  const state = useContext(JobShopCollectionStateContext);
  const jobSetHeaders = useMemo(
    () => {
      return Object.keys(state.jobSets)
        .map(id => {
          const jobSet = state.jobSets[id];
          return {
            id: jobSet.id,
            title: jobSet.title,
            description: jobSet.description,
            eTag: jobSet.eTag
          }
        });
    },
    [state.jobSets]
  )
  return jobSetHeaders;
}

export const useJobSetHeader = id => {
  const state = useContext(JobShopCollectionStateContext);
  const jobSet = state.jobSets[id];
  const jobSetHeader = useMemo(
    () => {
      if (!jobSet) {
        return undefined;
      }
      return {
        id: jobSet.id,
        title: jobSet.title,
        description: jobSet.description,
        eTag: jobSet.eTag
      };
    },
    [jobSet]
  )
  return jobSetHeader;
};

// returns [isDeleting, deleteSucceed, deleteFailed]
export const useJobSetDeleting = id => {
  const state = useContext(JobShopCollectionStateContext);
  const deletingJobSet = state.deletingJobSets[id];
  if (deletingJobSet === undefined) {
    const isDeleting = false;
    const deleteSucceed = false;
    const deleteFailed = false;
    return [isDeleting, deleteSucceed, deleteFailed];
  }
  const isDeleting = true;
  const deleteSucceed = deletingJobSet.succeed;
  const deleteFailed = deletingJobSet.failed;
  return [isDeleting, deleteSucceed, deleteFailed];
};

export const useJobSetSomeDeleting = () => {
  const state = useContext(JobShopCollectionStateContext);
  const someDeleting = Object.keys(state.deletingJobSets).length > 0;
  return someDeleting;
};

export const useSelectedJobSets = idArray => {
  const state = useContext(JobShopCollectionStateContext);
  const selectedJobSets = useMemo(
    () => idArray.map(id => state.jobSets[id]).filter(js => js),
    [state.jobSets, idArray]
  );
  return selectedJobSets;
};

export const useJobSet = id => {
  const state = useContext(JobShopCollectionStateContext);
  return state.jobSets[id];
};

// returns true when there is no jobSet in redux store
export const useIsLoadingJobSet = id => {
  const state = useContext(JobShopCollectionStateContext);
  const jobSet = state.jobSets[id];
  return jobSet ? jobSet.isLoading : true;
};

export const useLoadJobSetFailedMessage = id => {
  const state = useContext(JobShopCollectionStateContext);
  const jobSet = state.jobSets[id];
  return jobSet ? jobSet.loadFailedMessage : undefined;
};