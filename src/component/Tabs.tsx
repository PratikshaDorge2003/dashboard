import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DashBoard from './DashBoard';
import  Chart  from './Chart';

 const Tabs=()=> {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="User Management" value="1" />
            <Tab label="User Analytics" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><DashBoard/></TabPanel>
        <TabPanel value="2"><Chart/></TabPanel>
      </TabContext>
    </Box>
  );
}

export default Tabs;
