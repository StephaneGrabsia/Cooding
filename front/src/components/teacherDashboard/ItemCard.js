import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import {Button, Typography, Dialog, AppBar, Toolbar} from '@mui/material';
import PreviewPage from './PreviewPage';
import {createTheme, ThemeProvider} from '@mui/material/styles';

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
 * Component coding the card for elements of teacher page.
 * Render the card
 * @param {props} props properties
 * @return {Component} A component
 */
export default function ItemCard({title, subtitle, content, exercise}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card elevation={3}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <FontAwesomeIcon icon={faPenToSquare} />
          </IconButton>
        }
        title={title}
        subheader={subtitle}
      />
      <CardContent>
        <Typography>
          {content.substring(0, 200) + (content.length > 200 ? '...' : '')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClickOpen}>Voir l'exercice</Button>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{position: 'relative'}} style={toolBarStyle}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
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
  );
}
