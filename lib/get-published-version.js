import * as core from "@actions/core";
import * as github from "@actions/github";

const octokit = github.getOctokit(core.getInput("auth-token"));

const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();
console.log(`Hello, ${login}`);

const versions = await octokit.request(
  "GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
  {
    package_type: "npm",
    package_name: core.getInput("package-name"),
    org: core.getInput("org"),
  }
);
console.log(
  `@${core.getInput("org")}/${core.getInput("package-name")}:${
    versions.data[0].name
  }`
);
core.setOutput("published-version", versions.data[0].name);

