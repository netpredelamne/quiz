import type { FunctionComponent } from 'react';

import { observer, useLocalObservable } from 'mobx-react-lite';

import { Paper, Textarea, Button, Divider, Header } from 'components';

import { HomeCreateRoomModal } from './HomeCreateRoomModal';

import classes from './Home.module.css';

interface HomeState {
  /** Открыто ли модальное окно создания лобби */
  isCreateLobbyModalOpen: boolean;
  /** Открыть или закрыть модальное окно создания лобби */
  setCreateLobbyModal: () => void;
}

export const Home: FunctionComponent = observer(() => {
  // TODO: Унести в Home Store
  const state = useLocalObservable<HomeState>(() => ({
    isCreateLobbyModalOpen: false,
    setCreateLobbyModal() {
      this.isCreateLobbyModalOpen = !this.isCreateLobbyModalOpen;
    },
  }));

  return (
    <div className={classes.wrapper}>
      <HomeCreateRoomModal
        open={state.isCreateLobbyModalOpen}
        setOpen={state.setCreateLobbyModal}
      />
      <Header />
      <div className={classes.body}>
        <Paper className={classes.chat}>
          <div className={classes.messagesContainer}></div>
          <Textarea
            className={classes.textarea}
            placeholder="Введите сообщение ..."
          />
        </Paper>
        <Paper className={classes.lobbys}>
          <div className={classes.lobbysContainer}></div>
          <Divider className={classes.divider} />
          <Button
            className={classes.createLobbybutton}
            type="primary"
            onClick={state.setCreateLobbyModal}
          >
            Создать лобби
          </Button>
        </Paper>
      </div>
    </div>
  );
});
