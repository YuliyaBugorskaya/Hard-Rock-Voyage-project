// import React from 'react';
// import CardMedia from '@mui/material/CardMedia';
// import Stack from '@mui/material/Stack';
// import { useSelector } from 'react-redux';
// import { Typography } from '@mui/material';
// import Container from '@mui/material/Container';

// export default function UserPage() {
//   const UserInfo = useSelector((state) => state.user);
//   // const userLK = useSelector((state) => state.LK);

//   return (
//     <>
//       <Stack direction="row" spacing={2} sx={{ display: 'flex',
// justifyContent: 'center', marginTop: '10px' }}>
//         <CardMedia
//           component="img"
//           sx={{ width: 151 }}
//           image={UserInfo?.image}
//           alt="Live from space album cover"
//         />

//         <Typography>
//           {UserInfo.name}
//         </Typography>
//       </Stack>
//       <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
//         {UserInfo.about}
//       </Container>
//     </>
//   );
// }
