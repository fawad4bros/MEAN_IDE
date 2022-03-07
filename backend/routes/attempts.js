const express = require("express");
const _ = require("lodash");

// const { Factory } = req  uire('ots-common');
const OtsUtil = require("../utils/index");

const router = express.Router();

const IS_EMPTY_MESSAGE = {
  status: 400,
  data: {
    response: "Content cannot be empty! ",
  },
};

router.get(
  "/:id",
  OtsUtil.processRequest(() => {})
);

router.post(
  "/",
  OtsUtil.processRequest(async (req) => {
    if (_.isEmpty(req.body)) {
      return IS_EMPTY_MESSAGE;
    }
    try {
      // console.log("req", req);
      // console.log("req.data.id", req.data.id);
      await OtsUtil.createCodeJob(1, req.body);
      return {
        status: 200,
        data: {
          response: "Code Submitted",
        },
      };
    } catch (err) {
      return {
        status: 400,
        data: {
          response: `Error: ${err.message}`,
        },
      };
    }
  })
);

router.put(
  "/:id",
  OtsUtil.processRequest(() => {})
);

module.exports = router;
