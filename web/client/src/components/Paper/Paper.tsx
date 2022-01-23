import { useMemo } from 'react';
import type { FunctionComponent } from 'react';

import clsx from 'clsx';

import { observer } from 'mobx-react-lite';

import classes from './Paper.module.css';

interface IPaperProps {
  className: string;
}

export const Paper: FunctionComponent<IPaperProps> = observer(
  ({ className, children }) => {
    const styles = useMemo(() => clsx(classes.paper, className), [className]);
    return <div className={styles}>{children}</div>;
  },
);

Paper.displayName = 'Paper';
