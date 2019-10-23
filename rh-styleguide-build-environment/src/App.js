import { hot } from 'react-hot-loader/root';
import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ErrorBoundary, ScreenInfo, Header } from './helpers/';

import './styles/app.scss';

import './styles/styleguide/stilguide.css';
import './styles/components.scss';

/* Components */
const CookieNotice = lazy(() => import('./components/CookieNotice/cookie-notice'));
const EventCalendarBlock = lazy(() => import('./components/EventCalendarBlock/event-calendar-block'));
const EventCardCalendar = lazy(() => import('./components/EventCardCalendar/event-card-calendar'));
const FeedbackForm = lazy(() => import('./components/FeedbackForm/feedback-form'));
const ImageBlock = lazy(() => import('./components/ImageBlock/image-block'));
const ImageHero = lazy(() => import('./components/ImageHero/image-hero'));
const NavigationBlock = lazy(() => import('./components/NavigationBlock/navigation-block'));

function App() {
    useEffect(() => { }, []);

    return (
        <Router>
            <Header />

            <ScreenInfo />
            <Suspense fallback={<div>Loading...</div>}>
                <ErrorBoundary>
                    <Switch>
                        <Route path="/cookienotice/" component={CookieNotice} />
                        <Route path="/eventcalendarblock/" component={EventCalendarBlock} />
                        <Route path="/eventcardcalendar/" component={EventCardCalendar} />
                        <Route path="/feedbackform/" component={FeedbackForm} />
                        <Route path="/imageblock/" component={ImageBlock} />
                        <Route path="/imagehero/" component={ImageHero} />
                        <Route path="/navigationblock/" component={NavigationBlock} />
                    </Switch>
                </ErrorBoundary>
            </Suspense>
        </Router>
    );
}

export default hot(App);