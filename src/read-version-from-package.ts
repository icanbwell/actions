import * as core from "@actions/core";
import * as semver from "semver";
import { readFileSync } from "fs";

export function readVersionFromPackageJson() {
  try {
    const packageContents = JSON.parse(
      readFileSync("./package.json").toString()
    );
    const version = packageContents.version;
    const cleanVersion = semver.clean(version);

    if (!cleanVersion) throw new Error(`invalid version "${version}"`);

    core.setOutput("version", cleanVersion);
  } catch (e) {
    core.setFailed(e.message);
  }
}
