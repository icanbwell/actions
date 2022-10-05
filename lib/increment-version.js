import * as core from "@actions/core";
import * as semver from "semver";
import { readFileSync } from "fs";

try {
  const eventPayload = JSON.parse(
    readFileSync(process.env.GITHUB_EVENT_PATH).toString()
  );
  const latestVersion = core.getInput("latest-version");
  const defaultReleaseType = core.getInput("default-release-type");
  const releaseType =
    eventPayload.pull_request?.labels
      ?.find((label) =>
        ["major", "minor", "patch"].includes(label.name.toLowerCase())
      )
      ?.name.toLowerCase() || defaultReleaseType;
  if (!releaseType) {
    throw new Error(
      "A release type label has not been found and a default release type is not configured"
    );
  }
  if (!core.getInput("check-for-label-only")) {
    const cleanVersion = semver.clean(latestVersion);
    if (!cleanVersion) throw new Error(`invalid version "${latestVersion}"`);
    core.setOutput("release-type", releaseType);
    core.setOutput("new-version", semver.inc(cleanVersion, releaseType));
  }
} catch (e) {
  core.setFailed(e.message);
}
