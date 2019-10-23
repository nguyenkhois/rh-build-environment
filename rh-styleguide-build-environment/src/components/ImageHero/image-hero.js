import React, { useEffect } from 'react';
import { ErrorBoundary, ComponentInfo } from '../../helpers/';

/* Component definitions */
const componentName = "image-hero";

//require(`./_${componentName}.scss`); // Created in Styleguide that's why it's not needed
const { context } = require(`./${componentName}.config.json`);
const hbsTemplate = require(`./${componentName}.hbs`);

const placeholderClassName = `app__${componentName}__placeholder`;
//const componentClassName = `rh-${componentName}`;
const componentClassName = `rh-hero`; // Special case

export default function ImageHero() {
    useEffect(() => { }, []);

    return (
        <React.Fragment>
            <ErrorBoundary>
                <ComponentInfo
                    placeholderClassName={placeholderClassName}
                    componentClassName={componentClassName}
                />
            </ErrorBoundary>

            <div className={placeholderClassName} dangerouslySetInnerHTML={{ __html: hbsTemplate(context) }} />
        </React.Fragment>
    );
}
