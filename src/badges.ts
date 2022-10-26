import { tinyBadgeMaker } from "tiny-badge-maker";

type BadgeProps = {
  label: string;
  message: string;
};

export function createBadge(props: BadgeProps) {
  return tinyBadgeMaker(props);
}
