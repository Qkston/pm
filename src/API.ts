/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProjectInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  start_date: string,
  finish_date?: string | null,
};

export type ModelProjectConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  finish_date?: ModelStringInput | null,
  and?: Array< ModelProjectConditionInput | null > | null,
  or?: Array< ModelProjectConditionInput | null > | null,
  not?: ModelProjectConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Project = {
  __typename: "Project",
  id: string,
  name: string,
  description?: string | null,
  start_date: string,
  finish_date?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateProjectInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  start_date?: string | null,
  finish_date?: string | null,
};

export type DeleteProjectInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  project_ids?: Array< string > | null,
};

export type ModelUserConditionInput = {
  first_name?: ModelStringInput | null,
  last_name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  password?: ModelStringInput | null,
  project_ids?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  project_ids?: Array< string > | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  first_name?: string | null,
  last_name?: string | null,
  email?: string | null,
  password?: string | null,
  project_ids?: Array< string > | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateTaskInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  status: string,
  create_date: string,
  deadline: string,
  project_id: string,
  user_id?: string | null,
};

export type ModelTaskConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  status?: ModelStringInput | null,
  create_date?: ModelStringInput | null,
  deadline?: ModelStringInput | null,
  project_id?: ModelIDInput | null,
  user_id?: ModelIDInput | null,
  and?: Array< ModelTaskConditionInput | null > | null,
  or?: Array< ModelTaskConditionInput | null > | null,
  not?: ModelTaskConditionInput | null,
};

export type Task = {
  __typename: "Task",
  id: string,
  title: string,
  description?: string | null,
  status: string,
  create_date: string,
  deadline: string,
  project_id: string,
  user_id?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTaskInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  status?: string | null,
  create_date?: string | null,
  deadline?: string | null,
  project_id?: string | null,
  user_id?: string | null,
};

export type DeleteTaskInput = {
  id: string,
};

export type CreateTimeEntryInput = {
  id?: string | null,
  task_id: string,
  user_id: string,
  start: string,
  end?: string | null,
};

export type ModelTimeEntryConditionInput = {
  task_id?: ModelIDInput | null,
  user_id?: ModelIDInput | null,
  start?: ModelStringInput | null,
  end?: ModelStringInput | null,
  and?: Array< ModelTimeEntryConditionInput | null > | null,
  or?: Array< ModelTimeEntryConditionInput | null > | null,
  not?: ModelTimeEntryConditionInput | null,
};

export type TimeEntry = {
  __typename: "TimeEntry",
  id: string,
  task_id: string,
  user_id: string,
  start: string,
  end?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTimeEntryInput = {
  id: string,
  task_id?: string | null,
  user_id?: string | null,
  start?: string | null,
  end?: string | null,
};

export type DeleteTimeEntryInput = {
  id: string,
};

export type CreateReportInput = {
  id?: string | null,
  description?: string | null,
  duration: number,
  start: string,
  end?: string | null,
  project_id: string,
  task_id?: string | null,
  user_id?: string | null,
};

export type ModelReportConditionInput = {
  description?: ModelStringInput | null,
  duration?: ModelIntInput | null,
  start?: ModelStringInput | null,
  end?: ModelStringInput | null,
  project_id?: ModelIDInput | null,
  task_id?: ModelIDInput | null,
  user_id?: ModelIDInput | null,
  and?: Array< ModelReportConditionInput | null > | null,
  or?: Array< ModelReportConditionInput | null > | null,
  not?: ModelReportConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Report = {
  __typename: "Report",
  id: string,
  description?: string | null,
  duration: number,
  start: string,
  end?: string | null,
  project_id: string,
  task_id?: string | null,
  user_id?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateReportInput = {
  id: string,
  description?: string | null,
  duration?: number | null,
  start?: string | null,
  end?: string | null,
  project_id?: string | null,
  task_id?: string | null,
  user_id?: string | null,
};

export type DeleteReportInput = {
  id: string,
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  finish_date?: ModelStringInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelProjectConnection = {
  __typename: "ModelProjectConnection",
  items:  Array<Project | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  first_name?: ModelStringInput | null,
  last_name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  password?: ModelStringInput | null,
  project_ids?: ModelIDInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelTaskFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  status?: ModelStringInput | null,
  create_date?: ModelStringInput | null,
  deadline?: ModelStringInput | null,
  project_id?: ModelIDInput | null,
  user_id?: ModelIDInput | null,
  and?: Array< ModelTaskFilterInput | null > | null,
  or?: Array< ModelTaskFilterInput | null > | null,
  not?: ModelTaskFilterInput | null,
};

export type ModelTaskConnection = {
  __typename: "ModelTaskConnection",
  items:  Array<Task | null >,
  nextToken?: string | null,
};

export type ModelTimeEntryFilterInput = {
  id?: ModelIDInput | null,
  task_id?: ModelIDInput | null,
  user_id?: ModelIDInput | null,
  start?: ModelStringInput | null,
  end?: ModelStringInput | null,
  and?: Array< ModelTimeEntryFilterInput | null > | null,
  or?: Array< ModelTimeEntryFilterInput | null > | null,
  not?: ModelTimeEntryFilterInput | null,
};

export type ModelTimeEntryConnection = {
  __typename: "ModelTimeEntryConnection",
  items:  Array<TimeEntry | null >,
  nextToken?: string | null,
};

export type ModelReportFilterInput = {
  id?: ModelIDInput | null,
  description?: ModelStringInput | null,
  duration?: ModelIntInput | null,
  start?: ModelStringInput | null,
  end?: ModelStringInput | null,
  project_id?: ModelIDInput | null,
  task_id?: ModelIDInput | null,
  user_id?: ModelIDInput | null,
  and?: Array< ModelReportFilterInput | null > | null,
  or?: Array< ModelReportFilterInput | null > | null,
  not?: ModelReportFilterInput | null,
};

export type ModelReportConnection = {
  __typename: "ModelReportConnection",
  items:  Array<Report | null >,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionProjectFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  start_date?: ModelSubscriptionStringInput | null,
  finish_date?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProjectFilterInput | null > | null,
  or?: Array< ModelSubscriptionProjectFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  first_name?: ModelSubscriptionStringInput | null,
  last_name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  password?: ModelSubscriptionStringInput | null,
  project_ids?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionTaskFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  create_date?: ModelSubscriptionStringInput | null,
  deadline?: ModelSubscriptionStringInput | null,
  project_id?: ModelSubscriptionIDInput | null,
  user_id?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionTaskFilterInput | null > | null,
  or?: Array< ModelSubscriptionTaskFilterInput | null > | null,
};

export type ModelSubscriptionTimeEntryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  task_id?: ModelSubscriptionIDInput | null,
  user_id?: ModelSubscriptionIDInput | null,
  start?: ModelSubscriptionStringInput | null,
  end?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTimeEntryFilterInput | null > | null,
  or?: Array< ModelSubscriptionTimeEntryFilterInput | null > | null,
};

export type ModelSubscriptionReportFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  description?: ModelSubscriptionStringInput | null,
  duration?: ModelSubscriptionIntInput | null,
  start?: ModelSubscriptionStringInput | null,
  end?: ModelSubscriptionStringInput | null,
  project_id?: ModelSubscriptionIDInput | null,
  task_id?: ModelSubscriptionIDInput | null,
  user_id?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionReportFilterInput | null > | null,
  or?: Array< ModelSubscriptionReportFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type CreateProjectMutation = {
  createProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    start_date: string,
    finish_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type UpdateProjectMutation = {
  updateProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    start_date: string,
    finish_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type DeleteProjectMutation = {
  deleteProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    start_date: string,
    finish_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    project_ids?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    project_ids?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    project_ids?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTaskMutationVariables = {
  input: CreateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type CreateTaskMutation = {
  createTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    status: string,
    create_date: string,
    deadline: string,
    project_id: string,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTaskMutationVariables = {
  input: UpdateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type UpdateTaskMutation = {
  updateTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    status: string,
    create_date: string,
    deadline: string,
    project_id: string,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTaskMutationVariables = {
  input: DeleteTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type DeleteTaskMutation = {
  deleteTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    status: string,
    create_date: string,
    deadline: string,
    project_id: string,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTimeEntryMutationVariables = {
  input: CreateTimeEntryInput,
  condition?: ModelTimeEntryConditionInput | null,
};

export type CreateTimeEntryMutation = {
  createTimeEntry?:  {
    __typename: "TimeEntry",
    id: string,
    task_id: string,
    user_id: string,
    start: string,
    end?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTimeEntryMutationVariables = {
  input: UpdateTimeEntryInput,
  condition?: ModelTimeEntryConditionInput | null,
};

export type UpdateTimeEntryMutation = {
  updateTimeEntry?:  {
    __typename: "TimeEntry",
    id: string,
    task_id: string,
    user_id: string,
    start: string,
    end?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTimeEntryMutationVariables = {
  input: DeleteTimeEntryInput,
  condition?: ModelTimeEntryConditionInput | null,
};

export type DeleteTimeEntryMutation = {
  deleteTimeEntry?:  {
    __typename: "TimeEntry",
    id: string,
    task_id: string,
    user_id: string,
    start: string,
    end?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateReportMutationVariables = {
  input: CreateReportInput,
  condition?: ModelReportConditionInput | null,
};

export type CreateReportMutation = {
  createReport?:  {
    __typename: "Report",
    id: string,
    description?: string | null,
    duration: number,
    start: string,
    end?: string | null,
    project_id: string,
    task_id?: string | null,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateReportMutationVariables = {
  input: UpdateReportInput,
  condition?: ModelReportConditionInput | null,
};

export type UpdateReportMutation = {
  updateReport?:  {
    __typename: "Report",
    id: string,
    description?: string | null,
    duration: number,
    start: string,
    end?: string | null,
    project_id: string,
    task_id?: string | null,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteReportMutationVariables = {
  input: DeleteReportInput,
  condition?: ModelReportConditionInput | null,
};

export type DeleteReportMutation = {
  deleteReport?:  {
    __typename: "Report",
    id: string,
    description?: string | null,
    duration: number,
    start: string,
    end?: string | null,
    project_id: string,
    task_id?: string | null,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetProjectQueryVariables = {
  id: string,
};

export type GetProjectQuery = {
  getProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    start_date: string,
    finish_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects?:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      name: string,
      description?: string | null,
      start_date: string,
      finish_date?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    project_ids?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      first_name: string,
      last_name: string,
      email: string,
      password: string,
      project_ids?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTaskQueryVariables = {
  id: string,
};

export type GetTaskQuery = {
  getTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    status: string,
    create_date: string,
    deadline: string,
    project_id: string,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTasksQueryVariables = {
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTasksQuery = {
  listTasks?:  {
    __typename: "ModelTaskConnection",
    items:  Array< {
      __typename: "Task",
      id: string,
      title: string,
      description?: string | null,
      status: string,
      create_date: string,
      deadline: string,
      project_id: string,
      user_id?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTimeEntryQueryVariables = {
  id: string,
};

export type GetTimeEntryQuery = {
  getTimeEntry?:  {
    __typename: "TimeEntry",
    id: string,
    task_id: string,
    user_id: string,
    start: string,
    end?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTimeEntriesQueryVariables = {
  filter?: ModelTimeEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTimeEntriesQuery = {
  listTimeEntries?:  {
    __typename: "ModelTimeEntryConnection",
    items:  Array< {
      __typename: "TimeEntry",
      id: string,
      task_id: string,
      user_id: string,
      start: string,
      end?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetReportQueryVariables = {
  id: string,
};

export type GetReportQuery = {
  getReport?:  {
    __typename: "Report",
    id: string,
    description?: string | null,
    duration: number,
    start: string,
    end?: string | null,
    project_id: string,
    task_id?: string | null,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListReportsQueryVariables = {
  filter?: ModelReportFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReportsQuery = {
  listReports?:  {
    __typename: "ModelReportConnection",
    items:  Array< {
      __typename: "Report",
      id: string,
      description?: string | null,
      duration: number,
      start: string,
      end?: string | null,
      project_id: string,
      task_id?: string | null,
      user_id?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TasksByProject_idQueryVariables = {
  project_id: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TasksByProject_idQuery = {
  tasksByProject_id?:  {
    __typename: "ModelTaskConnection",
    items:  Array< {
      __typename: "Task",
      id: string,
      title: string,
      description?: string | null,
      status: string,
      create_date: string,
      deadline: string,
      project_id: string,
      user_id?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TasksByUser_idQueryVariables = {
  user_id: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TasksByUser_idQuery = {
  tasksByUser_id?:  {
    __typename: "ModelTaskConnection",
    items:  Array< {
      __typename: "Task",
      id: string,
      title: string,
      description?: string | null,
      status: string,
      create_date: string,
      deadline: string,
      project_id: string,
      user_id?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TimeEntriesByTask_idQueryVariables = {
  task_id: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTimeEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TimeEntriesByTask_idQuery = {
  timeEntriesByTask_id?:  {
    __typename: "ModelTimeEntryConnection",
    items:  Array< {
      __typename: "TimeEntry",
      id: string,
      task_id: string,
      user_id: string,
      start: string,
      end?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TimeEntriesByUser_idQueryVariables = {
  user_id: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTimeEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TimeEntriesByUser_idQuery = {
  timeEntriesByUser_id?:  {
    __typename: "ModelTimeEntryConnection",
    items:  Array< {
      __typename: "TimeEntry",
      id: string,
      task_id: string,
      user_id: string,
      start: string,
      end?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ReportsByProject_idQueryVariables = {
  project_id: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReportFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ReportsByProject_idQuery = {
  reportsByProject_id?:  {
    __typename: "ModelReportConnection",
    items:  Array< {
      __typename: "Report",
      id: string,
      description?: string | null,
      duration: number,
      start: string,
      end?: string | null,
      project_id: string,
      task_id?: string | null,
      user_id?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ReportsByTask_idQueryVariables = {
  task_id: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReportFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ReportsByTask_idQuery = {
  reportsByTask_id?:  {
    __typename: "ModelReportConnection",
    items:  Array< {
      __typename: "Report",
      id: string,
      description?: string | null,
      duration: number,
      start: string,
      end?: string | null,
      project_id: string,
      task_id?: string | null,
      user_id?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ReportsByUser_idQueryVariables = {
  user_id: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReportFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ReportsByUser_idQuery = {
  reportsByUser_id?:  {
    __typename: "ModelReportConnection",
    items:  Array< {
      __typename: "Report",
      id: string,
      description?: string | null,
      duration: number,
      start: string,
      end?: string | null,
      project_id: string,
      task_id?: string | null,
      user_id?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    start_date: string,
    finish_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    start_date: string,
    finish_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    start_date: string,
    finish_date?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    project_ids?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    project_ids?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    project_ids?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTaskSubscriptionVariables = {
  filter?: ModelSubscriptionTaskFilterInput | null,
};

export type OnCreateTaskSubscription = {
  onCreateTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    status: string,
    create_date: string,
    deadline: string,
    project_id: string,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTaskSubscriptionVariables = {
  filter?: ModelSubscriptionTaskFilterInput | null,
};

export type OnUpdateTaskSubscription = {
  onUpdateTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    status: string,
    create_date: string,
    deadline: string,
    project_id: string,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTaskSubscriptionVariables = {
  filter?: ModelSubscriptionTaskFilterInput | null,
};

export type OnDeleteTaskSubscription = {
  onDeleteTask?:  {
    __typename: "Task",
    id: string,
    title: string,
    description?: string | null,
    status: string,
    create_date: string,
    deadline: string,
    project_id: string,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTimeEntrySubscriptionVariables = {
  filter?: ModelSubscriptionTimeEntryFilterInput | null,
};

export type OnCreateTimeEntrySubscription = {
  onCreateTimeEntry?:  {
    __typename: "TimeEntry",
    id: string,
    task_id: string,
    user_id: string,
    start: string,
    end?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTimeEntrySubscriptionVariables = {
  filter?: ModelSubscriptionTimeEntryFilterInput | null,
};

export type OnUpdateTimeEntrySubscription = {
  onUpdateTimeEntry?:  {
    __typename: "TimeEntry",
    id: string,
    task_id: string,
    user_id: string,
    start: string,
    end?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTimeEntrySubscriptionVariables = {
  filter?: ModelSubscriptionTimeEntryFilterInput | null,
};

export type OnDeleteTimeEntrySubscription = {
  onDeleteTimeEntry?:  {
    __typename: "TimeEntry",
    id: string,
    task_id: string,
    user_id: string,
    start: string,
    end?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateReportSubscriptionVariables = {
  filter?: ModelSubscriptionReportFilterInput | null,
};

export type OnCreateReportSubscription = {
  onCreateReport?:  {
    __typename: "Report",
    id: string,
    description?: string | null,
    duration: number,
    start: string,
    end?: string | null,
    project_id: string,
    task_id?: string | null,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateReportSubscriptionVariables = {
  filter?: ModelSubscriptionReportFilterInput | null,
};

export type OnUpdateReportSubscription = {
  onUpdateReport?:  {
    __typename: "Report",
    id: string,
    description?: string | null,
    duration: number,
    start: string,
    end?: string | null,
    project_id: string,
    task_id?: string | null,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteReportSubscriptionVariables = {
  filter?: ModelSubscriptionReportFilterInput | null,
};

export type OnDeleteReportSubscription = {
  onDeleteReport?:  {
    __typename: "Report",
    id: string,
    description?: string | null,
    duration: number,
    start: string,
    end?: string | null,
    project_id: string,
    task_id?: string | null,
    user_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
