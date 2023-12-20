import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  Link: 'a'
}));

// smoke
it("renders without crashing", function() {
  render(
    <Login />
  );
});

// snapshot
it("matches snapshot", function() {
  const { asFragment } = render(<Login />);
  expect(asFragment()).toMatchSnapshot();
});