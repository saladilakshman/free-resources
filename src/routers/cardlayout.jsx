/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import ShareIcon from '@mui/icons-material/Share';
import { Box, Typography, Paper, Stack, Grid, IconButton } from "@mui/material";
import { AppData } from "../App";
import { useContext } from "react";
export const CardLayout = ({ data }) => {
    const { state, dispatch, isNight } = useContext(AppData)
    return (
        <Grid container spacing={2} sx={{ paddingRight: { xs: 2 } }}>
            {data.map((resource, index) => {
                return <Grid item key={index} xs={12} sm={4} lg={3}>
                    <Paper sx={{
                        width: { xs: '100%', lg: '100%' },
                        height: { xs: '100%', lg: '100%' },
                        p: 1,
                        display: 'flex',
                        flexDirection: "column",
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        filter: `drop-shadow(6px 4px 0px ${isNight ? 'white' : '#252525'})`,
                        borderRadius: 4
                    }}
                        elevation={4}
                        component={motion.div}
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 10, opacity: 1 }}
                        transition={{ ease: 'easeInOut' }}
                    >
                        <Box>
                            <Stack direction="row" justifyContent={"center"} alignItems={"center"} spacing={1.2}>
                                <Box component="img"
                                    src={resource.image}
                                    alt=""
                                    onError={(e) => e.target.src = "https://i.ibb.co/9H0s34n/default-img.jpg"}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        clipPath: 'circle(40%)',
                                    }}
                                />
                                <Typography variant="h6" color="inherit">{resource.productName}</Typography>
                                <IconButton size="small" onClick={() => navigator.share({ url: resource.link })}>
                                    <ShareIcon />
                                </IconButton>
                            </Stack>
                        </Box>
                        <Box>
                            <Typography variant="body1" textAlign="center">{resource.description}</Typography>
                        </Box>
                        <Box>
                            <Stack direction="row" justifyContent="center" aligItems="center" spacing={2}>
                                <button className="view-btn" onClick={() => window.location.href = resource.link}>View</button>
                                <button className="bookmark-btn" onClick={(e) => {
                                    if (e.target.textContent === "Bookmark") {
                                        dispatch({ type: 'add-to-bookmark', payload: resource.productName })

                                    }
                                    if (e.target.textContent === "Delete from Bookmarks") {
                                        dispatch({ type: 'remove-from-bookmark', payload: resource.productName })

                                    }
                                }}>
                                    {state?.bookmarklist?.find((item) => item.productName === resource.productName) ? 'Delete from Bookmarks' : 'Bookmark'}
                                </button>
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>
            })}
        </Grid>

    )
}