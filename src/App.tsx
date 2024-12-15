import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="container mx-auto my-12">
        <Outlet />
      </div>
    </>
  );
}

export default App;
