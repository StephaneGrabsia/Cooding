import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {CardHeader, Typography} from '@mui/material';
import AuthContext from '../../context/AuthContext';

/**
 * Component coding the card for elements of teacher page.
 * Render the card
 * @param {props} props properties
 * @return {Component} A component
 */
export default function ItemCardClassroom({classroom}) {
  const {authTokens, user} = React.useContext(AuthContext);
  const [classroomTeacher, setclassroomTeacher] = React.useState({
    teacher_profile: {
      first_name: 'Jean',
      last_name: 'Michel',
      gender: 'Homme',
    },
  });

  const fetchclassroomTeacher = async () => {
    const response = await fetch('http://localhost:8000/teacher/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
      body: JSON.stringify({
        user_id: classroom.teacher,
      }),
    });
    console.log(response);
    if (response.status === 200) {
      const content = await response.json();
      setclassroomTeacher(content);
    } else {
    }
  };

  const deleteClassroom = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000//room/delete/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
      body: JSON.stringify({
        id: classroom.room_id,
      }),
    });
    console.log(response);
    if (response.status === 200) {
      window.location.reload(false);
    } else {
      alert('Error');
    }
  };

  React.useEffect(() => {
    fetchclassroomTeacher();
  }, []);

  console.log(classroomTeacher);

  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          title={'Classe ' + classroom.room_id}
          subheader={'Python'}
          action={
            classroomTeacher.id === user.user_id ? (
              <IconButton aria-label="settings" onClick={deleteClassroom}>
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            ) : (
              ''
            )
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Propriétaire :{' '}
            {classroomTeacher.teacher_profile.gender === 'Homme' ?
              'Mr ' :
              'Mme '}
            {classroomTeacher.teacher_profile.first_name +
              ' ' +
              classroomTeacher.teacher_profile.last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Nombre d'exercices : TODO
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
