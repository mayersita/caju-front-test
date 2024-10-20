
import { render, screen } from "@testing-library/react";
import { Header } from ".";

describe("Header", () => {
  it("Should show header", () => {
    const { debug } = render(<Header data-testid="header-caju"><h1>Caju Front Teste</h1></Header>);
    expect(screen.getByTestId("header-caju"));
    debug();
  });
});
