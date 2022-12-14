import * as core from "@actions/core";
import * as semver from "semver";
import { readFileSync } from "fs";

export function incrementVersion() {
  try {
    const eventPayload = JSON.parse(
      readFileSync(process.env.GITHUB_EVENT_PATH || "").toString()
    );
    const latestVersion = core.getInput("latest-version");
    const defaultReleaseType = core.getInput("default-release-type");
    const releaseTypes = ["do-not-release", "major", "minor", "patch"];
    const releaseTypeLabels = eventPayload.pull_request?.labels?.filter(
      (label) => releaseTypes.includes(label.name.toLowerCase())
    ) || [];

    if (releaseTypeLabels.length > 1) {
      throw new Error(
        "More than one release type label was provided.  Please indicate the release type by using only one label."
      );
    }

    const releaseType =
      releaseTypeLabels
        ?.find((label: { name: string }) => {
          const findLabel = label.name.toLowerCase();
          console.log({ findLabel });
          return ["do-not-release", "major", "minor", "patch"].includes(
            findLabel
          );
        })
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
  } catch (e: unknown) {
    core.setFailed((e as Error)?.message || "unknown error");
  }
}
