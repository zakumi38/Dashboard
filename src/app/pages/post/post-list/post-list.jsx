import React, { useState ,useEffect } from "react"
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Box, Grid, TextField, InputAdornment, Button, Paper, ThemeProvider, TablePagination, IconButton, createTheme, Typography} from "@mui/material"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowLeft, faArrowRight, faPlus, faEdit, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import postListStyle  from './post-list.module.sass'
import './post-list.module.sass'
import cable_1 from './images/cable_1.png'
import cable_2 from './images/cable_2.jfif'
import cable_3 from './images/cable_3.jfif'

const datas = [
    {
        'id':1,
        'image':cable_1,
        'title':'Some Title 1',
        'description':'Something related to wires',
        'date':new Date().toLocaleDateString(),
    },
    {
        'id':2,
        'image':cable_2,
        'title':'Some Title 2',
        'description':'Something related to wires',
        'date':new Date().toLocaleDateString(),
    },
    {
        'id':3,
        'image':cable_3,
        'title':'Some Title 3',
        'description':'Something related to wires',
        'date':new Date().toLocaleDateString(),
    },
    {
        'id':4,
        'image':cable_1,
        'title':'Some Title 4',
        'description':'Something related to wires',
        'date':new Date().toLocaleDateString(),
    },
    {
        'id':5,
        'image':cable_2,
        'title':'Some Title 5',
        'description':'Something related to wires',
        'date':new Date().toLocaleDateString(),
    },
    {
        'id':6,
        'image':cable_3,
        'title':'Some Title 6',
        'description':'Something related to wires',
        'date':new Date().toLocaleDateString(),
    },
    {
        'id':7,
        'image':cable_1,
        'title':'Some Title 7',
        'description':'Something related to wires',
        'date':new Date().toLocaleDateString(),
    },
]
export default function PostList(){
    const [currentPage, setCurrentPage] = useState(1)
    const [state, setState] = useState({
        busy:true,
        totalPages:0,
    })
    const [data, setData] = useState({})
    useEffect(_ => {
        const pagenumber = Math.ceil(datas.length/3)
        const data = {}
        let counter = 0 
        while(counter < pagenumber){
            data[`${counter + 1}`] = datas.slice(counter * 3, (counter * 3) + 3)
            if(counter === 1){
                setData(data)
                setState({totalPage:pagenumber, busy:false})
            }
            counter++
        }
        setData(data)
        setState({totalPage:pagenumber, busy:false})
    },[])
    if(!state.busy){
        return(
            <ThemeProvider theme={theme}>
                <Box padding=' 0 20px 20px' minWidth={'550px'} position='relative'>
                    <Grid container alignItems='center'> 
                        <Grid container item xs={6} alignItems='center' direction='row' wrap='nowrap'>
                            <Grid item boxSizing='border-box'>
                                <h1>Dashboard</h1>
                            </Grid>
                            <Grid item paddingTop='8px' whiteSpace='nowrap'>
                                <Typography component='span' color='rgb(84, 103, 123, 0.8)' marginLeft='20px'>Post</Typography>
                                <Typography component='span' color='rgba(84, 103, 123)'>  /  Post List</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} container alignItems='center' justifyContent='flex-end'>
                            <Button size='large' variant='contained' color='neutral'><FontAwesomeIcon icon={faPlus} className={postListStyle.maringRightTen}/>Add Post</Button>
                        </Grid>
                    </Grid>
                    <Box component={Paper} bgcolor='#CDDCEC' className={postListStyle.tablecontainer}>
                        <Grid container direction='row' alignItems='center'>
                            <Grid item xs = {6} paddingLeft='20px'>
                                <h2>Post List</h2>
                            </Grid>
                            <Grid container item xs={6} alignItems='center' spacing={3}>
                                <Grid item xs = {7}>
                                    <TextField  fullWidth InputProps={{
                                        placeholder:'search here',
                                        className:postListStyle.textfield,
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <FontAwesomeIcon icon={faSearch} size='lg' className={postListStyle.maringRightTen}/><span className={postListStyle.verticalbar}>|</span>
                                        </InputAdornment>
                                        ),
                                    }}>|
                                    </TextField>
                                </Grid>
                                <Grid item xs = {4}>
                                    <Button fullWidth variant="contained" color='neutral' className={postListStyle.searchbutton}>Search</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <TableContainer component={Box} className={postListStyle.table}>
                            <Table> 
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={postListStyle.tableheadercolumnid} align='center'>ID</TableCell>
                                        <TableCell className={postListStyle.tableheadercolumnimage} align='center'>Image</TableCell>
                                        <TableCell className={postListStyle.tableheadercolumntitle} align='center'>Title</TableCell>
                                        <TableCell className={postListStyle.tableheadercolumndescription} align='center'>Description</TableCell>
                                        <TableCell className={postListStyle.tableheadercolumndate} align='center'>Date</TableCell>
                                        <TableCell className={postListStyle.tableheadercolumnaction} align='center'>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data[`${currentPage}`].map(data => {
                                        return (
                                            <TableRow key={data.id}>
                                                <TableCell className={postListStyle.tablecell} align='center'>{data.id}</TableCell>
                                                <TableCell className={postListStyle.tablecell} align='center'><img src={data.image} width='100px' height='100px'/></TableCell>
                                                <TableCell className={postListStyle.tablecell} align='center'>{data.title}</TableCell>
                                                <TableCell className={postListStyle.tablecell} align='center'>{data.description}</TableCell>
                                                <TableCell className={postListStyle.tablecell} align='center'>{data.date}</TableCell>
                                                <TableCell className={postListStyle.tablecell} align='center'>
                                                    <Grid container alignItems='center' justifyContent='center' spacing={1}>
                                                        <Grid item>
                                                            <FontAwesomeIcon icon={faEdit} size='lg'/>
                                                        </Grid>
                                                        <Grid item>
                                                            <FontAwesomeIcon icon={faTrashCan} color='red' size="lg" />
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography padding='15px' component='h6' fontSize={'1rem'}>Showing {1} to {3} out of {3} entries</Typography>
                                </Grid>
                                <Grid item container xs={6} align='right' alignItems='center' justifyContent='flex-end'>
                                    <IconButton disabled={currentPage === 0 ? true:false} onClick={_ => setCurrentPage(currentPage - 1)}><FontAwesomeIcon icon={faArrowLeft} size='xs'/></IconButton>
                                    <Typography variant='p' className={postListStyle.pagenumber}>{currentPage}</Typography>
                                    <IconButton disabled={currentPage === state.totalPages ? true:false} onClick={_ => setCurrentPage(currentPage + 1)}><FontAwesomeIcon icon={faArrowRight} size='xs'/></IconButton>
                                </Grid>
                            </Grid>
                        </TableContainer>
                    </Box>
                </Box>
            </ThemeProvider>
        )
    }
}