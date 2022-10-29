import { tinyBadgeMaker } from "tiny-badge-maker";
// import { processLineByLine } from "./utils";

<<<<<<< Updated upstream
export const createBadgesFromMarkdown = (...files: string[]) => {
  debugger;
=======
const badgeTemplates = {
  ['published-version']: async ({ packageName }: { packageName: string }) => {
    if (!packageName) {
      throw new Error("packageName must be defined");
    }
    const version = await getPublishedVersion({ packageName });
    tinyBadgeMaker({ label: 'version', message: version });
  },
  ['release-tag']: async () => {
    // const tag = await getLatestReleaseTag();
  }
};

export const createBadgesFromMarkdown = () => {
  const files = core?.getInput("markdown").split(",");
  console.log({files});
>>>>>>> Stashed changes
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
