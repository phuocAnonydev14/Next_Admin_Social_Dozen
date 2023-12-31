import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import {styled} from '@mui/material/styles';
import {PropsWithChildren} from 'react';
import {LoadingButton} from "@mui/lab";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.default,
    padding: 10,
    overflow: 'visible'
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },

}));

export interface AppDialogProps extends PropsWithChildren<any> {
  open: boolean;
  textEnter?: string;
  textCancel?: string;
  title: string;
  onClose: () => void;
  onEnter?: () => void;
  onCancel?: () => void;
  maxWidth?: any;
  loading?: string,
}

export const VisibleDialog = ({
                            loading,
                            children,
                            open,
                            textEnter = 'Ok',
                            textCancel = 'Cancel',
                            title,
                            onClose,
                            onEnter,
                            onCancel,
                            maxWidth
                          }: AppDialogProps) => {
  return (
    // @ts-ignore
    <BootstrapDialog fullWidth
                     maxWidth={maxWidth || "sm"}
                     onClose={onClose} aria-labelledby="customized-dialog-title"
                     open={open}>
      <DialogTitle sx={{m: 0, p: 2, fontSize: 18, fontWeight: 600}}>
        {title}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500],
            }}
          >
            <CloseIcon/>
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent
        style={{
          width: '100%',
          padding: '24px 16px',
        }}
      >
        {children}
      </DialogContent>
      {(onEnter || onCancel) && (
        <DialogActions>
          {onCancel && (
            <Button autoFocus onClick={onClose}>
              {textCancel}
            </Button>
          )}
          {onEnter && (
            <LoadingButton loading={loading === 'pending'} variant="contained" onClick={onEnter}>
              {textEnter}
            </LoadingButton>
          )}
        </DialogActions>
      )}
    </BootstrapDialog>
  );
};

export default VisibleDialog;
