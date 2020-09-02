import React from 'react';

import Project from './Project/Project';
import style from './Work.module.css';

import kunjaniImg1 from '../../../assets/images/kunjani_imgs/Beer&Food.jpg';
import kunjaniImg2 from '../../../assets/images/kunjani_imgs/Wine.jpg';
import kunjaniImg3 from '../../../assets/images/kunjani_imgs/HappyHour.jpg';

import mixxerImg1 from '../../../assets/images/mixxer_imgs/1.png';
import mixxerImg2 from '../../../assets/images/mixxer_imgs/2.png';
import mixxerImg3 from '../../../assets/images/mixxer_imgs/3.png';
import mixxerImg4 from '../../../assets/images/mixxer_imgs/4.png';

import portfolio1 from '../../../assets/images/portfolio_site/1.png';
import portfolio2 from '../../../assets/images/portfolio_site/2.png';
import portfolio3 from '../../../assets/images/portfolio_site/3.png';

const work = (props) => {
    let kunjaniImgs = [kunjaniImg1, kunjaniImg2, kunjaniImg3];
    let mixxerImgs = [mixxerImg1, mixxerImg2, mixxerImg3, mixxerImg4];
    let portfolioImgs = [portfolio1, portfolio2, portfolio3];

    return (
        <div className={style.Work}>
            <Project 
                title={'PORTFOLIO SITE'} 
                description={'A showcase of my desgin skills, built from the ground up with a combination of react and firebase. While considering the stack and overall design of my site I wanted to keep industry standards and practices in mind so that my codebase would remain managable and maintainable.'} 
                stack={['JavaScript','HTML','CSS','REACT.js','Node.js','Mongodb','Sketch']}
                date={'JUL - AUG'}
                index={1}
                imgs={portfolioImgs}
                primary={props.secondary}
                secondary={props.primary} />
            <Project
                title={'MIXXER WEBAPP'} 
                description={'Mixxer is a web based app that utilizes Spotifys Web API, Web Playback SDK, and other 3rd party        Javascript frameworks to visualize playback.'} 
                stack={['REST API','Node.js','JQuery','JavaScript','HTML','CSS',]}
                date={'MAR - MAY'}
                index={2}
                imgs={mixxerImgs}
                primary={props.secondary}
                secondary={props.primary} />
            <Project 
                title={'MENU REDESIGN'} 
                description={'Menu redeisgn for local cafe.'} 
                stack={['Photoshop','Illustrator']}
                date={'MAY - AUG'}
                index={3}
                imgs={kunjaniImgs}
                primary={props.secondary}
                secondary={props.primary} />
        </div>
    );
};

export default work;