import { createStyles, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyle = makeStyles(theme =>
  createStyles({
    dialogTitle: {
      textAlign: 'center',
    },
    paddingItem: {
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(5),
    },
    paddingRight: {
      paddingRight: theme.spacing(5),
    },
    paddingBottom: {
      paddingBottom: theme.spacing(3),
    },
    hiddenItem: {
      display: 'none',
    },
    dot: {
      lineHeight: '2.5',
    },
  })
);

export default useStyle;
