import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

/*
    PartialLoader Component
    Description: A simple loader component that displays a circular progress indicator.
    Used to indicate loading states in the application.
    TO_DO: inline CSS will be removed by using theme configuration of Material UI and by using Tailwind Classes
*/

export const PartialLoader = () => {
    return (<Stack sx={{ color: 'grey.500', display: 'block', textAlign: 'center' }}>
        <CircularProgress color="inherit" />
    </Stack>)
}