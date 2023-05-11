// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Project, User, Task, TimeEntry, Report } = initSchema(schema);

export {
  Project,
  User,
  Task,
  TimeEntry,
  Report
};