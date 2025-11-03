import { Widget } from 'ninesport-statscore-widget'

function App() {
  return (
    <>
      <h1>Vite7 + React 19 Widget Example</h1>
      <Widget
        lsportsEventId="12345"
        configurationId="1"
        widgetId="test-widget-2"
        language="en"
      />
    </>
  )
}

export default App