import React from 'react';
import MainBanner from '../components/Web/MainBanner';
import HomeCourses from '../components/Web/HomeCourses/HomeCourses';
import HowMyCoursesWork from '../components/Web/HowMyCoursesWork';

const Home = () => {
    return ( 
        <>
            <MainBanner/>
            <HomeCourses/>
            <HowMyCoursesWork/>
        </>
     );
}
 
export default Home;