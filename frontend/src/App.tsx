import "./App.css";
import ChatBoxWrapper from "./components/ChatBoxWrapper";
import { ErrorBoundary } from "./components/ErrorBoundry";

function App() {
  return (
    <div className="p-5 md:p-10 mx-auto h-screen w-full flex justify-center items-center flex-col relative">
      <h1 className="text-2xl mb-10">Manifest AI bot</h1>

      <ErrorBoundary>
        <ChatBoxWrapper />
      </ErrorBoundary>
    </div>
  );
}

export default App;
