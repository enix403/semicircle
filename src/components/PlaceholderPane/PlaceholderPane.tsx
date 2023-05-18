import type { HTMLProps } from "react";
import { memo } from "react";

import './PlaceholderPane.css';

import classNames from "classnames";

export const PlaceholderPane = memo((props: HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={classNames("h-full w-full bg-slate-400/20 app-placeholder-pane", props.className)}
    />
  );
});
