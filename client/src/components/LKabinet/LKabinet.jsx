import React, { useEffect } from 'react';
import CardMedia from '@mui/material/CardMedia';
import { useSelector, useDispatch } from 'react-redux';
// import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
// import Container from '@mui/material/Container';
// import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { getUserLK } from '../../redux/YanaSlices/LKSlice';
// import EventCard from '../EventCard/EventCard';
import CardForMainPage from '../EventCard/CardForMainPage';

export default function LKabinet() {
  const dispatch = useDispatch();
  const UserInfo = useSelector((state) => state.user);
  const userLK = useSelector((state) => state.LK);

  const location = useLocation();
  const { setOpen } = location.state || 1; // it's  kostyl :)

  useEffect(() => {
    if (setOpen) {
      setOpen(false);
    }
    dispatch(getUserLK());
  }, []);

  const navigate = useNavigate();
  const seeApplies = () => {
    navigate('/adminAnkets');
  };

  const changeProfile = () => {
    navigate('/myprofile');
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    transition: 'transform 0.5s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container fixed>
        <Grid container sx={{ margin: '5px', width: '98%', marginTop: '20px' }}>
          {/* <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}> */}
          <Grid
            item
            xs={4}
            sx={{
              textAlign: 'right',
              width: '20px',
              paddingRight: '40px',
              display: 'flex',
              justifyContent: 'end',
              height: '300px',
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 151, borderRadius: '20px', border: '1px solid black' }}
              image={UserInfo?.image}
              alt="Live from space album cover"
            />
          </Grid>
          <Grid
            container
            xs={8}
            sx={{ justifyContent: 'flex-end' }}
          >
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '8px',
                width: '30px',
                height: '40px',
                textAlign: 'center',
                opacity: '0.9',
              }}
            >
              <Typography>
                {UserInfo?.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '16px',
                width: '30px',
                height: '60%',
                opacity: '0.9',
              }}
            >
              <Typography component="div">
                Обо мне:
              </Typography>
              <Divider />
              <Typography>
                {UserInfo?.about}
              </Typography>
            </Grid>
            {/* </Stack> */}
            <Grid
              container
              xs={12}
            >
              <Grid
                item
                xs={6}
                sx={{
                  textAlign: 'center',
                }}
              >
                <Button
                  variant="text"
                  onClick={() => changeProfile()}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '8px',
                    width: '90%',
                    color: 'black',
                    height: '60%',
                    opacity: '0.9',
                    '&:hover': {
                      backgroundColor: '#7590ba',
                    },
                  }}
                >
                  Настроить профиль
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  textAlign: 'center',
                }}
              >
                <Button
                  variant="text"
                  onClick={() => seeApplies()}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '8px',
                    width: '90%',
                    color: 'black',
                    height: '60%',
                    opacity: '0.9',
                    '&:hover': {
                      backgroundColor: '#7590ba',
                    },
                  }}
                >
                  Посмотреть заявки
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={2} sx={{ margin: '5px', width: '98%' }}>
          {userLK?.map((el) => (
            <Grid xs={6} sx={{ padding: '5px', cursor: 'pointer' }}>
              <Item sx={{ backgroundColor: 'white', opacity: '0.9' }}>
                <CardForMainPage key={el.id} oneEventCard={el} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
