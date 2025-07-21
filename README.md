# Ninesport Statscore Widget

[![npm version](https://badge.fury.io/js/ninesport-statscore-widget.svg)](https://badge.fury.io/js/ninesport-statscore-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一個用於在 React 應用程式中輕鬆嵌入 Statscore 小工具的元件。

此元件會自動處理 Statscore 外部腳本的載入和初始化，並確保在您的應用程式中只會載入一次腳本，即使在不同頁面間切換也能高效運作。

## 安裝

使用 npm:
```bash
npm install ninesport-statscore-widget
```

使用 yarn:
```bash
yarn add ninesport-statscore-widget
```

## 使用方法

在您的 React 元件中匯入 `Widget` 並傳入必要的 props。

```tsx
import React from 'react';
import { Widget } from 'ninesport-statscore-widget';

function MyMatchPage() {
  return (
    <div>
      <h1>比賽串流</h1>
      <Widget
        lsportsEventId="1234567"
        configurationId="YOUR_STATSCORE_CONFIG_ID"
        widgetId="WIDGET_ID"
        language="en"
      />
    </div>
  );
}

export default MyMatchPage;
```
