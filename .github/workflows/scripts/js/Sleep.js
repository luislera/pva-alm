const dispatchWorkflow = async (github, context, id, reference, parameters) => {
  await github.rest.actions.createWorkflowDispatch({
    owner: context.repo.owner,
    repo: context.repo.repo,
    workflow_id: id,
    ref: reference,
    inputs: parameters
  })
}
const checkworkflow = async (github, context, id) => {
  let currentStatus = null;
  let conclusion = null;
  sleep(2000)
  do {
    let workflowLog = await github.rest.actions.listWorkflowRuns({
      owner: context.repo.owner,
      repo: context.repo.repo,
      workflow_id: id,
      per_page: 1
    })
    if (workflowLog.data.total_count > 0) {
      currentStatus = workflowLog.data.workflow_runs[0].status
      conclusion = workflowLog.data.workflow_runs[0].conclusion
    }
    else {
      break
    }
    console.log(id + ' status: ' + currentStatus)
    sleep(20000)
  } while (currentStatus != 'completed');
  return conclusion
}
const sleep = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
module.exports = {
  dispatchWorkflow,
  checkworkflow
}