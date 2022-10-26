import * as core from "@actions/core";
import * as github from "@actions/github";

export async function getPublishedVersion() {
  const token = core.getInput("auth-token") || process.env.GITHUB_TOKEN;
  if (!token) throw new Error("auth-token is a required field");
  const octokit = github.getOctokit(token);
  const versions = await octokit.request(
    "GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
    {
      package_type: "npm",
      package_name: core.getInput("package-name"),
      org: core.getInput("org"),
    }
  );
  core.setOutput("published-version", versions.data[0].name);
  console.log({ "published-version": versions.data[0].name });
}
