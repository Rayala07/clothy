const DashboardNav = ({ activeTab, onTabChange }) => {
  const tabs = ["Create Product", "View Products"];

  return (
    <div className="w-full flex border-b border-black">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`px-6 py-4 font-body text-[11px] font-semibold tracking-[0.3em] uppercase transition-all duration-150 cursor-pointer outline-none bg-transparent ${
              isActive
                ? "border-b-2 border-accent text-black opacity-100"
                : "border-b-2 border-transparent text-black opacity-40 hover:opacity-100"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default DashboardNav;
