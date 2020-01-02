import React from 'react';
import App from './App';
import { NewEventDialog, mutationAddEvent } from './components/NewEventDialog';
import { Calendar, eventsList } from './Calendar';
import { MockedProvider, wait } from '@apollo/react-testing';
import { create, act } from 'react-test-renderer';

it('renders without crashing', async () => {
  create(
    <MockedProvider>
      <App />
    </MockedProvider>
  );
  await act(() => wait());
});

const Initialmocks = [
  {
    request: {
      query: eventsList,
      variables: {},
    },
    result: {
      getEvents: [
        {
          key: 'events/YIv1_MrY_0EibooqGWQSO',
          data: {
            id: 'YIv1_MrY_0EibooqGWQSO',
            title: 'Next Week Planning',
            start: '2020-01-15T10:30:00.000Z',
            end: '2020-01-15T12:30:00.000Z',
            description: '',
          },
        },
      ],
    },
  },
];

it('renders Calendar with initial event', async () => {
  create(
    <MockedProvider mocks={Initialmocks} addTypename={false}>
      <App>
        <Calendar />
      </App>
    </MockedProvider>
  );
});
