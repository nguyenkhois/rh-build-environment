import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './styles/app.scss';
//import './styles/styleguide/stilguide.css';
import './styles/styleguide/main.css';

/* Components */
import ImageBlock from './components/ImageBlock/image-block';

const Header = () => (
    <section className="app__header">
        <div>
            <h1>Styleguide test environment</h1>
            <Link to="/" title="Go to the homepage">
                <img src="/images/icon-home.png" className="app__header-icon" alt=""/>
            </Link>

            <a href="https://github.com/nguyenkhois/rh-styleguide-build-environment" title="View code on GitHub" 
                target="_blank" rel="noopener noreferrer"><img src="/images/github-logo.png" alt=""/></a>
        </div>

        <nav className="app__header__menu">
            <ul>
                <li>
                    <Link to="/imageblock/">Image block</Link>
                </li>
            </ul>
        </nav>
    </section>
);

function App() {
    return (
        <Router>
            <Header />

            <Route path="/imageblock/" component={ImageBlock} />
        </Router>
    );
}

export default App;