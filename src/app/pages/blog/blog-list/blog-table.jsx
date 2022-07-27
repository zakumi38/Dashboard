import {
    faArrowLeft,
    faArrowRight,
    faSearch,
    faPlusCircle
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    Button,
    Divider,
    Grid,
    OutlinedInput,
    Pagination,
    PaginationItem,
    Stack,
    Typography,
    Link
  } from "@mui/material";
  import React from "react";
  import PostsTable from "./blogs-table";
  
  const rightArrow = () => {
    return <FontAwesomeIcon icon={faArrowRight} />;
  };
  const leftArrow = () => {
    return <FontAwesomeIcon icon={faArrowLeft} />;
  };
  
  const UserTable = () => {
    return (
      <Grid
        container
        sx={{
          backgroundColor: "rgba(205, 220, 236, 0.8)",
          padding: "20px",
          alignItems: "center",
          borderRadius: "10px",
          margin: "5rem 0",
        }}
      >
        <Grid item xs={3} sm={5}>
          <Typography variant="h5">Post List</Typography>
        </Grid>

        <Grid item xs={2} sm={2}>
          <Link href={"/blog/add"}>
            <Typography variant="h5" sx={{
              float: "right",
              color: "#000",
              border: "2px solid black",
              padding: "5px 10px",
              borderRadius : "10px"
            }}> 
              <FontAwesomeIcon icon={faPlusCircle} />
            </Typography>
          </Link>
        </Grid>

        <Grid item xs={7} sm={5}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: "flex-end",
            }}
          >
            <OutlinedInput
              sx={{
                width: {
                  xs: "50%",
                  sm: "auto",
                },
              }}
              startAdornment={
                <>
                  <FontAwesomeIcon icon={faSearch} />
                  <Divider
                    sx={{
                      margin: "5px 10px",
                    }}
                    orientation="vertical"
                    variant="middle"
                    flexItem
                  />
                </>
              }
              id="search-bar"
              variant="outlined"
              placeholder="Search here..."
              size="small"
            />
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Stack>
        </Grid>
        <PostsTable />
        <Grid container sx={{ gap: { xs: "1rem", sm: "0" } }}>
          <Grid item xs={12} sm={6}>
            <Stack>
              <Typography>Showing 1 to 4 of 8 entries</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2} sx={{ alignItems: "end" }}>
              <Pagination
                count={8}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: leftArrow,
                      next: rightArrow,
                    }}
                    {...item}
                  />
                )}
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  
  export default UserTable;
  