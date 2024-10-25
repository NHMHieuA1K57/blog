import { Toaster } from "react-hot-toast";
import { Outlet, Route, Routes } from "react-router-dom";

import React from "react";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import routes from "./routes";
function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        {routes.map((route, indexParent) => {
          const Wrapper = route.isProtected ? ProtectedRoute : React.Fragment;
          return (
            <Route
              key={indexParent}
              path={route.path}
              element={
                <Wrapper>
                  {route.layout ? (
                    <route.layout>
                      <Outlet />
                    </route.layout>
                  ) : (
                    <route.component />
                  )}
                </Wrapper>
              }
            >
              {route?.children?.map((routeChild, indexChild) => {
                return (
                  <Route
                    key={`route-${indexParent} = ${indexChild}`}
                    path={routeChild.path}
                    element={
                      <Wrapper>
                        <routeChild.component />
                      </Wrapper>
                    }
                  />
                );
              })}
            </Route>
          );
        })}
        <Route path="*" element={<div>There nothing here: 404!</div>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
