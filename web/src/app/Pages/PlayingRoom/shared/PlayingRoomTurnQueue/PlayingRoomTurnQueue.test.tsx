import { Provider } from 'mobx-react';
import { screen, render } from '@testing-library/react';

import { store } from 'store';
import { SocketResponseType } from 'api';
import type { TurnQueueData, CurrentTurnData, SocketPlayersData } from 'api';

import { PlayingRoomTurnQueue } from './PlayingRoomTurnQueue';

describe('INTEGRATION: PlayingRoomTurnQueue', () => {
  const { room } = store;

  const component = (
    <Provider {...store}>
      <PlayingRoomTurnQueue />
    </Provider>
  );

  test('Компонент в контексте capture/freeCapture рендерится корректно', () => {
    render(component);
    const queue: TurnQueueData = {
      type: 8,
      turns: 9,
    };

    const turn: CurrentTurnData = {
      type: 10,
      number: 3,
    };

    room.setCurrentTurn(turn);
    room.setTurnQueue(queue);

    const turnBars = screen.getAllByTestId('TurnBar');
    expect(turnBars.length).toBe(9);

    console.log(room.currentTurn);
    screen.debug();

    expect(turnBars[0].classList.contains('turnBarPast')).toBe(true);
    expect(turnBars[turn.number - 1].classList.contains('turnBarActive')).toBe(
      true,
    );
    expect(turnBars[7].classList.contains('turnBarFuture')).toBe(true);
    expect(turnBars).toMatchSnapshot();
  });

  test('Компонент в конексте attack рендерится корректно', () => {
    render(component);

    const players: SocketPlayersData = {
      type: SocketResponseType.playersInfo,
      players: [
        {
          color: 'player-1',
          name: 'Вася',
          id: '1',
          points: 100,
        },
        {
          color: 'player-2',
          name: 'gogsh',
          id: '2',
          points: 200,
        },
        {
          color: 'player-3',
          name: 'Петя',
          id: '3',
          points: 300,
        },
      ],
    };
    const queue: TurnQueueData = {
      type: SocketResponseType.attackTurnQueue,
      turns: [
        'player-1',
        'player-2',
        'player-3',
        'player-1',
        'player-3',
        'player-2',
      ],
    };
    const turn: CurrentTurnData = {
      type: 10,
      number: 3,
    };

    room.setMoveStatus('attack');
    room.setPlayers(players);
    room.setCurrentTurn(turn);
    room.setTurnQueue(queue);

    const stepContainer = screen.getAllByTestId('StepContainer');
    const turnBars = screen.getAllByTestId('TurnBar');

    expect(stepContainer.length).toBe(2);
    expect(turnBars.length).toBe(6);

    expect(stepContainer).toMatchSnapshot();
    expect(turnBars).toMatchSnapshot();
    expect(turnBars[1].classList.contains('turnBarPast')).toBe(true);
  });
});
