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
import ItemCardClassroom from './ItemCardClassroom';
import {DialogContent, DialogTitle} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import AuthContext from '../../context/AuthContext';
import ClassroomForm from './ClassroomForm';

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
export default function ClassroomsContent() {
  const {authTokens} = React.useContext(AuthContext);
  const [openEditor, setOpenEditor] = React.useState(false);
  const [listClassrooms, setListClassrooms] = React.useState([]);

  const handleClickOpenEditor = () => {
    setOpenEditor(true);
  };
  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  const fetchClassroom = async () => {
    const response = await fetch('http://localhost:8000/allrooms/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
    });
    if (response.status === 200) {
      const content = await response.json();
      setListClassrooms(content);
    } else {
      alert('Didn\'t work');
    }
  };

  React.useLayoutEffect(() => {
    fetchClassroom();
  }, []);

  React.useLayoutEffect(() => {
    const interval = setInterval(fetchClassroom, 10000);
    return () => clearInterval(interval);
  }, [listClassrooms]);

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
                placeholder="Rechercher une classe"
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
                Créer une classe
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
      <Grid item xs={12} m={6} lg={4}>
        {listClassrooms.map((classroom) => (
          <Grid
            item
            key={'classroom-' + classroom.room_id}
            xs={12}
            m={6}
            lg={4}
          >
            <ItemCardClassroom classroom={classroom} />
          </Grid>
        ))}
      </Grid>
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
          Créer une classroom
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ClassroomForm/>
        </DialogContent>
      </BootstrapDialog>
    </Paper>
  );
}
