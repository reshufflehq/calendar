import React, { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import useForm from 'react-hook-form';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Button, Grid, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import useStyle from './UseStyle';
import { DateTime } from 'luxon';

export const mutationAddEvent = gql`
  mutation addEvent(
    $title: String!
    $start: String!
    $end: String!
    $description: String!
  ) {
    addEvent(
      title: $title
      start: $start
      end: $end
      description: $description
    ) {
      id
      title
      start
      end
      description
    }
  }
`;

export const NewEventDialog = props => {
  const { onClose, open, selectedDate } = props;
  const classes = useStyle();

  const { handleSubmit, register, errors } = useForm();
  const [addEvent, { loading, error }] = useMutation(mutationAddEvent);

  /* date format: yyyy-mm-dd, startTime/endTime: hh:mm.
   * convert to string yyyy-mm-ddThh:mmZ
   * parsing with Luxon (fromISO)  to format that supported by all browsers
   */

  const onSubmit = useCallback(
    ({ title, description, date, startTime, endTime }) => {
      const startEvent = DateTime.fromISO(date + 'T' + startTime).setZone(
        'UTC'
      );
      const endEvent = DateTime.fromISO(date + 'T' + endTime).setZone('UTC');
      if (endEvent - startEvent <= 0) {
        const timeErrror = document.getElementById('timeError');
        timeErrror.style.display = 'block';
        return new Error('End Time should be greater than Start Time');
      }
      addEvent({
        variables: {
          title,
          start: startEvent,
          end: endEvent,
          description: description ? description : '',
        },
      });
      onClose();
    },
    [addEvent, onClose]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <p>ERROR</p>;

  return (
    <Dialog aria-labelledby='dialog-title' open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item className={classes.dialogTitle}>
          <DialogTitle id='dialog-title'>New Event Information</DialogTitle>
        </Grid>
        <Grid item className={classes.paddingItem}>
          <TextField
            autoFocus
            name='title'
            label='Title'
            type='text'
            inputRef={register({ required: true, minLength: 1 })}
          />
          {errors.title && errors.title.message}
        </Grid>
        <Grid item className={classes.paddingItem}>
          <TextField
            autoFocus
            name='description'
            label='Description'
            type='text'
            inputRef={register({ required: false })}
          />
        </Grid>
        <Grid container alignItems='flex-end' direction='row'>
          <Grid item className={classes.paddingItem}>
            <TextField
              autoFocus
              name='date'
              type='date'
              label='Date'
              defaultValue={selectedDate ? selectedDate.dateStr : ''}
              inputRef={register({ required: true, minLength: 1 })}
            />
            {errors.date && errors.date.message}
          </Grid>
          <Grid item className={classes.paddingItem}>
            <TextField
              autoFocus
              name='startTime'
              type='time'
              label='Start Time'
              defaultValue='07:30'
              inputRef={register({ required: true, minLength: 1 })}
            />
          </Grid>
          <Grid
            item
            className={[classes.paddingItem, classes.paddingRight].join(' ')}
          >
            <TextField
              autoFocus
              name='endTime'
              type='time'
              label='End Time'
              defaultValue='10:30'
              inputRef={register({ required: true, minLength: 1 })}
            />
          </Grid>
        </Grid>
        <Box
          className={[
            classes.paddingItem,
            classes.paddingBottom,
            classes.paddingRight,
          ].join(' ')}
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
        >
          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={loading}
          >
            Save
          </Button>
          <Button variant='contained' onClick={onClose} color='primary'>
            Cancel
          </Button>
        </Box>
        <Grid
          item
          id='timeError'
          className={[classes.errorMsg, classes.hiddenItem].join(' ')}
        >
          End Time should be greater than Start Time
        </Grid>
      </form>
    </Dialog>
  );
};

NewEventDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default React.memo(NewEventDialog);
