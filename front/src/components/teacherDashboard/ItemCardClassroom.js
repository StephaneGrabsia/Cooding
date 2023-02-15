import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {CardHeader, Grid} from '@mui/material';

/**
 * Component coding the card for elements of teacher page.
 * Render the card
 * @param {props} props properties
 * @return {Component} A component
 */
export default function ItemCardClassroom({classroom}) {
  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          title={'Classe ' + classroom.room_id}
          subheader={'Python'}
        />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              toto
            </Grid>
            <Grid item>
              <IconButton aria-label="settings">
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
