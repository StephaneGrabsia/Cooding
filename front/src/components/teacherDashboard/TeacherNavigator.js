import * as React from 'react';
import {useHistory} from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faBook,
  faBookmark,
  faPenToSquare,
  faCircleCheck,
  faChalkboardTeacher,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

import Logo from '../../assets/logo.svg';

const categories = [
  {
    id: 'Exercices',
    icon: <FontAwesomeIcon icon={faBars} />,
    children: [
      {
        id: 'Catalogue d\'exercices',
        icon: <FontAwesomeIcon icon={faBook} />,
        active: true,
        path: '/teacher',
      },
      {
        id: 'Mes exercices',
        icon: <FontAwesomeIcon icon={faBookmark} />,
        path: '/teacher',
      },
      {
        id: 'Créer un exercice',
        icon: <FontAwesomeIcon icon={faPenToSquare} />,
        path: '/teacher',
      },
    ],
  },
  {
    id: 'Salles de classe',
    icon: <FontAwesomeIcon icon={faChalkboardTeacher} />,
    children: [
      {
        id: 'Classes actives',
        icon: <FontAwesomeIcon icon={faCircleCheck} />,
        path: '/teacher',
      },
      {
        id: 'Mes classes',
        icon: <FontAwesomeIcon icon={faBookmark} />,
        path: '/teacher',
      },
      {
        id: 'Créer une classe',
        icon: <FontAwesomeIcon icon={faPenToSquare} />,
        path: '/',
      },
    ],
  },
];

const item = {
  'py': '2px',
  'px': 3,
  'color': 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

/**
 * Component coding the main page of the student.
 * Render navigator side bar of the teacher page
 * @param {props} props properties.
 * @return {Component} A component
 */
export default function TeacherNavigator(props) {
  const {...other} = props;
  const history = useHistory();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{...item, ...itemCategory, fontSize: 22, color: '#fff'}}
        >
          <img src={Logo} />
        </ListItem>
        {categories.map(({id, icon, children}) => (
          <Box key={id} sx={{bgcolor: '#101F33'}}>
            <ListItem sx={{py: 2, px: 3}}>
              <ListItemText sx={{color: '#fff'}}> {icon}</ListItemText>
              <ListItemText sx={{color: '#fff'}}> {id}</ListItemText>
            </ListItem>
            {children.map(({id: childId, icon, active, path}) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  selected={active}
                  sx={item}
                  onClick={() => history.push(path)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{mt: 2}} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
