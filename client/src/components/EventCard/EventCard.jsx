import React from 'react';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getOneEvent } from '../../redux/YanaSlices/oneEventSlice';
import { deleteEvent, changeStatus5 } from '../../redux/YuliyaSlices/allEventsSlice';

export default function EventCard({ oneEventCard }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const seeMore = () => {
    dispatch(getOneEvent(oneEventCard.id));
    navigate(`/event/${oneEventCard.id}`);
  };

  const deleteOneEvent = (id) => {
    dispatch(deleteEvent(id));
  };

  const changeStatus = (event) => {
    dispatch(changeStatus5(event));
  };

  return (
    <ListItem
      alignItems="flex-start"
      sx={{ padding: '20px', justifyContent: 'center' }}
    >
      <Card sx={{ maxWidth: 345, boxShadow: '0' }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={`http://localhost:3001/${oneEventCard.image}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Button variant="text" onClick={() => seeMore()}>
              {' '}
              {oneEventCard.title}
            </Button>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {oneEventCard.startDate}
            -
            {oneEventCard.finishDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {oneEventCard.description}
          </Typography>
          <Typography variant="body2" sx={{ color: 'silver' }}>
            {oneEventCard?.User?.name}
          </Typography>
          {oneEventCard.statusId === 1 && (
            <Typography variant="body2" sx={{ color: 'silver' }}>
              ???????? ??????????????????????
            </Typography>
          )}
          {oneEventCard.statusId === 1 && (
            <Typography variant="body2" sx={{ color: 'silver' }}>
              ???????? ??????????????
            </Typography>
          )}
          {oneEventCard.statusId === 2 && (
            <Typography variant="body2" sx={{ color: 'silver' }}>
              ?????????????? ??????????????????
            </Typography>
          )}
          <Container>
            {oneEventCard.statusId === 4 && oneEventCard.userId === user.id && (
              <Button variant="text" onClick={() => changeStatus(oneEventCard)}>
                ?????????????????? ??????????????????????
              </Button>
            )}

            {oneEventCard.statusId === 5 && oneEventCard.userId === user.id
              && (
                <Button variant="text" onClick={() => changeStatus(oneEventCard)}>
                  ?????????????????? ??????????????
                </Button>
              )}
          </Container>
          {oneEventCard.userId === user.id ? (
            <Accordion sx={{ width: '50%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>...</Typography>
              </AccordionSummary>
              <AccordionDetails>

                <Button variant="text" onClick={() => deleteOneEvent(oneEventCard.id)}>
                  ?????????????? ??????????????
                </Button>
              </AccordionDetails>
            </Accordion>
          ) : (
            <>
            </>
          )}

        </CardContent>
      </Card>
    </ListItem>
  );
}
