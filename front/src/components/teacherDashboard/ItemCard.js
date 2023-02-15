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
import {
  AppBar,
  Button,
  CardHeader,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import ExerciseForm from './ExerciseForm';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import PreviewPage from './PreviewPage';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const toolBarStyle = {
  height: '8vh',
  minHeight: '8vh',
};

const theme = createTheme({
  palette: {
    tertianary: {
      light: '#ADE6FF',
      main: '#1698f9',
      dark: '#1670F9',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FFD290',
      main: '#f9a429',
      dark: '#D78E32',
      contrastText: '#fff',
    },
    primary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#000',
    },
  },
});

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
export default function ItemCard({title, subtitle, content, exercise}) {
  const [openEditor, setOpenEditor] = React.useState(false);
  const [openPreviw, setOpenPreview] = React.useState(false);

  const handleClickOpenEditor = () => {
    setOpenEditor(true);
  };
  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  const handleClickOpenPreview = () => {
    setOpenPreview(true);
  };
  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  return (
    <div>
      <Card elevation={3}>
        <CardHeader title={title} subheader={subtitle} />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <ReactMarkdown>
                {content.substring(0, 200) +
                  (content.length > 200 ? '...' : '')}
              </ReactMarkdown>
            </Grid>
            <Grid item>
              <IconButton aria-label="settings" onClick={handleClickOpenEditor}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClickOpenPreview}>
            Voir l'exercice
          </Button>
          <Dialog
            fullScreen
            open={openPreviw}
            onClose={handleClosePreview}
            TransitionComponent={Transition}
          >
            <AppBar sx={{position: 'relative'}} style={toolBarStyle}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClosePreview}
                  aria-label="close"
                >
                  <FontAwesomeIcon icon={faClose} />
                </IconButton>
                <Typography
                  sx={{ml: 2, flex: 1}}
                  variant="h6"
                  component="div"
                >
                  Preview
                </Typography>
              </Toolbar>
            </AppBar>
            <ThemeProvider theme={theme}>
              <PreviewPage exercise={exercise}></PreviewPage>
            </ThemeProvider>
          </Dialog>
        </CardActions>
      </Card>
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
          <ExerciseForm exercise={exercise} />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
