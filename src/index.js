import React, { Fragment, useEffect, useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom";

import "./index.scss";

import { HashRouter, Route, Switch, BrowserRouter } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";
// import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router';

// ** Import custom components for redux**
import { Provider } from "react-redux";
import store from "./store/index";
// import history from 'utils/history';
import history from "./utils/history";
import { JOBS_ADMIN } from "./constant/actionTypes";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";


// const Registration = lazy(() => import("./components/forms/Registration"));
const Login = lazy(() => import("./components/forms/Login"));
//const Jobs = lazy(() => import("./components/jobs/viewJobs"));
//const Company = lazy(() => import("./components/company/viewCompanies"));
const AddCompany = lazy(() => import("./components/company/addCompany"));
const ViewCompanyDetails = lazy(() => import("./components/company/viewCompanyDetails"));
const JobsDetails = lazy(() => import("./components/jobs/viewJobDetails"));
const JobsApplicants = lazy(() => import("./components/jobs/viewJobApplicants"));
const AddJob = lazy(() => import("./components/jobs/addJob"));
const App = lazy(() => import("./components/app"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const Industry = lazy(() => import("./components/masters/industry"));
const EditIndustry = lazy(() => import("./components/masters/editIndustry"));
const ActiveJobs = lazy(() => import("./components/jobs/activeJobs"));
const PendingJobs = lazy(() => import("./components/jobs/pendingJobs"));
const ActiveCompany = lazy(() => import("./components/company/activeCompany"));
const PendingCompany = lazy(() => import("./components/company/pendingCompany"));


Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  environment: process.env.REACT_APP_SENTRY_ENVIROMENT,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    Sentry.captureException(error);
  }
  render() {
    // if (this.state.hasError) {
    //   return <h1>Something went wrong.</h1>
    // }
    return this.props.children;
  }
}

//firebase Auth
function Root() {

  const [userType, setUserType] = useState('');

  useEffect(() => { setUserType(localStorage.getItem('userType')) }, [])

  useEffect(() => {
    const themeColor = localStorage.getItem("theme-color");
    const layout = localStorage.getItem("layout_version");
    // document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/${themeColor}.css`);
    document.body.classList.add(layout);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <Provider store={store}>
          {/* <BrowserRouter basename={{JOBS_ADMIN}""}> */}
          <ConnectedRouter history={history}>
            <ScrollContext>
              <Switch>
                <Route exact path="/" component={Login} />
                <Fragment>
                  <ErrorBoundary>
                    <App>
                      {/* <PrivateRoute exact path={JOBS_ADMIN + "/jobs"} component={Jobs} /> */}
                      <PrivateRoute exact path={JOBS_ADMIN + "/addJob"} component={AddJob} />
                      <PrivateRoute path={JOBS_ADMIN + "/viewJobDetails/:id"} component={JobsDetails} />
                      <PrivateRoute path={JOBS_ADMIN + "/viewJobApplicants/:id"} component={JobsApplicants} />
                      {/* <PrivateRoute path={JOBS_ADMIN + "/company"} component={Company} /> */}
                      <PrivateRoute exact path={JOBS_ADMIN + "/addCompany"} component={AddCompany} />
                      <PrivateRoute path={JOBS_ADMIN + "/viewCompanyDetails/:id"} component={ViewCompanyDetails} />
                      <PrivateRoute exact path={JOBS_ADMIN + "/jobs/activeJobs"} component={ActiveJobs} />
                      <PrivateRoute exact path={JOBS_ADMIN + "/jobs/pendingJobs"} component={PendingJobs} />
                      <PrivateRoute exact path={JOBS_ADMIN + "/company/activeCompany"} component={ActiveCompany} />
                      <PrivateRoute exact path={JOBS_ADMIN + "/company/pendingCompany"} component={PendingCompany} />
                      {userType === 'admin' && (
                        <>
                          <PrivateRoute path={JOBS_ADMIN + "/master/industry"} component={Industry} />
                          <PrivateRoute path={JOBS_ADMIN + "/master/update-industry"} component={EditIndustry} />
                        </>
                      )}
                      {/* <PrivateRoute path="/companies" component={Companies} /> */}
                    </App>
                  </ErrorBoundary>
                </Fragment>
              </Switch>
            </ScrollContext>
          </ConnectedRouter>
          {/* </BrowserRouter> */}
        </Provider>
      </div>
    </Suspense>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

// serviceWorker.unregister();
