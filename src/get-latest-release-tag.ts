import * as core from "@actions/core";
import * as github from "@actions/github";

type GetLatestReleaseTagArgs = {
  repo?: string;
  org?: string;
};
export async function getLatestReleaseTag(
  args?: GetLatestReleaseTagArgs
) {
  const token = core.getInput("auth-token") || process.env.GITHUB_TOKEN;
  if (!token) throw new Error("auth-token is a required field");
  const octokit = github.getOctokit(token);
  const repo =
    args.repo ||
    core.getInput("repo") ||
    github.context.payload.repository?.name;
  if (!repo) throw new Error("repo is a required field");
  const releases = await octokit.request(
    "GET /repos/{owner}/{repo}/releases/latest",
    {
      owner:
        args.org ||
        core.getInput("owner") ||
        core.getInput("org") ||
        "icanbwell",
      repo,
    }
  );
  const { tag_name } = releases.data;
  core.setOutput("tag", tag_name);
  return tag_name;
}
