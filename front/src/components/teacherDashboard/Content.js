import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';
import {DialogContent, DialogTitle} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import ExerciseForm from './ExerciseForm';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
const exercises = [
  {
    id: 1,
    statement:
      '# Exo 1\r\n\r\nEcrire une fonction qui renvoie le carré d\'un entier.',
    solution: 'def f(x):\r\n    return x*x',
    test_input: '[1, 2]',
    correct_output: '[1, 4]',
    classroom: 10,
  },
  {
    id: 2,
    statement: '# Exo 2',
    solution: '1',
    test_input: '[1]',
    correct_output: '[1]',
    classroom: 10,
  },
  {
    id: 3,
    statement:
      '## Ceci est un test\r\n### last part\r\n\r\nTOTOTOTOTOTO `def f();`',
    solution: 'toto',
    test_input: 'toto',
    correct_output: 'toto',
    classroom: 10,
  },
];

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
 * Component coding the exercises list.
 * Render the list of exercises
 * @param {props} props properties
 * @return {Component} A component
 */
export default function Content() {
  const [openEditor, setOpenEditor] = React.useState(false);
  const handleClickOpenEditor = () => {
    setOpenEditor(true);
  };
  const handleCloseEditor = () => {
    setOpenEditor(false);
  };
  return (
    <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{display: 'block'}} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Rechercher un exercice"
                InputProps={{
                  disableUnderline: true,
                  sx: {fontSize: 'default'},
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{mr: 1}}
                onClick={handleClickOpenEditor}
              >
                Créer un exercice
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{display: 'block'}} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {exercises.map((exercise) => (
        <Grid item key={exercise.id} xs={12} m={6} lg={4}>
          <ItemCard
            subtitle="Python"
            content={exercise.statement}
            exercise={exercise}
          />
        </Grid>
      ))}
      <BootstrapDialog
        onClose={handleCloseEditor}
        aria-labelledby="customized-dialog-title"
        open={openEditor}
        fullWidth
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseEditor}
        >
          Éditer un exercice
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ExerciseForm />
        </DialogContent>
      </BootstrapDialog>
    </Paper>
  );
}
