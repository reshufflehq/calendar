import { find, create, Q, remove, get } from '@reshuffle/db';
import nanoid from 'nanoid';

export default {
  Query: {
    getEvents: async () => {
      const events = await find(Q.filter(Q.key.startsWith('events/')));
      return events.map(({ value }) => value);
    },
  },
  Mutation: {
    addEvent: async (_, { title, start, end, description }) => {
      const id = nanoid();
      const event = { id, title, start, end, description };
      await create(`events/${id}`, event);
      return event;
    },
    deleteEvent: async (_, { id }) => {
      const event = await get(`events/${id}`);
      await remove(`events/${id}`);
      return event;
    },
  },
};
