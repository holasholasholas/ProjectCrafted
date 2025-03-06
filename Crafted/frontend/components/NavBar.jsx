import { Button } from '../tailframes/react-components/components/button';
// import SearchIcon from '@mui/icons-material/Search';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../src/assets/logo.png';


export default function NavBar({ toggleDrawer } ) {

    console.log(logo)
  return (
    <div className="max-w-screen-2xl m-auto w-full px-3 sm:px-8 lg:px-16 xl:px-32 flex items-center justify-between py-4 relative z-10 bg-[#212121] h-16">
      <div className="flex items-center justify-start gap-2 min-[375px]:gap-4 lg:flex-1">
        <Button variant="text" size="xsmall" iconOnly aria-label="Menu" onClick={toggleDrawer}>
          <MenuIcon className="size-6 stroke-blue-700" />
        </Button>
        {/* <Button variant="text" size="xsmall" iconOnly aria-label="Search">
          <SearchIcon className="size-6 stroke-blue-700" />
        </Button> */}
      </div>
      <div className="md:flex">
        
        <img
          src={logo}
          alt="Logo"
          className="h-30 w-auto brightness-0 invert" 
        />
       {/* Crafted */}
      </div>
      <div className="hidden md:flex md:justify-end lg:flex-1">
        <Button endAdornment={<WhatshotIcon className="size-6 stroke-white" />} className="hidden md:inline-flex">
          Explore
        </Button>
      </div>
    </div>
  );
};