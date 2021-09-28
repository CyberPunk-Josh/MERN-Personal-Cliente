import React from 'react';
import MainBanner from '../components/Web/MainBanner';
import HomeCourses from '../components/Web/HomeCourses/HomeCourses';
import HowMyCoursesWork from '../components/Web/HowMyCoursesWork';
import ReviewCourses from '../components/Web/ReviewCourses/ReviewCourses';

const Home = () => {
    return ( 
        <>
            <MainBanner/>
            <HomeCourses/>
            <HowMyCoursesWork/>
            <ReviewCourses/>
        </>
     );
}
 
export default Home;