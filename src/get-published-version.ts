import * as core from "@actions/core";
import * as github from "@actions/github";

type GetPublishedVersionArgs = {
  token?: string;
  packageName?: string;
};
export async function getPublishedVersion(
  args: GetPublishedVersionArgs | undefined
) {
  const token =
    args?.token || core.getInput("auth-token") || process.env.GITHUB_TOKEN;
  const packageName = args?.packageName || core.getInput("package-name");
  if (!token) throw new Error("auth-token is a required field");
  const octokit = github.getOctokit(token);
  const versions = await octokit.request(
    "GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
    {
      package_type: "npm",
      package_name: packageName,
      org: core.getInput("org"),
    }
  );
  const version = versions.data[0].name;
  core.setOutput("published-version", version);
  console.log({ "published-version": version });
  return version;
}
