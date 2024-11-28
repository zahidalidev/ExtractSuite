// RootLayout.js
import Link from 'next/link';
import { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import styles from '../../styles/AppBar.module.css';

export default function RootLayout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(true); 

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <html lang="en">
      <body className="flex min-h-screen w-full bg-background antialiased font-lexend">
        <div className="flex min-h-screen">
          <Drawer
            sx={{
              width: openDrawer ? 250 : 0, 
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 250,
                backgroundColor: '#023246',
                color: '#fff',
              },
            }}
            variant="persistent"
            anchor="left"
            open={openDrawer}
          >
            <div>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <List>
              <ListItem button>
                <Link href="/emailfinder">
                  <a className={styles.drawerLink}>
                    <ListItemText primary="Email Finder" />
                  </a>
                </Link>
              </ListItem>
              <ListItem button>
                <Link href="/csvmerger">
                  <a className={styles.drawerLink}>
                    <ListItemText primary="CSV Merger" />
                  </a>
                </Link>
              </ListItem>
              <ListItem button>
                <Link href="/fileconverter">
                  <a className={styles.drawerLink}>
                    <ListItemText primary="File Converter" />
                  </a>
                </Link>
              </ListItem>
              <ListItem button>
                <Link href="/urlopener">
                  <a className={styles.drawerLink}>
                    <ListItemText primary="URL Opener" />
                  </a>
                </Link>
              </ListItem>
              <ListItem button>
                <Link href="/webbuilder">
                  <a className={styles.drawerLink}>
                    <ListItemText primary="Web Builder" />
                  </a>
                </Link>
              </ListItem>
            </List>
            <Divider />
          </Drawer>

          {/* Main Content Area */}
          <main
            style={{
              flexGrow: 1,
              padding: '1rem',
              transition: 'margin-left 0.3s ease',
              marginLeft: openDrawer ? 250 : 0, 
            }}
          >
          </main>
        </div>
      </body>
    </html>
  );
}
