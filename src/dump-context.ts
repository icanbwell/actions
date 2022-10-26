import * as github from "@actions/github";

export function dumpContext() {
  console.log(JSON.stringify(github.context, null, 2));
}
