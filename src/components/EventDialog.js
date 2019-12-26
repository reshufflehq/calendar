import React, { useCallback } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { Grid, Button } from '@material-ui/core';
import useStyle from './UseStyle';

const mutation = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

function EventDialog(props) {
  const { onClose, open, selectedEvent } = props;
  const [deleteEvent, { loading, error }] = useMutation(mutation);

  const classes = useStyle();

  const handleClose = () => {
    onClose();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = useCallback(() => [
    deleteEvent({
      variables: { id: selectedEvent ? selectedEvent.event.id : '' },
    }),
    [deleteEvent, selectedEvent],
    handleClose(),
  ]);
  if (loading) return <div>Loading...</div>;
  if (error) return <p>ERROR</p>;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}
    >
      <Grid item className={classes.dialogTitle}>
        <DialogTitle id='simple-dialog-title'>
          {selectedEvent ? selectedEvent.event.title : 'no title'}
        </DialogTitle>
      </Grid>
      <Grid container alignItems='flex-end' direction='row'>
        <Grid item className='dateRow'>
          <DialogContent>
            {selectedEvent
              ? selectedEvent.event.start.toLocaleDateString()
              : ''}
          </DialogContent>
        </Grid>
        <Grid>,</Grid>
        <Grid item>
          <DialogContent>
            {selectedEvent && selectedEvent.event.start
              ? selectedEvent.event.start.toLocaleTimeString()
              : 'no start time'}
          </DialogContent>
        </Grid>
        <Grid>-</Grid>
        <Grid item>
          <DialogContent>
            {selectedEvent && selectedEvent.event.end
              ? selectedEvent.event.end.toLocaleTimeString()
              : 'no end time'}
          </DialogContent>
        </Grid>
      </Grid>
      <Grid
        item
        className={
          selectedEvent && selectedEvent.event.extendedProps.description === ''
            ? classes.hiddenItem
            : ''
        }
      >
        <DialogContent>
          Description:{' '}
          {selectedEvent
            ? selectedEvent.event.extendedProps.description
            : 'no description'}
        </DialogContent>
      </Grid>
      <Button variant='contained' color='secondary' onClick={handleClick}>
        Delete Event
      </Button>
    </Dialog>
  );
}

EventDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default EventDialog;
