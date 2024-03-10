import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AppData } from '../App';
import { useContext } from "react";
import bookmark from "../assets/bookmark.jpg";
import { CardLayout } from './cardlayout';
import { Typography, Stack } from '@mui/material';
const Bookmark = () => {
    const { state, small_devices } = useContext(AppData);
    console.log(state.bookmarklist)
    return (
        <>
            {state.bookmarklist.length === 0 ?
                (
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1.2} sx={{ paddingBlockStart: 15 }}>
                        <Typography variant={small_devices ? 'h5' : 'h4'} color="inherit" textAlign="center">Sorry! No bookmarks added</Typography>
                        <LazyLoadImage src={bookmark} height={"300"} alt="" width={small_devices ? '100%' : '400'} />
                    </Stack>
                ) :
                (
                    <CardLayout data={state.bookmarklist} />

                )
            }
        </>
    )
}
export default Bookmark
