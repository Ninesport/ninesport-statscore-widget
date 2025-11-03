import { useEffect, type FunctionComponent } from "react"
import { loadStatscoreScript } from "../../services/statscore-loader"

/**
 * Statscore Widget 元件的 Props。
 */
type WidgetProps = {
    /** 賽事的 LSports 事件 ID。 */
    lsportsEventId: string
    /** 由 Statscore 提供的設定 ID。 */
    configurationId: string
    /** 此特定 Widget 實例的唯一識別碼。如果您在同一個頁面有多個小工具，這非常重要。 */
    widgetId: string
    /** 小工具的顯示語言 (例如: "en", "zh")。 */
    language: string
}

/**
 * 一個用於嵌入 Statscore 小工具的 React 元件。
 * 它會處理外部 Statscore 腳本的非同步載入，並在腳本準備就緒後初始化小工具。它能確保腳本只會被加入頁面一次。
 */
const Widget: FunctionComponent<WidgetProps> = ({ lsportsEventId, configurationId, widgetId, language }) => {
    // 將包含小工具的 div 元素的唯一 ID。
    const widgetElementId = `STATSCOREWidget${widgetId}`

    useEffect(() => {
        let isMounted = true
        const container = document.getElementById(widgetElementId)

        loadStatscoreScript()
            .then(() => {
                // 確保元件仍然掛載，且容器和 Widget 建構函式都存在
                if (isMounted && container && window.STATSCOREWidgets?.Widget) {
                    // 在初始化新 Widget 之前，先清空容器，以防因 props 變更而重新渲染
                    container.innerHTML = ""
                    // 實例化小工具並將其渲染到我們的目標 div 中。
                    new window.STATSCOREWidgets.Widget(
                        container,
                        configurationId,
                        // eventId 需要加上 'm:' 前綴。
                        { language, eventId: `m:${lsportsEventId}` },
                        { loader: { enabled: true } },
                    )
                }
            })
            .catch(error => {
                console.error("Failed to load Statscore script:", error)
            })

        // 清理函式只負責清理此元件實例相關的內容
        return () => {
            isMounted = false
            // 清理此 Widget 實例所佔用的 DOM 內容
            if (container) {
                container.innerHTML = ""
            }
        }
    }, [lsportsEventId, configurationId, widgetId, language]) // 當 props 變更時，重新執行 effect 以更新 Widget

    // 這是將要渲染 Statscore 小工具的容器 div。
    return <div id={widgetElementId} />
}

export default Widget