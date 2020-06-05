import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import CustomNav from './components/CustomNav';
// import CustomFooter from './components/CustomFooter';
// // import {Main} from './routes/routes'
// import RegisterPage from './pages/RegisterPage';
// import LoginPage from './pages/LoginPage';
// import {Navbar, Nav, Icon} from 'rsuite'

// class BasicExample extends React.Component {
//     render() {
//         return (
//             <div id="dummy">
//                 {/* <Header /> */}
//                 <Navb />
//                 <Footer />
//             </div>
//         )
//     }
// }

// function Header() {
//     ReactDOM.render(<CustomNav />, document.getElementById('header'))
//     return null
// }

// function Navb() {
//   console.log('nav')
//     const element = 
//         <Router>
 
//             <Navbar appearance="inverse">
//               <Navbar.Header>Chat application</Navbar.Header>
//               <Navbar.Body>
//                 <Nav pullRight>
//                   <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
//                     Home
//                   </Nav.Item>
//                   <Nav.Item eventKey="2"><Link to="/login">Sign in...</Link></Nav.Item>
//                   <Nav.Item eventKey="3"><Link to="/register">Sign up...</Link></Nav.Item>
//                 </Nav>
//               </Navbar.Body>
//             </Navbar>

//             {/* <nav>
//                 <ul>
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/login">About</Link></li>
//                     <li><Link to="/register">Test</Link></li>
//                 </ul> */}
//                 <Route exact path="/" />
//                 <Route path="/login" component={LoginPage}/>
//                 <Route path="/register" component={RegisterPage}/>
//             {/* </nav> */}
//         </Router>

//     ReactDOM.render(element, document.getElementById('nav'))
//     return null
// }

// function Footer() {
//     ReactDOM.render(<CustomFooter />, document.getElementById('footer'))
//     return null
// }

// ReactDOM.render(<BasicExample />, document.getElementById('header'))