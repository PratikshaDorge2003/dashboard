import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useParams } from 'react-router-dom';
import { UserData } from './userSlice';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SchoolIcon from '@mui/icons-material/School';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const Details = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<UserData | null>(null);


  useEffect(() => {
    const filterData = () => {
      const result = user?.find((val) => val.id.toString() === id) || null;
      setDetails(result);
    };
    filterData();
  }, [user, id]);
  

  return (
    <div className='centerized' style={{ height: "500px" }}>
        <h3 className='centerized'>User Details View</h3>
      <Box sx={{ width: '100%', maxWidth: 360, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
        <List>
        <img src={details?.image} alt="" />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon> <InboxIcon /> </ListItemIcon>
              <ListItemText primary={  details ? `${details.firstName} ${details.lastName}` : 'No data available' } />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon> <SchoolIcon /> </ListItemIcon>
              <ListItemText primary={  details ? `${details.university}` : 'No data available' } />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon> <LocalPhoneIcon /> </ListItemIcon>
              <ListItemText primary={  details ? `${details.phone}` : 'No data available' } />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={details?.email || 'No data available'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary={details?.username || 'No data available'} />
            </ListItemButton>
          </ListItem>
        </List>

      </Box>
    </div>
  );
};

export default Details;
