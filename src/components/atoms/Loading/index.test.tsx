
import { render, screen } from "@testing-library/react";
import Loading from ".";

describe("Loading", () => {
  it("Should show loading", () => {
    const { debug } = render(<Loading data-testid="loading" width="100px" height="100px"/>);
    expect(screen.getByTestId("loading"));
    debug();
  });
});
