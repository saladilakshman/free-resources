import { useContext } from 'react'
import "../App.css";
import { AppData } from '../App';
import { CardLayout } from './cardlayout';
function Home() {
    const { state } = useContext(AppData);
    return (
        <>
            <CardLayout data={state?.resourceslist} />
        </>
    )
}

export default Home
