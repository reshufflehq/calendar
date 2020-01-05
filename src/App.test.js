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

const addEventMock = [
  {
    request: {
      query: mutationAddEvent,
      variables: {},
    },
    result: {
      addEvent: {
        id: 'random_id',
        title: 'New Event',
        start: '',
        end: '2020-01-15T12:30:00.000Z',
        description: 'yada yada yada',
      },
    },
  },
];

it('add event failes when adding event without start time', async () => {
  const component = create(
    <MockedProvider mocks={addEventMock} addTypename={false}>
      <App>
        <Calendar>
          <NewEventDialog open={true} onClose={Function} selectedEvent={''} />
        </Calendar>
      </App>
    </MockedProvider>
  );
  await act(() => wait());

  const testInstance = component.root;
  expect(testInstance.findByType('p').children).toEqual(['ERROR']);
});
