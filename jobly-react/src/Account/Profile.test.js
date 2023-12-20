import React from "react";
import { render } from "@testing-library/react";
import Profile from "./Profile";
import { AuthProvider } from "../testUtils";

// smoke
it("renders without crashing", function() {
  render(
    <AuthProvider>
      <Profile />
    </AuthProvider>
    );
});

// snapshot
it("matches snapshot", function() {
  const { asFragment } = render(
    <AuthProvider>
      <Profile />
    </AuthProvider>
    );
  expect(asFragment()).toMatchSnapshot();
});