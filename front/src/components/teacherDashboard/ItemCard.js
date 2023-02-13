import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';

import {Button, Typography} from '@mui/material';

/**
 * Component coding the card for elements of teacher page.
 * Render the card
 * @param {props} props properties
 * @return {Component} A component
 */
export default function ItemCard({title, subtitle, content}) {
  return (
    <Card>
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
        <Button size="small">Voir l'exercice</Button>
      </CardActions>
    </Card>
  );
}
