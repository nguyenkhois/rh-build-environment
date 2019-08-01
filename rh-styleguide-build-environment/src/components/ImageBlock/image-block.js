import React, { useEffect } from 'react';
import * as Handlebars from '../../helpers/handlebars.min.js';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import ScreenInfo from '../ScreenInfo/ScreenInfo';

/* Component including */
import './_image-block.scss';
import { context } from './image-block.config.json';
import hbsSource from './image-block.hbs';

const placeholderClassName = "rh-image-block__container--extend";
const componentClassName = "rh-image-block";

/* Testing */
//import './test/image-block.css';
/* End of testing */

export default function ImageBlock() {
    const hbsTemplate = Handlebars.compile(hbsSource);

    useEffect(() => { }, []);

    return (
        <React.Fragment>
            <ErrorBoundary>
                <ScreenInfo
                    placeholderClassName={placeholderClassName}
                    componentClassName={componentClassName}
                />
            </ErrorBoundary>
            
            <div className={placeholderClassName} dangerouslySetInnerHTML={{ __html: hbsTemplate(context) }} />
        </React.Fragment>
    );
}
