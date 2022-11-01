import * as fs from "fs";
import * as core from "@actions/core";
import tinyBadgeMaker from "tiny-badge-maker";
import { URLSearchParams } from "url";
import { getPublishedVersion, getLatestReleaseTag } from ".";
import { processLineByLine } from "./utils";

const badgeTemplates = {
  ["published-version"]: async ({ packageName }: { packageName: string }) => {
    if (!packageName) {
      throw new Error("packageName must be defined");
    }
    const version = await getPublishedVersion({ packageName });
    return tinyBadgeMaker({ label: "version", message: version });
  },
  ["release-tag"]: async ({ repo }: { repo: string }) => {
    const tag = await getLatestReleaseTag({ repo });
    return tinyBadgeMaker({ label: "release", message: tag });
  },
};

export const createBadgesFromMarkdown = () => {
  const files = core?.getInput("markdown").split(/\s/);
  files.forEach((file) => {
    if (!fs.existsSync(file)) throw `Markdown file not found: ${file}`;
    processLineByLine({
      file,
      callback: async (line: string) => {
        for (const match of line.matchAll(/!\[.+\]\((\.badges.+)\)/g)) {
          try {
            const [file, searchparams] = match[1].split("?");
            const templateName = file.match(/([\w-_]+?)\.svg$/)[1];
            const params = Object.fromEntries(
              new URLSearchParams(searchparams).entries()
            );
            const template = badgeTemplates[templateName];
            const svg = await template(params);
            // eslint-disable-next-line no-console
            console.log({ file, templateName, params });
            fs.writeFileSync(file, svg)
          } catch (e) {
            core.setFailed((e as Error)?.message || "unknown error");
          }
        }
      },
    });
  });
};

type BadgeArgs = {
  label: string;
  message: string;
};

export function createBadge(props: BadgeArgs) {
  return tinyBadgeMaker(props);
}
