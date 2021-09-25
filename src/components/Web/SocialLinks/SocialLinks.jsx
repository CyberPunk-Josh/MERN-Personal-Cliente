import React from 'react';
import { ReactComponent as YouTube} from '../../../assets/img/svg/youtube.svg';
import { ReactComponent as Facebook} from '../../../assets/img/svg/facebook.svg';
import { ReactComponent as Twitter} from '../../../assets/img/svg/twitter.svg';
import { ReactComponent as Linkedin} from '../../../assets/img/svg/linkedin.svg';

import './SocialLinks.scss';


export default function SocialLinks() {
    return (
        <div className="social-links">
            <a
                href='https://www.youtube.com/'
                className="youtube"
                target="_blank"
                rel="noopener norefer"
            >
                <YouTube/>
            </a>

            <a
                href='https://www.twitter.com/'
                className="twitter"
                target="_blank"
                rel="noopener norefer"
            >
                <Twitter/> 
            </a>

            <a
                href='https://www.facebook.com/'
                className="facebook"
                target="_blank"
                rel="noopener norefer"
            >
                <Facebook/>
            </a>

            <a
                href='https://www.linkedin.com/'
                className="linkedin"
                target="_blank"
                rel="noopener norefer"
            >
                <Linkedin/>
            </a>
        </div>
    )
}