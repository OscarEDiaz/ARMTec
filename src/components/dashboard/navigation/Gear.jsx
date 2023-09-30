import { useState } from 'react';
import { ReactComponent as GearIcon } from '../../../assets/svg/gear-solid.svg';


export const Gear = ({changeView}) => {
    const [begginingTime, setBegginingTime] = useState(0);
    const [newStyle, setNewStyle] = useState({});

    const [isReturning, setIsReturning] = useState(false);
    const [returningTime, setReturningTime] = useState(0);
    const [returningTimer, setReturningTimer] = useState(null);

    const animationDuration = 0.5;
    const animationDurationMs= animationDuration * 1000;

    const handleHover = () => {
        // If a returning animation was on course
        console.log('isReturning: ', isReturning)
        if (isReturning) {
            setIsReturning(false);
            setNewStyle({});

            // Time where the returning animation ended
            const currentTime = new Date();
            const timeFromReturning = currentTime - returningTime;

            const remaining = animationDuration - returningTime.getMilliseconds();

            console.log('TIME FROM RETURNING: ', timeFromReturning)

            // Clear the timer to end returning animation
            clearTimeout(returningTimer);

            // Calculate the time to complete the animation
            const remainingTime = (animationDurationMs - remaining - timeFromReturning)/1000;

            const remainingDegrees = (remainingTime * 360)/animationDuration;

            const style = {
                transform: `rotate(${remainingDegrees}deg)`,
                transition: 'transform',
                transitionDuration: `${remainingTime}s`,
                transitionTimingFunction: 'ease',
            };
            
            setNewStyle(style);
        } else {
            const currentTime = new Date();
            console.log('Start of the animation: ', currentTime);

            setBegginingTime(currentTime);

            // If its a new animation            
            const style = {
                transform: 'rotate(360deg)',
                transition: 'transform',
                transitionDuration: `${animationDuration}s`,
                transitionTimingFunction: 'ease',
            };
            
            setNewStyle(style);
        }
    }

    const handleUnHover = () => {           
        // Get current time to calculate the time passed since the beggining of the animation
        const currentTime = new Date();
        const timePassed = currentTime - begginingTime;

        console.log('Time passed since the beggining of the animation: ', timePassed)
        
        // If the animation hasn't ended
        if (timePassed <= animationDurationMs) {
            // Gear animation is in reverse
            console.log('Setting isReturning to true')
            setIsReturning(true);

            // Save time returning time
            const returnTime = new Date();
            setReturningTime(returnTime);

            const timeInSeconds = timePassed/1000;
            const remainingDegrees = (timeInSeconds * 360)/animationDuration;

            const style = {
                transform: `rotate(-${remainingDegrees}deg)`,
                transition: 'transform',
                transitionDuration: `${timeInSeconds}s`,
                transitionTimingFunction: 'ease',
            };

            setNewStyle(style);

            // Start timer
            const timer = setTimeout(() => {
                setIsReturning(false);
                console.log('Finished');
            }, timePassed);

            setReturningTimer(timer);
        } else if (!isReturning) {
            setIsReturning(false);

            console.log('Returning after completing advancing')

            // If the animation has ended just return to the normal state
            const style = {
                transform: `rotate(-360deg)`,
                transition: 'transform',
                transitionDuration: `${animationDuration}s`,
                transitionTimingFunction: 'ease',
            };

            setNewStyle(style);

            // Start timer
            const timer = setTimeout(() => {
                setIsReturning(false);
                console.log('Finished returning');
            }, timePassed);

            setReturningTimer(timer);
        }

    }

    const handleOnClick = () => {
        changeView('CONFIG');
    }

    return (
        <GearIcon className={'gear'} style={newStyle} onMouseEnter={handleHover} onMouseLeave={handleUnHover} onClick={handleOnClick} />
    )
}
