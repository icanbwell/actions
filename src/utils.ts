import events = require("events");
import fs = require("fs");
import readline = require("readline");

export type ProcessLineByLineArgs = {
  file: string;
  callback: (line: string) => void;
};

export async function processLineByLine({
  file,
  callback,
}: ProcessLineByLineArgs) {
  const rl = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity,
  });
  rl.on("line", callback);
  await events.once(rl, "close");
}
