// import * as React from 'react';
// import PropTypes from 'prop-types';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Link from 'next/link';
// import Button from '@mui/material/Button';
// import EmailIcon from '@mui/icons-material/Email';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import AddLinkIcon from '@mui/icons-material/AddLink';
// import LanguageIcon from '@mui/icons-material/Language';

// const drawerWidth = 240;

// function ResponsiveDrawer(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [activeItem, setActiveItem] = React.useState('Email Finder');

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const container = window !== undefined ? () => window().document.body : undefined;

//   const drawer = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', marginLeft: '12px' }}>
//         {[
//           { text: 'Email Finder', icon: <EmailIcon /> },
//           { text: 'CSV Merger', icon: <NoteAddIcon /> },
//           { text: 'File Converter', icon: <FileCopyIcon /> },
//           { text: 'URL Opener', icon: <AddLinkIcon /> },
//           { text: 'Web Builder', icon: <LanguageIcon /> },
//         ].map((item, index) => (
//           <React.Fragment key={item.text}>
//             <ListItem disablePadding sx={{ width: '100%' }}>
//               <Link href={item.text.toLowerCase().replace(' ', '')} passHref>
//                 <ListItemButton
//                   component="a"
//                   sx={{
//                     textDecoration: 'none',
//                     padding: '15px 20px',
//                     display: 'flex',
//                     justifyContent: 'flex-start',
//                     color: activeItem === item.text ? 'white' : 'white',
//                     '&:hover': {
//                       backgroundColor: '#282c34',
//                       color: 'white',
//                     },
//                     borderRadius: '8px',
//                     marginBottom: '15px',
//                     transition: 'background-color 0.3s ease, color 0.3s ease',
//                     width: '100%',
//                   }}
//                   onClick={() => setActiveItem(item.text)}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
//                     {item.icon}
//                   </Box>
//                   <ListItemText
//                     primary={item.text}
//                     sx={{
//                       textAlign: 'left',
//                       fontSize: '16px',
//                       fontWeight: '500',
//                       fontFamily: 'Roboto, sans-serif',
//                     }}
//                   />
//                 </ListItemButton>
//               </Link>
//             </ListItem>
//             {index < 4 && <Divider sx={{ width: '80%', margin: '0 auto', borderColor: 'black' }} />}
//           </React.Fragment>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <Box sx={{ display: 'flex', backgroundColor: 'black' }}>
//       <CssBaseline />
//       {/* <AppBar
//         position="fixed"
//         sx={{
//           width: '50%',
//           height: '80px',
//           marginRight: '300px',
//           top: '10px',
//           borderRadius: '24px',
//           backgroundColor: 'black',
//           padding: '4px 12px',
//           border: '2px solid #3a3a3a',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
//         }}
//       >
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <IconButton
//             color="inherit"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ display: { xs: 'block', sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '20px' }}>
//             {['Name/Logo', 'About'].map((item) => (
//               <Typography key={item} variant="h6" component="div" sx={{ color: '#ffffff' }}>
//                 {item}
//               </Typography>
//             ))}
//             <Link href="/contact" passHref>
//               <Typography variant="h6" component="a" sx={{ color: '#ffffff', textDecoration: 'none' }}>
//                 Contact
//               </Typography>
//             </Link>
//           </Box>
//           <Box sx={{ display: 'flex', gap: '10px' }}>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: 'red',
//                 color: 'white',
//                 borderRadius: '15px',
//                 padding: '5px 15px',
//                 '&:hover': { backgroundColor: '#b30000' },
//               }}
//             >
//               Login/Register
//             </Button>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: 'yellow',
//                 color: 'black',
//                 borderRadius: '15px',
//                 padding: '5px 15px',
//                 '&:hover': { backgroundColor: '#ffcc00' },
//               }}
//             >
//               Subscribe
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar> */}

//       <Drawer
//         container={container}
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true,
//         }}
//         sx={{
//           display: { xs: 'block', sm: 'none' },
//           '& .MuiDrawer-paper': {
//             boxSizing: 'border-box',
//             width: drawerWidth,
//             backgroundColor: 'black',
//             color: 'white',
//             padding: '20px',
//           },
//         }}
//       >
//         {drawer}
//       </Drawer>

//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: 'none', sm: 'block' },
//           '& .MuiDrawer-paper': {
//             boxSizing: 'border-box',
//             width: drawerWidth,
//             backgroundColor: 'black',
//             color: 'white',
//             padding: '20px',
//             borderRight: '2px solid #3a3a3a',
//           },
//         }}
//         open
//       >
//         {drawer}
//       </Drawer>

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: calc(100% - ${drawerWidth}px) },
//           ml: { xs: 0, sm: ${drawerWidth}px },
//           mt: -7,
//         }}
//       >
//         <Toolbar />
//       </Box>
//     </Box>
//   );
// }

// ResponsiveDrawer.propTypes = {
//   window: PropTypes.func,
// };

// export default ResponsiveDrawer;