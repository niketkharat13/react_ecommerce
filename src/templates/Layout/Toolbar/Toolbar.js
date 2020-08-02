import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../../NavigationItems/NavigationItems';
const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        {/* <ToggleButton togglebtnHandler={props.toggle} /> */}
        <div className={classes.Logo}>
            <h4>Shopping App</h4>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);
export default Toolbar;