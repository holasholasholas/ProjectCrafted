import * as React from 'react';
import BackgroundVideo from '../components/BackgroundVideo';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

function App() {

  const [open, setOpen] = React.useState(false);

  // const toggleDrawer = (newOpen) => () => {
  //   setOpen(newOpen);
  // };

  return (
    <div className="App">
      <NavBar toggleDrawer={() => setOpen(true) } />
      <SideBar open={open} onClose={() => setOpen(false)} />
      <BackgroundVideo />
    </div>
  );
}

export default App;