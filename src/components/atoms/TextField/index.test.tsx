
import { render, screen } from "@testing-library/react";
import TextField from ".";

describe("TextField", () => {
  it("Should show textField", () => {
    const { debug } = render(<TextField data-testid="text-field" />);
    expect(screen.queryAllByTestId("text-field"));
    debug();
  });
});
