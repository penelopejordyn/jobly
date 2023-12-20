import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "./Home";
import { AuthProvider } from "../testUtils";

//smoke
it("renders", function () {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </MemoryRouter>
  )
});

// snapshots
it("matches snapshot when logged in", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <AuthProvider userInfo={null}>
        <Home />
      </AuthProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});