import { ThemeProvider, createTheme} from '@mui/material'
import AddPost from "./app/pages/post/post-detail/post-detail";

const theme = createTheme({
  palette:{
      neutral:{
          main:'#C0CDDB'
      }
  }
})
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AddPost/>
      </div>
    </ThemeProvider>
  );
}


export default App;
