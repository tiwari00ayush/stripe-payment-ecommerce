import Navbar from "./component/Navbar";
import Store from "./component/Store";

function App() {
  return (
    <div className="">
      <Navbar />
      <Store />
      <button
        onClick={() => {
          console.log(getCartTotal(cart));
        }}
      >
        show
      </button>
    </div>
  );
}

export default App;
