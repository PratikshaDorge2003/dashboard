import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCount, deleteUser, fetchUserData } from './userSlice';
import { RootState } from './store';
import { AppDispatch } from './store';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  birthDate: string;
  gender: string;
  email: string;
}

const DashBoard: React.FC = () => {
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.data);
  const navigate = useNavigate();

  const infoColumns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'birthDate', headerName: 'Birth Date', width: 200 },
    { field: 'gender', headerName: 'Gender', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => (
        <div>
          <DeleteIcon
            onClick={() => deleteData(params.row as User)}
            style={{ cursor: 'pointer' }}
            fontSize="small"
          />
          <OpenInNewIcon
            fontSize="small"
            style={{ cursor: 'pointer' }}
            onClick={() => openFunction(params.row as User)}
          />
        </div>
      ),
      width: 100,
    },
  ];

  const openFunction = (row: User) => {
    navigate(`/${row.firstName}/${row.id}`);
  };

  const deleteData = (row: User) => {
    dispatch(deleteUser(row.email));
    setFilteredData((prev) => prev.filter((item) => item.email !== row.email));
    setCount((prev)=>prev-1);
    dispatch(deleteCount());
  };

  const handleSearch = () => {
    if (!user) return;
    const response = user.filter(
      (val: User) =>
        val.firstName.toLowerCase().startsWith(name.toLowerCase()) &&
        val.email.toLowerCase().startsWith(email.toLowerCase())
    );
    setFilteredData(response);
    setCount(response.length);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (!user.length) {
      dispatch(fetchUserData());
      
    }
  }, [dispatch, user.length]);

  useEffect(() => {
    if (user.length && filteredData.length === 0 && name==='' && email==='') {
      setFilteredData(user);
      setCount(user.length); 
    }
  }, [user, filteredData.length,name,email]);
  


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      <div className="centerized">
        <h2>Management DashBoard</h2>
      </div>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          mb: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{ width: '350px', m: 2 }}
          id="outlined-basic"
          label="Name"
          value={name}
          variant="outlined"
          onChange={handleNameChange}
        />
        <TextField
          sx={{ width: '350px', m: 2 }}
          id="outlined-basic"
          label="Email"
          value={email}
          variant="outlined"
          onChange={handleEmailChange}
        />
        <Button
          variant="contained"
          sx={{ height: '40px', width: '150px' }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Alert severity="success" sx={{ mb: 1 }}>
        Search Results ({count})
      </Alert>
      <Paper sx={{ height: 400, width: '100%', mt: 2, mb: 2 }}>
        <DataGrid
          rows={filteredData}
          columns={infoColumns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{
            '& .MuiDataGrid-columnHeader': {
              fontWeight: 'bold',
              backgroundColor: '#0066b2',
              color: 'white',
            },
            '& .MuiDataGrid-sortIcon': {
              color: 'white',
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default DashBoard;
