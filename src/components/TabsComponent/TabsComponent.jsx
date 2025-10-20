import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { tabsConfig } from "./tabs.config"

function TabsComponent() {
    const location = useLocation()
    const [activeTab, setActiveTab] = useState(null)
    const [tabs, setTabs] = useState([])

    useEffect(() => {
        const path = location.pathname
        const newTabs = tabsConfig[path] || []
        setTabs(newTabs)
        setActiveTab(newTabs[0]?.id || null)
    }, [location.pathname])

    if (!tabs.length) return null

    return (
        <div className="w-full">
            <div className="flex border-b dark:border-[#3b4754] border-gray-200 gap-4 overflow-x-auto" style={{ margin: '5px', maxHeight: '55vh' }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`flex flex-col items-center justify-center pb-3 pt-2 text-sm font-bold tracking-[0.015em] font-display transition-colors
                            ${activeTab === tab.id
                                ? "border-b-2 border-b-primary text-[#680202]"
                                : "border-b-2 border-b-transparent dark:text-[#0e2d56] hover:text-primary dark:hover:text-[#333399]"
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-1">
                {tabs.map((tab) => (
                    <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TabsComponent
