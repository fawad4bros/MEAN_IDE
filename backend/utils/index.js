const { CodeQueue } = require("../../jobWorker/index");
const connections = require("../bin/connections");
const { OtsError } = require("../../common/index");
module.exports = class OtsUtil {
  static async createCodeJob(userid, code) {
    await CodeQueue.add("POST_SUBMISSION", { code, userid });
  }
  static processRequest(func) {
    return async (req, res) => {
      try {
        const result = await func(req, res);
        res.status(result.status).json(result.data);
      } catch (error) {
        if (!(error instanceof OtsError)) {
          error = new OtsError(500, error.message);
        }
        res.status(error.code).json(error.body);
      }
    };
  }
  static getSubListener = () => {
    CodeQueue.on("completed", (job, result) => {
      if (job.name === "GET_SUBMISSION")
        connections[job.data.userid].emit("compilation-result", result);
    });

    CodeQueue.on("failed", (job, error) => {
      // if (job.name === 'GET_SUBMISSION' && error.message == 'Submission incomplete')
      //   job.retry();
    });
  };
};
