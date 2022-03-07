const axios = require("axios");

exports.getSubmission = async (tokens) => {
  const options = {
    method: "GET",
    url: `https://judge0-ce.p.rapidapi.com/submissions/${tokens}`,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "x-rapidapi-key": "",
    },
  };
  return axios.request(options);
};

exports.postSubmission = (code) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: { base64_encoded: "true", fields: "*", wait: false },
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "x-rapidapi-key": "",
    },
    data: code,
  };
  return axios.request(options);
};
