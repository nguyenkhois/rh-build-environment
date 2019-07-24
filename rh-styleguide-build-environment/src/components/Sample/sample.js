import React, { Component } from 'react';
import * as Handlebars from '../../helpers/handlebars.min.js';

/* Component including */
import './sample.scss';
import { context } from './sample.config.json';
import hbsSource from './sample.hbs';
const hbsTemplate = Handlebars.compile(hbsSource);

export default class Sample extends Component {
    render() {
        return (
            <React.Fragment>
                <span dangerouslySetInnerHTML={{ __html: hbsTemplate(context) }} />
            </React.Fragment>
        );
    }
};
