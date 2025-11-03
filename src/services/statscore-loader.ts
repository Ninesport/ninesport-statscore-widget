/**
 * 擴展 Window 介面以包含 STATSCOREWidgets。
 */
declare global {
    interface Window {
        STATSCOREWidgets?: {
            onLoadCallbacks: ((error?: Event) => void)[];
            onLoad: (callback: (error?: Event) => void) => void;
            Widget?: new (
                arg1: HTMLElement | null,
                arg2: string | undefined,
                arg3: { language: string; eventId: string },
                arg4: { loader: { enabled: boolean } }
            ) => void;
        };
    }
}

const SCRIPT_ID = "STATSCOREWidgetsEmbederScript"
let scriptPromise: Promise<void> | null = null

/**
 * 載入 Statscore 腳本，並確保它在應用程式的生命週期中只被載入一次。
 * @returns {Promise<void>} 一個在腳本成功載入後解析的 Promise。
 */
export function loadStatscoreScript(): Promise<void> {
    if (scriptPromise) {
        return scriptPromise
    }

    scriptPromise = new Promise((resolve, reject) => {
        if (document.getElementById(SCRIPT_ID)) {
            return resolve()
        }

        const script = document.createElement("script")
        script.id = SCRIPT_ID
        script.src = "https://wgt-s3-cdn.statscore.com/bundle/EmbederESM.js"
        script.async = true
        script.type = "module"
        script.onload = () => resolve()
        script.onerror = (error) => reject(error)

        document.body.appendChild(script)
    })

    return scriptPromise
}