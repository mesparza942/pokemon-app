import { Input } from "@/presentation/components/common";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Test Input component", () => {
  it("should render Input with text 'Test'", () => {
    render(<Input id="test-input" defaultValue="Test" />);
    const inputEl = screen.getByTestId("test-input") as HTMLInputElement;
    expect(inputEl).toBeInTheDocument();
    expect(inputEl.value).toBe("Test");
  });

  it("should change Input value", () => {
    render(<Input id="test-input" />);
    const input = screen.getByTestId("test-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "new value" } });
    expect(input.value).toBe("new value");
  });
});
