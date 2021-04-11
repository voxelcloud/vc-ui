import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  root: {
    display: 'inline-block',
  },
  dialog: {
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    '& .MuiDialog-paper': {
      width: '448px',
      padding: '16px',
      margin: '0',
    },
    '& .MuiDialogTitle-root': {
      padding: '0px',
    },
    '& .MuiDialogContent-root': {
      padding: '20px 0',
    },
    '& .MuiTypography-body1': {
      fontSize: '14px',
    },
    '& .close-button': {
      position: 'absolute',
      right: '20px',
      top: '20px',
      width: '20px',
      height: '20px',
      cursor: 'pointer',
    },
    '& .confirm-button': {
      width: '100%',
      marginBottom: '30px',
    },
  },
}))
