import { Button } from "@/presentation/components/common";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Test Button component", () => {
  it("should render Button with text 'Test'", () => {
    render(<Button btnText="Test" />);
    expect(screen.getByTestId("button-test")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should click the Button component", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} btnText="test" />);
    fireEvent.click(screen.getByTestId("button-test"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render a disabled Button", () => {
    render(<Button btnText="Test" disabled />);
    const element = screen.queryByTestId("button-test");
    expect(element).toBeDisabled();
  });
});
