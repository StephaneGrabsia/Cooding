import React from 'react';
import Card from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare, faClose} from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import {Button, DialogContent, DialogTitle, Grid} from '@mui/material';
import ExerciseForm from './ExerciseForm';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

/**
 * Component coding the dialog title.
 * @param {props} props properties
 * @return {Component} A component
 */
function BootstrapDialogTitle(props) {
  const {children, onClose, ...other} = props;

  return (
    <DialogTitle sx={{m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <FontAwesomeIcon icon={faClose} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

/**
 * Component coding the card for elements of teacher page.
 * Render the card
 * @param {props} props properties
 * @return {Component} A component
 */
export default function ItemCard({title, subtitle, content}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card elevation={3}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <ReactMarkdown>
                {content.substring(0, 200) +
                  (content.length > 200 ? '...' : '')}
              </ReactMarkdown>
            </Grid>
            <Grid item>
              <IconButton aria-label="settings" onClick={handleClickOpen}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small">Voir l'exercice</Button>
        </CardActions>
      </Card>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Éditer un exercice
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ExerciseForm />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
