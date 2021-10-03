import React from 'react';
import LogoWhite from '../../../../assets/img/png/logo-white.png';
import SocialLinks from '../../SocialLinks';

import './MyInfo.scss';

export default function MyInfo() {
    return (
        <div className="my-info">
            <img src={LogoWhite} alt="logo white"/>
            <h4>Start coding</h4>
            <SocialLinks/>
        </div>
    )
}
