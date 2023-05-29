import React from 'react';

import classNames from 'classnames';

export const FlexGrow = React.memo((props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={classNames(
        "aspect-square flex-grow self-stretch",
        props.className
      )}
    />
  );
});
