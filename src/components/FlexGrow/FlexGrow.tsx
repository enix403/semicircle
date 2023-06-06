import React from "react";

import classNames from "classnames";

export const FlexGrow = React.memo((props: React.HTMLProps<HTMLDivElement>) => {
  return <div {...props} className={classNames("flex-grow self-stretch", props.className)} />;
});
