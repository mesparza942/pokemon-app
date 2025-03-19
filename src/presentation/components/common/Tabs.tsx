import { ReactNode } from "react";

interface TabsProps {
  activeTab: number;
  tabs: Array<{ id: number; title: string; content: ReactNode | string }>;
  onClickTab: (tabId: number) => void;
}
const Tabs = ({ activeTab, tabs, onClickTab }: TabsProps) => {
  return (
    <>
      <div
        data-testid="tabs"
        className="border border-gray-400 bg-gray-300 text-black overflow-hidden rounded-2xl"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`text-sm bg-inherit cursor-pointer px-8 py-2 hover:bg-gray-400 ${
              tab.id === activeTab ? "!bg-gray-400" : ""
            }`}
            onClick={() => onClickTab(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div data-testid="tab-content" className="text-black">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </>
  );
};

export default Tabs;
