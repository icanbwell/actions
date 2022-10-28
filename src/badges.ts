import { tinyBadgeMaker } from "tiny-badge-maker";
// import { processLineByLine } from "./utils";

export const createBadgesFromMarkdown = (...files: string[]) => {
  debugger;
  files.forEach((file) => {
    // processLineByLine({
    //   file,
    //   callback: (line: string) => {
    //     for (const match of line.matchAll(/!\[.+\]\((.+)\)\]/g)) {
    //       console.log(match);
    //       debugger
    //     }
    //   },
    // });
  });
  // eslint-disable-next-line no-console
  // console.log(/!\[.+\]\((.+)\)\]/.test('![foo](.badge/prefix-badgetype.svn'))
  // const url = new URL('');
  // url.searchParams.entries()
}

type BadgeArgs = {
  label: string;
  message: string;
};

export function createBadge(props: BadgeArgs) {
  return tinyBadgeMaker(props);
}
