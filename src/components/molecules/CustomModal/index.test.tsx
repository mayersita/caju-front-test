
import { render, screen } from "@testing-library/react";
import CustomModal from ".";

describe("CustomModal", () => {
  it("Should show CustomModal", () => {
    const { debug } = render(
    <CustomModal 
    data-testid="custom-modal" 
    openModal={false} 
    setOpenModal={function (): void {
      throw new Error("Function not implemented.");
    } } 
    title={""} 
    description={""} 
    actionConfirmButton={function (): void {
      throw new Error("Function not implemented.");
    } } 
    actionCancelButton={function (): void {
      throw new Error("Function not implemented.");
    } } 
    isError={false} />);
    expect(screen.queryAllByTestId("custom-modal"));
    debug();
  });
});
