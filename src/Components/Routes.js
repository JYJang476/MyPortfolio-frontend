import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import test from "../Screens/main";
import mystory from "../Screens/mystroy";
import mystoryWrtie from "../Screens/mystory_write";
import mystoryEdit from "../Screens/mystory_edit";
import project from "../Screens/project";
import projectEdit from "../Screens/project_edit";
import projectWrite from "../Screens/project_write";
import projectView from "../Screens/projectView";
import Login from "../Screens/login";

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={test}/>
                    <Route exact path="/mystory" component={mystory}/>
                    <Route exact path="/mystory/view/:id" component={mystory}/>
                    <Route exact path="/mystory/write" component={mystoryWrtie}/>
                    <Route exact path="/mystory/edit/:id" component={mystoryEdit}/>
                    <Route exact path="/project" component={project}/>
                    <Route exact path="/project/edit/:id" component={projectEdit}/>
                    <Route exact path="/project/write" component={projectWrite}/>
                    <Route exact path="/project/:id" component={projectView}/>
                    <Route exact path="/login" component={Login}/>
                </Switch>
            </Router>
        );
    }
}

export default Routes;
