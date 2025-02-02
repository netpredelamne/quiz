import { makeObservable, observable, action } from 'mobx';

import { RootStore } from '../RootStore';

import { PlayerColors, Player } from 'api';

/** Информация о игроке */
export class PlayerStore {
  /** Root store */
  root: RootStore;
  /** Никнейм */
  nickname = localStorage.getItem('nickname') || 'Anonim';
  /** Цвет */
  color?: PlayerColors;
  /** uuid */
  id = '';
  constructor(root: RootStore) {
    makeObservable(this, {
      // observable
      color: observable,
      nickname: observable,
      id: observable,
      // action
      setNickname: action,
      setPlayerInfo: action,
    });
    this.root = root;
  }

  setNickname = (nickname: string) => {
    this.nickname = nickname;
    localStorage.setItem('nickname', nickname);
  };

  /** Устанавливает id и цвет игрока */
  setPlayerInfo = () => {
    const { id, color } = this.root.room.players.find(
      (player) => player.name === this.nickname,
    ) as Player;
    this.id = id;
    this.color = color;
  };
}
