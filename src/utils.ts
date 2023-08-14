
import { UserModel } from "./models/user.js";
import { RoleModel } from "./models/role.js";
import { TaskModel } from "./models/task.js";
import { ProjectModel } from "./models/project.js";

export const getUser = async filter => {
  let data = await UserModel.findOne(filter);
  let roles = getRoles.bind(this, {
    _id: { $in: data.roles },
  });
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    roles,
  };
};

export const getUsers = async filter => {
  let users = await UserModel.find(filter);
  return await Promise.all(users.map(async user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    roles: getRoles.bind(this, {
      _id: { $in: user.roles },
    }),
  })));
};

export const getRole = async filter => {
  return await RoleModel.findOne(filter);
};

export const getRoles = async filter => {
  return await RoleModel.find(filter);
};

export const getTask = async filter => {
  let task = await TaskModel.findOne(filter);
  let project = getProject.bind(this, {
    _id: task.project,
  });
  let assignees = getUsers.bind(this, {
    _id: { $in: task.assignees },
  });

  return {
    id: task.id,
    title: task.title,
    description: task.description,
    project,
    assignees,
  }
};

export const getTasks = async filters => {
  let tasks = await TaskModel.find(filters);
  return await Promise.all(tasks.map(async task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    project: getProject.bind(this, {
      _id: task.project,
    }),
    assignees: getUsers.bind(this, {
      _id: { $in: task.assignees },
    }),
  })));
};

export const getProject = async filters => {
  let project = await ProjectModel.findOne(filters);
  let assignees = getUsers.bind(this, {
    _id: { $in: project.assignees },
  });
  let tasksbyProjectID = async projectID => await TaskModel.where('project').equals(projectID);

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    tasks: tasksbyProjectID.bind(this, project.id),
    assignees,
  };
};

export const getProjects = async filter => {
  let projects = await ProjectModel.find(filter);
  let tasksbyProjectID = async projectID => await TaskModel.where('project').equals(projectID);

  projects.map(async project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    tasks: tasksbyProjectID.bind(this, project.id),
    assignees: getUsers.bind(this, {
      _id: { $in: project.assignees },
    }),
  }));
};