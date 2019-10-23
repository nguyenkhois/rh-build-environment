import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

function Header() {
    useEffect(() => { }, []);

    return (
        <section className="app__header">
        <div>
            <p className="app__header-title">Styleguide development</p>
            <Link to="/" title="Go to the homepage">
                <img src="/images/icon-home.png" className="app__header-icon" alt="" />
            </Link>

            <a href="https://github.com/nguyenkhois/rh-styleguide-build-environment" title="View code on GitHub"
                target="_blank" rel="noopener noreferrer"><img src="/images/github-logo.png" alt="" /></a>
        </div>

        <nav className="app__header__menu">
            <ul>
                <li>
                    <Link to="/cookienotice/">Cookie notice</Link>
                </li>
                <li>
                    <Link to="/eventcalendarblock/">Event calendar block</Link>
                </li>
                <li>
                    <Link to="/eventcardcalendar/">Event card calendar</Link>
                </li>
                <li>
                    <Link to="/feedbackform/">Feedback form (Vårdgivarwebben)</Link>
                </li>
                <li>
                    <Link to="/imageblock/">Image block</Link>
                </li>
                <li>
                    <Link to="/imagehero/">Image hero</Link>
                </li>
                <li>
                    <Link to="/navigationblock/">Navigation block</Link>
                </li>
            </ul>
        </nav>
    </section>
    );
}

export default Header;
