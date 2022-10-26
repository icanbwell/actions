import * as core from "@actions/core";
import * as semver from "semver";
import { readFileSync } from "fs";

export function incrementVersion() {
  try {
    const eventPayload = JSON.parse(
      readFileSync(process.env.GITHUB_EVENT_PATH).toString()
    );
    const latestVersion = core.getInput("latest-version");
    const defaultReleaseType = core.getInput("default-release-type");
    const releaseType =
      eventPayload.pull_request?.labels
        ?.find((label) =>
          ["do-not-release", "major", "minor", "patch"].includes(
            label.name.toLowerCase()
          )
        )
        ?.name.toLowerCase() || defaultReleaseType;
    if (!releaseType) {
      throw new Error(
        "A release type label has not been found and a default release type is not configured"
      );
    }
    console.log({ latestVersion, releaseType });
    if (latestVersion && releaseType !== "do-not-release") {
      const cleanVersion = semver.clean(latestVersion);
      if (!cleanVersion) throw new Error(`invalid version "${latestVersion}"`);
      const newVersion = semver.inc(cleanVersion, releaseType);
      core.setOutput("release-type", releaseType);
      core.setOutput("new-version", newVersion);
      console.log({ cleanVersion, releaseType, newVersion });
    }
  } catch (e) {
<<<<<<< Updated upstream
    core.setFailed(e.message);
=======
    let msg = 'unknown error';
    if (typeof e === 'string') {
        msg = e;
    } else if (e instanceof Error) {
        msg = e.message;
    }
    core.setFailed(msg);
>>>>>>> Stashed changes
  }
}
