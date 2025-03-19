import { Modal } from "@/presentation/components/common";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Test Modal component", () => {
  it("should render Modal with 'Test Modal' text", () => {
    render(
      <Modal id="test-modal" isOpen onClose={jest.fn()}>
        Test Modal
      </Modal>
    );
    const modalEl = screen.getByTestId("test-modal") as HTMLDivElement;
    expect(modalEl).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("should not render modal if isOpen prop is false", () => {
    render(
      <Modal id="test-modal" isOpen={false} onClose={jest.fn()}>
        Test Modal
      </Modal>
    );
    const modalEl = screen.queryByTestId("test-modal");
    expect(modalEl).not.toBeInTheDocument();
  });

  it("should click the Close button ", () => {
    const onCloseFn = jest.fn();
    render(
      <Modal id="test-modal" isOpen onClose={onCloseFn}>
        Test Modal
      </Modal>
    );
    fireEvent.click(screen.getByTestId("close-modal-btn") as HTMLButtonElement);
    expect(onCloseFn).toHaveBeenCalledTimes(1);
  });
});
