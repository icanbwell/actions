import * as core from "@actions/core";
import * as github from "@actions/github";

const octokit = github.getOctokit(core.getInput("auth-token"));

const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();
console.log("Hello, %s", login);

const releases = await octokit.request(
  "GET /repos/{owner}/{repo}/releases/latest",
  {
    owner: core.getInput("owner"),
    repo: core.getInput("repo"),
  }
);
console.log(releases.data.tag_name);
core.setOutput("tag", releases.data.tag_name);
