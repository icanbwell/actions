import core from "@actions/core";
import github from "@actions/github";

export async function getLatestReleaseTag() {
  const token = core.getInput("auth-token") || process.env.GITHUB_TOKEN;
  if (!token) throw new Error("auth-token is a required field");
  const octokit = github.getOctokit(token);
  const repo = core.getInput("repo") || github.context.payload.repository?.name;
  if (!repo) throw new Error("repo is a required field");
  const releases = await octokit.request(
    "GET /repos/{owner}/{repo}/releases/latest",
    {
      owner: core.getInput("owner"),
      repo,
    }
  );
  core.setOutput("tag", releases.data.tag_name);
  console.log(JSON.stringify(releases.data, null, 2));
}
