import React from 'react';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';

export default function OneComment({ oneComment }) {
  console.log(oneComment, ' asdaaaaaaaaaaa');
  return (
    <ListItem
      alignItems="flex-start"
      sx={{ padding: '20px' }}
    >
      <Card sx={{ maxWidth: 345, boxShadow: '0' }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={`http://localhost:3001/${oneComment.image}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" />
          <Typography variant="body2" color="text.secondary">
            {oneComment.text}
          </Typography>
          {/* <Typography variant="body2" sx={{ color: 'silver' }}>
            {oneComment?.User?.name}
          </Typography> */}

        </CardContent>
      </Card>
    </ListItem>
  );
}
