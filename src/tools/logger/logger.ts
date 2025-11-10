import { createLogger, format, transports } from "winston"

function newLogger(level: string) {
  return createLogger({
    level,
    format: format.combine(format.timestamp(), format.json()),
    silent: level === "silent",
    transports: [new transports.Console()],
  })
}

export { newLogger }
