const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const logConfiguration = {
  transports: [
    new winston.transports.File({
      filename: process.env.LOG_BASE_PATH + "/access.log",
    }),
    new winston.transports.File({
      level: "error",
      // Create the log directory if it does not exist
      filename: process.env.LOG_BASE_PATH + "/error.log",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
};

exports.logger = winston.createLogger(logConfiguration);
exports.error = (req, message) => {
  const date = new Date();
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
    .replace(/\//g, "-")
    .replace(",", "");
  console.log(formattedDate);
  this.logger.error(formattedDate + " " + req.url + " " + message);
};
