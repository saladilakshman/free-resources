import { ThemeProvider, createTheme, CssBaseline, Box, Stack, Typography, AppBar, Toolbar, Drawer, ListItem, ListItemButton, ListItemText, useTheme, useMediaQuery, Fab, IconButton, Snackbar, } from "@mui/material";
import { useState, useEffect, createContext, useReducer } from "react";
import Home from "./routers/home";
import Bookmark from "./routers/bookmark";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { resources } from "./routers/product";
import { teal } from '@mui/material/colors';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MenuIcon from '@mui/icons-material/Menu';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkIcon from '@mui/icons-material/Bookmark';
export const AppData = createContext();
function App() {
  const initialstate = {
    resourceslist: resources,
    bookmarklist: [],
    is_item_added_to_bookmark: false,
    snack_message: '',
    show_alert: false,
    alert_icon: null
  }
  const drawerWidth = 200;
  const [selectIndex, setSelectIndex] = useState(0);
  const [activeroute, setActiveroute] = useState(0);
  const theme = useTheme();
  const small_devices = useMediaQuery(theme.breakpoints.down("sm"))
  const [show_drawer, setShow_drawer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const darktheme = createTheme({
    palette: {
      mode: isNight ? 'dark' : 'light'
    }
  })
  const itemslist = resources.map((resource) => resource.category);
  const set = new Set(itemslist)
  let catergoryList;
  catergoryList = [...set]

  const filter_resources = (ind, category) => {
    document.startViewTransition(() => {
      setSelectIndex(ind);
      dispatch({ type: 'filter-list', payload: category });
      if (location.pathname == "/bookmark") {
        navigate(-1)
      }
      setShow_drawer(false)
    })
  }


  useEffect(() => {
    window.onscroll = () => {
      if (document.documentElement.scrollTop > 0) {
        setVisible(true)
      }
      else {
        setVisible(false)
      }
    }
  }, [])


  const reducerfunction = (state, action) => {
    if (action.type === "filter-list") {
      return {
        ...state,
        resourceslist: action.payload === "Tools" ? resources : resources.filter((item) => item.category.toLowerCase() === action.payload.toLowerCase())
      }
    }
    if (action.type === "add-to-bookmark") {
      const push_this_item = resources.find((el) => el.productName === action.payload);
      return {
        ...state,
        show_alert: true,
        alert_icon: <BookmarkAddedIcon sx={{ color: 'green' }} />,
        snack_message: 'Item added to bookmarks',
        is_item_added_to_bookmark: true,
        bookmarklist: [...state.bookmarklist, push_this_item],
      }
    }
    if (action.type === "remove-from-bookmark") {
      const pull_this_item = state.bookmarklist.filter((item) => item.productName !== action.payload)
      return {
        ...state,
        alert_icon: <BookmarkRemoveIcon sx={{ color: 'red' }} />,
        show_alert: true,
        snack_message: 'Item deleted from bookmarks',
        is_item_added_to_bookmark: false,
        bookmarklist: pull_this_item
      }
    }
    if (action.type === "close-snackbar") {
      return {
        ...state,
        show_alert: false,
      }
    }
  }

  const [state, dispatch] = useReducer(reducerfunction, initialstate)

  useEffect(() => {
    const options = {
      dayPeriod: 'long',
      hour12: true,
      second: 'numeric',
      minute: 'numeric',
      hour: 'numeric',
      timeZone: 'Asia/Kolkata'
    }
    setInterval(() => {
      const timer = new Intl.DateTimeFormat("en-IN", options).format(new Date());
      if (timer.includes("night") || timer.includes("evening")) {
        setIsNight(true)
      }
      else {
        setIsNight(false)
      }
    }, 100)
  }, [])

  const RoutingElements = [
    {
      name: 'Home',
      path: '/',
      element: <Home />,
      icon: <HomeIcon />
    },
    {
      name: 'Bookmarks',
      path: '/bookmark',
      element: <Bookmark />,
      icon: <BookmarkIcon />
    }
  ]
  return (
    <>
      <ThemeProvider theme={darktheme}>
        <Snackbar message={
          <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={1.2}>
            <Box>{state.alert_icon}</Box>
            <Typography variant="body1" color="inherit" textAlign="center">{state.snack_message}</Typography>
          </Stack>
        } color="inherit" anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
          size="small"
          autoHideDuration={2000}
          open={state.show_alert}
          onClose={() => { dispatch({ type: 'close-snackbar' }) }}
        />
        <CssBaseline />
        <Box sx={{
          display: 'flex',
        }}>
          <Box>
            <CssBaseline />
            <AppBar position="fixed" color="inherit" sx={{
              width: { lg: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              borderBottom: '2px solid black',
              outline: 'none'
            }}>
              <Toolbar>
                <IconButton size="small" sx={{
                  display: { lg: 'none', sm: 'block' },
                  paddingRight: 2
                }} color="inherit" onClick={() => setShow_drawer(true)}>
                  <MenuIcon />
                </IconButton>
                <Typography variant={small_devices ? 'body1' : 'h4'} color="inherit" textAlign="center">
                  Free-Toolkit
                </Typography>
                <Stack direction="row" justifyContent="end" alignItems="center" sx={{ ml: 'auto' }} spacing={1.8}>
                  {
                    RoutingElements.map((routingelement, index) => {
                      return (
                        <Box key={index} sx={{
                          textDecoration: 'none',
                          color: 'inherit'
                        }}>
                          <Typography variant="body1" color="inherit" sx={{
                            color: index === activeroute ? teal[200] : 'inherit',
                            cursor: 'pointer'
                          }}
                            onClick={() => {
                              navigate(routingelement.path);
                              setActiveroute(index)
                            }}
                          >{routingelement.name}</Typography>
                        </Box>
                      );
                    })
                  }
                </Stack>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth } }}
              aria-label="mailbox folders"
            >
              <Drawer variant={small_devices ? 'temporary' : 'permanent'} open={show_drawer} onClose={() => setShow_drawer(false)}>
                <Box sx={{ width: drawerWidth, p: 1, display: { xs: '', lg: 'block' } }}>
                  {catergoryList.map((resource, index) => {
                    return <ListItem key={index} disablePadding disableGutters>
                      <ListItemButton selected={selectIndex === index} onClick={(e) => filter_resources(index, e.target.textContent)}>
                        <ListItemText>
                          <Typography variant="body1" color="inherit" sx={{
                            color: teal[600],
                            '&:first-letter': {
                              textTransform: 'uppercase'
                            }
                          }}>
                            {resource}
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  })}
                </Box>
              </Drawer>
            </Box>
          </Box>


          <Box
            component="main"
            sx={{
              flexGrow: 2,
              p: 2,
              ml: { sm: 1 },
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            {visible &&
              <Fab size="small" color="primary" sx={{
                position: 'fixed',
                bottom: 12,
                right: 5
              }}
                title="fab"
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              >
                <ArrowUpwardIcon />
              </Fab>
            }
            <AppData.Provider value={{ state, small_devices, dispatch, isNight }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="bookmark" element={<Bookmark />} />
              </Routes>
            </AppData.Provider>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
