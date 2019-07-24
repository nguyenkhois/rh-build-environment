import React, { Component } from 'react';
import * as Handlebars from '../../helpers/handlebars.min.js';

/* Component including */
import './cookie-notice.scss';
import { context } from './cookie-notice.config.json';
import hbsSource from './cookie-notice.hbs';
const hbsTemplate = Handlebars.compile(hbsSource);

export default function CookieNotice () {
    return (
        <React.Fragment>
            <span dangerouslySetInnerHTML={{ __html: hbsTemplate(context) }} />
        </React.Fragment>
    );
}
