import * as core from "@actions/core";
import * as github from "@actions/github";

const token = core.getInput("auth-token") || process.env.GITHUB_TOKEN;
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

