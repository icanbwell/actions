import * as core from "@actions/core";
import github from "@actions/github";

const octokit = github.getOctokit(core.getInput("auth-token"));

const releases = await octokit.request(
  "GET /repos/{owner}/{repo}/releases/latest",
  {
    owner: core.getInput("owner"),
    repo: core.getInput("repo") || github.context.payload.repository.name,
  }
);
core.setOutput("tag", releases.data.tag_name);
