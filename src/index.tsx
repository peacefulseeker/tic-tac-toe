import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // StrictMode renders components twice (on dev but not production) in order to detect any problems
    // with your code and warn you about them (which can be quite useful).
    // https://stackoverflow.com/a/61897567
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

