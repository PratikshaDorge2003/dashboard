import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';



const HomePage = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      setData(products);
      setFilteredData(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const applyFiltersAndSearch = (searchText, selectedFilter) => {
    let results = data;
    const trimmedText = searchText.trim().toLowerCase();
    if (trimmedText) {
      results = results.filter((item) =>
        item.title.toLowerCase().includes(trimmedText)
      );
    }

    if (selectedFilter && selectedFilter.label !== "All") {
      results = results.filter(selectedFilter.filter);
    }

    setFilteredData(results);
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setText(searchValue);
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilters(selectedFilter);
    applyFiltersAndSearch(text, selectedFilter); 
  };

  const priceRanges = [
    { label: "All", filter: () => true },
    { label: "Below $30", filter: (item) => item.price <30 },
    { label: "$30 - $100", filter: (item) => item.price >= 30 && item.price <= 100 },
    { label: "Above $100", filter: (item) => item.price >= 100 },
  ];

  return (
    <div>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mt: 4,
        }}
        noValidate
        autoComplete="off"
      >

        <TextField
          sx={{ width: "50%" }}
          id="outlined-basic"
          label="Search Bar"
          variant="outlined"
          onChange={handleSearchChange}
          value={text}
          InputProps={{
            endAdornment: (
              <SearchIcon
                onClick={() => applyFiltersAndSearch(text, filters)}
                sx={{ cursor: "pointer", color: "action" }}
              />
            ),
          }}
        />

        <Select
          value={filters}
          onChange={handleFilterChange}
          displayEmpty
          renderValue={(selected) =>
            selected ? selected.label : "Filter by Price"
          }
          sx={{ width: "200px" }}
        >
          {priceRanges.map((range) => (
            <MenuItem key={range.label} value={range}>
              <Checkbox checked={filters === range} />
              <ListItemText primary={range.label} />
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mt: 4,
        }}
        noValidate
        autoComplete="off"
      >
        {filteredData.map((value) => (
          <div key={value.id}>
            <Card
              sx={{
                width: 300,
                height: 330,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <CardMedia
                component="img"
                alt={value.title}
                height="180"
                image={value.image}
                style={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  sx={{ height: "40px", overflow: "hidden" }}
                >
                  {value.title}
                </Typography>
                <Typography variant="h6">${value.price}</Typography>
                <Rating
                  name="rating"
                  defaultValue={value.rating.rate}
                  size="small"
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default HomePage;
