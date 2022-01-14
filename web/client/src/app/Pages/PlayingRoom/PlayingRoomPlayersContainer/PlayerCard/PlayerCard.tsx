import type { FunctionComponent } from 'react';

import { observer } from 'mobx-react-lite';

import { Typography } from 'components';
import { IPlayer } from 'api';

import classes from './PlayerCard.module.css';

export const PlayerCard: FunctionComponent<IPlayer> = observer(
  ({ id, name, points }) => {
    return (
      <div id={id} className={classes.wrapper}>
        <div className={classes.playerLine}></div>
        <div className={classes.content}>
          <img
            className={classes.avatar}
            src="https://imya-sonnik.ru/wp-content/uploads/2019/10/s1200-86-1.jpg"
          />
          <div className={classes.textContainer}>
            <Typography.Text color="white-70" type="text-1">
              {name}
            </Typography.Text>
            <Typography.Text color="white" type="text-3" weight="weight-bold">
              {points}
            </Typography.Text>
          </div>
        </div>
      </div>
    );
  },
);

PlayerCard.displayName = 'PlayerCard';
