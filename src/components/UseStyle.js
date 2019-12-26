import { createStyles, makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme =>
  createStyles({
    dialogTitle: {
      textAlign: 'center',
    },
    paddingItem: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(5),
    },
    paddingRight: {
      paddingRight: theme.spacing(5),
    },
    hiddenItem: {
      display: 'none',
    },
    dateRow: {
      fontSize: '5rem',
      padding: theme.spacing(-5),
    },
  })
);

export default useStyle;
