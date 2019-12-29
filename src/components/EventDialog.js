import React, { useCallback } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { Grid, Button, Box } from '@material-ui/core';
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
        <Grid item className={classes.dateRow}>
          <DialogContent>
            {selectedEvent
              ? `${selectedEvent.event.start.toLocaleDateString('en-us', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}`
              : ''}
          </DialogContent>
        </Grid>
        <Box className={classes.dot}>•</Box>
        <Grid>
          <DialogContent>
            {selectedEvent && selectedEvent.event.start
              ? selectedEvent.event.start.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'no start time'}{' '}
            -{' '}
            {selectedEvent && selectedEvent.event.end
              ? selectedEvent.event.end.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''}
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
          {selectedEvent
            ? selectedEvent.event.extendedProps.description
            : 'no description'}
        </DialogContent>
      </Grid>
      <Box
        className={[
          classes.paddingItem,
          classes.paddingRight,
          classes.paddingBottom,
        ].join(' ')}
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
      >
        <Button variant='contained' color='secondary' onClick={handleClick}>
          Delete Event
        </Button>
        <Button variant='contained' color='primary' onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}

EventDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default EventDialog;
