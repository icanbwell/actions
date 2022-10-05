import * as core from "@actions/core";
import * as github from "@actions/github";

export async function getLatestReleaseTag() {
  const token = core.getInput("auth-token") || process.env.GITHUB_TOKEN;
  const octokit = github.getOctokit(token);
  const releases = await octokit.request(
    "GET /repos/{owner}/{repo}/releases/latest",
    {
      owner: core.getInput("owner"),
      repo: core.getInput("repo") || github.context.payload.repository.name,
    }
  );
  core.setOutput("tag", releases.data.tag_name);
}
