import tinyBadgeMaker from "tiny-badge-maker";
import { URLSearchParams } from "url";
import { getPublishedVersion } from ".";
import { processLineByLine } from "./utils";

const badgeTemplates = {
  version: async ({ packageName }: { packageName: string }) => {
    if (!packageName) {
      throw new Error("packageName must be defined");
    }
    const version = await getPublishedVersion({ packageName });
    tinyBadgeMaker({ label: version, message: version });
  },
};

export const createBadgesFromMarkdown = (...files: string[]) => {
  files.forEach((file) => {
    console.log({ file });
    processLineByLine({
      file,
      callback: async (line: string) => {
        console.log({ line });
        for (const match of line.matchAll(/!\[.+\]\((\.badges.+)\)/g)) {
          try {
            const [file, searchparams] = match[1].split("?");
            const templateName = file.match(/([\w-_]+?)\.svg$/)[1];
            const params = Object.fromEntries(
              new URLSearchParams(searchparams).entries()
            );
            const template = badgeTemplates[templateName];
            const svg = await template(params);
            console.log({ file, templateName, params, svg });
          } catch (e) {
            console.error(e);
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
