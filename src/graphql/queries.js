/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      description
      start_date
      finish_date
      createdAt
      updatedAt
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        start_date
        finish_date
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      first_name
      last_name
      email
      password
      project_ids
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        first_name
        last_name
        email
        password
        project_ids
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      title
      description
      status
      create_date
      deadline
      project_id
      user_id
      createdAt
      updatedAt
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        status
        create_date
        deadline
        project_id
        user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTimeEntry = /* GraphQL */ `
  query GetTimeEntry($id: ID!) {
    getTimeEntry(id: $id) {
      id
      task_id
      user_id
      start
      end
      createdAt
      updatedAt
    }
  }
`;
export const listTimeEntries = /* GraphQL */ `
  query ListTimeEntries(
    $filter: ModelTimeEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTimeEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        task_id
        user_id
        start
        end
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
      id
      description
      duration
      start
      end
      project_id
      task_id
      user_id
      createdAt
      updatedAt
    }
  }
`;
export const listReports = /* GraphQL */ `
  query ListReports(
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        duration
        start
        end
        project_id
        task_id
        user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tasksByProject_id = /* GraphQL */ `
  query TasksByProject_id(
    $project_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tasksByProject_id(
      project_id: $project_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        status
        create_date
        deadline
        project_id
        user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tasksByUser_id = /* GraphQL */ `
  query TasksByUser_id(
    $user_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tasksByUser_id(
      user_id: $user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        status
        create_date
        deadline
        project_id
        user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const timeEntriesByTask_id = /* GraphQL */ `
  query TimeEntriesByTask_id(
    $task_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTimeEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    timeEntriesByTask_id(
      task_id: $task_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        task_id
        user_id
        start
        end
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const timeEntriesByUser_id = /* GraphQL */ `
  query TimeEntriesByUser_id(
    $user_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTimeEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    timeEntriesByUser_id(
      user_id: $user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        task_id
        user_id
        start
        end
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const reportsByProject_id = /* GraphQL */ `
  query ReportsByProject_id(
    $project_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reportsByProject_id(
      project_id: $project_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        description
        duration
        start
        end
        project_id
        task_id
        user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const reportsByTask_id = /* GraphQL */ `
  query ReportsByTask_id(
    $task_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reportsByTask_id(
      task_id: $task_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        description
        duration
        start
        end
        project_id
        task_id
        user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const reportsByUser_id = /* GraphQL */ `
  query ReportsByUser_id(
    $user_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reportsByUser_id(
      user_id: $user_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        description
        duration
        start
        end
        project_id
        task_id
        user_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
