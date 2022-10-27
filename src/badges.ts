import { tinyBadgeMaker } from "tiny-badge-maker";
import { processLineByLine } from "./utils";

type BadgeArgs = {
  label: string;
  message: string;
};

export function createBadge(props: BadgeArgs) {
  return tinyBadgeMaker(props);
}

export function createBadgesFromMarkdown(...files: string[]) {
  files.forEach((file) => {
    processLineByLine({
      file,
      callback: (line: string) => {
        const matches = line.matchAll(/\s/);
      },
    });
  });
  // eslint-disable-next-line no-console
  console.log(/!\[.+\]\((.+)\)\]/.test('![foo](.badge/prefix-badgetype.svn'))
  const url = new URL('');
  url.searchParams.entries()
}



