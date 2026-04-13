import ReactDOM from "react-dom/client"
import App from "./app/App"
import "./app/app.css"
import { Provider } from "react-redux"
import { store } from "./app/app.store"

ReactDOM.createRoot(document.querySelector("#root")).render(
<Provider store={store}>
    <App />
</Provider>
)