import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'

class BasicExample extends React.Component {
    render() {
        return (
            <div id="dummy">
                <Header />
                <Nav />
                <Footer />
            </div>
        );
    }
}

function Header() {
    const element =  <header>This is a header</header>;

    ReactDOM.render(
        element,
        document.getElementById('header')
    );
    return null;
}

function Nav() {
    const element = 
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/test">Test</Link></li>
                </ul>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/test" component={Test}/>
            </nav>
        </Router>
    ;

    ReactDOM.render(
        element,
        document.getElementById('nav')
    );
    return null;
}

function Footer() {
    const element = <footer>This is a footer</footer>

    ReactDOM.render(
        element,
        document.getElementById('footer')
    );
    return null;
}

function Home() {
    const element = <h1>Home</h1>

    ReactDOM.render(
        element,
        document.getElementById('main')
    );
    return null;
}

function About() {
    const element = <h1>About</h1>

    ReactDOM.render(
        element,
        document.getElementById('main')
    );
    return null;
}

function Test() {
    const element = <h1>Test</h1>

    ReactDOM.render(
        element,
        document.getElementById('main')
    );
    return null;
}

ReactDOM.render(
    <BasicExample />,
    document.getElementById('header')
);
if you want your components to be classes, you can do something like this:

class Footer extends React.Component {
    render() {             
        return (
            <Myfoot />
        )
    }
};

function Myfoot() {
    const element =  (
         <div id="home" className="col-lg-12">
            <h2>Footer</h2>
         </div>
     )

     return (
         ReactDOM.render(
             element,
             document.getElementById('footer')
         )
     );

}