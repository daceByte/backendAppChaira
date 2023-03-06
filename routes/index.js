module.exports = {
  start: require("./start"),
  api: require("./ApiRoutes/status"),
  apiSchedule: require("./ApiRoutes/schedule"),
  apiDataStudent: require("./ApiRoutes/dataStudent"),
  apiSubjects: require("./ApiRoutes/AddAndCancelSubjects"),
  apiRegisterExtend: require('./ApiRoutes/apiRegisterExtend'),
};
