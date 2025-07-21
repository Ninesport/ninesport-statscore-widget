import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Widget from './Widget';
import * as scriptLoader from '../../services/statscore-loader';

// 模擬 script-loader 模組，以防止在測試中發出真實的網路請求
vi.mock('../../services/statscore-loader');

describe('Widget Component with .env props', () => {
  // 從 Vite 的環境變數中讀取測試用的 props
  const lsportsEventId = import.meta.env.VITE_TEST_LSPORTS_EVENT_ID;
  const configurationId = import.meta.env.VITE_TEST_CONFIGURATION_ID;
  const widgetId = import.meta.env.VITE_TEST_WIDGET_ID;
  const language = import.meta.env.VITE_TEST_LANGUAGE;

  // 模擬 Statscore 腳本載入後會建立的 Widget 建構函式
  const mockWidgetConstructor = vi.fn();

  beforeEach(() => {
    // 在每個測試案例開始前，重置所有模擬
    vi.clearAllMocks();

    // 模擬 scriptLoader 成功載入
    (scriptLoader.loadStatscoreScript as vi.Mock).mockResolvedValue(undefined);

    // 設定全域 window 物件，模擬腳本載入後的環境
    window.STATSCOREWidgets = {
      Widget: mockWidgetConstructor,
      onLoad: vi.fn(),
      onLoadCallbacks: [],
    };
  });

  it('should render and initialize the widget when env variables are provided', async () => {
    // 檢查 .env 檔案是否已正確設定，若無則拋出錯誤，讓測試失敗並提示開發者
    if (!lsportsEventId || !configurationId || !widgetId || !language) {
      throw new Error("Test environment variables are not set. Please create a .env file with VITE_TEST_* variables.");
    }

    // 渲染元件
    const { container } = render(
      <Widget
        lsportsEventId={lsportsEventId}
        configurationId={configurationId}
        widgetId={widgetId}
        language={language}
      />
    );

    // 驗證：
    // 1. 腳本載入函式被呼叫
    expect(scriptLoader.loadStatscoreScript).toHaveBeenCalledTimes(1);

    // 2. 等待非同步操作完成後，驗證 Statscore Widget 的建構函式是否被正確呼叫
    await waitFor(() => {
      const widgetContainer = container.querySelector(`#STATSCOREWidget${widgetId}`);
      expect(mockWidgetConstructor).toHaveBeenCalledTimes(1);
      expect(mockWidgetConstructor).toHaveBeenCalledWith(widgetContainer, configurationId, { language, eventId: `m:${lsportsEventId}` }, { loader: { enabled: true } });
    });
  });
});