import React from "react";
import { Breadcrumbs, FormControl, TextField,InputLabel, Grid, Link, Typography ,Box, Button} from '@mui/material'
export default function AddPost(){
    const inputRef = React.useRef();
    const [selectionStart, setSelectionStart] = React.useState();
    const updateSelectionStart = () =>
    setSelectionStart(inputRef.current.selectionStart);
    return(
        <Box padding='20px'>
            <Typography variant='h4' color='#54677B' display='inline-block' margin='0 20px 20px 0'>DashBoard</Typography>
            <Breadcrumbs sx={{color:'#54677B', display:'inline-block'}}>
                <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
                >Post</Link>
                <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
                >Add New Post</Link>
            </Breadcrumbs>
            <Grid container sx={{background:'#CDDCEC 80%',padding:'20px',boxSizing:'borderBox',borderRadius:'8px'}} direction='column' spacing={2}>
                <Grid item>
                    <Typography component='h5'>Add New Post</Typography>
                </Grid>
                <Grid item container spacing={4} xs={12}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField placeholder="Post Title" aria-describedby="my-helper-text"/>
                        </FormControl>
        
                    </Grid>
                    <Grid item xs={6} align='right'>
                        <FormControl fullWidth>
                            <TextField placeholder="Date" aria-describedby="my-helper-text"/>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField placeholder='Post Image' aria-describedby="my-helper-text"/>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField 
                                onSelect={updateSelectionStart}
                                inputRef={inputRef}
                                placeholder="Post Description" 
                                aria-describedby="my-helper-text"
                                multiline
                                inputProps={{style:{height:'200px',overflowY:'scroll'}}}/>
                    </FormControl>
                </Grid>
                <Grid item align='right'>
                    <Button color='neutral' variant='contained'>Add Post</Button>
                </Grid>
            </Grid>
        </Box>
    )
} 