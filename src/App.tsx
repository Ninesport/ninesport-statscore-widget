import "./App.css"
import Widget from "./components/Widget/Widget"

function App() {
    // 從 Vite 的環境變數中讀取測試用的 props
    const lsportsEventId = import.meta.env.VITE_TEST_LSPORTS_EVENT_ID
    const configurationId = import.meta.env.VITE_TEST_CONFIGURATION_ID
    const widgetId = import.meta.env.VITE_TEST_WIDGET_ID
    const language = import.meta.env.VITE_TEST_LANGUAGE

    return <Widget
        lsportsEventId={lsportsEventId}
        configurationId={configurationId}
        widgetId={widgetId}
        language={language}
    />
}

export default App
