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

import ItemCard from './ItemCard';

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

/**
 * Component coding the exercises list.
 * Render the list of exercises
 * @param {props} props properties
 * @return {Component} A component
 */
export default function Content() {
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
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  sx: {fontSize: 'default'},
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{mr: 1}}>
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
            title="Les moindres carrés"
            subtitle="Python"
            content="toto"
          />
        </Grid>
      ))}
    </Paper>
  );
}
