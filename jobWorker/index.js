const Queue = require("bull");
const judge = require("./src/worker/judge");

const CodeQueue = new Queue("code-queue", {
  redis: { port: 6379, host: "localhost" /*, password: 'password' */ },
});
CodeQueue.process("POST_SUBMISSION", async (job) => {
  console.log("job", job);
  try {
    const response = await judge.postSubmission(job.data.code);
    CodeQueue.add(
      "GET_SUBMISSION",
      { token: response.data.token, userid: job.data.userid },
      { backoff: { type: "exponential", delay: 500 }, attempts: 5 }
    );

    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(new Error(`${err}`));
  }
});
CodeQueue.process("GET_SUBMISSION", async (job) => {
  try {
    const result = await judge.getSubmission(job.data.token);
    if (![1, 2, 13].includes(result.data.status.id)) {
      return result.data;
    }

    //1:"In Queue", 2:"Processing", 13:"Internal Error", occurres retry, limit 5
    else {
      throw "Submission incomplete";
    }
  } catch (err) {
    if (err !== "Submission incomplete") {
      await job.discard();
      console.log("Job Discarded due to error: ", err);
    }
    return Promise.reject(new Error(`${err}`));
    //(Failed => Delayed => active)
  }
});

module.exports = {
  CodeQueue,
};
