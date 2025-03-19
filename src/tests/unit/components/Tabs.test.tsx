import { Tabs } from "@/presentation/components/common";
import { render, screen } from "@testing-library/react";

describe("Test Tabs component", () => {
  const tabs = [
    { id: 1, title: "Tab 1", content: "Content tab 1" },
    { id: 2, title: "Tab 2", content: "Content tab 2" },
  ];
  it("should render Tabs with actibeTab 1", () => {
    render(<Tabs tabs={tabs} activeTab={1} onClickTab={jest.fn()} />);
    const tabsEl = screen.getByTestId("tabs") as HTMLDivElement;
    expect(tabsEl).toBeInTheDocument();
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
  });

  it("should render Tabs with actibeTab 1", () => {
    render(<Tabs tabs={tabs} activeTab={2} onClickTab={jest.fn()} />);
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });
});
