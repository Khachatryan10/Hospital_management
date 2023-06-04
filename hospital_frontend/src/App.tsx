import { useSelector } from 'react-redux';
import LogoutForm from './components/LogoutForm';
import NavBar from './components/NavBar';
import { RootState } from './app/store';
import DeleteAccountForm from './components/DeleteAccountForm';
import VerticalNavbar from './components/VerticalNavbar';

function App() {
    const logoutDisplay: boolean = useSelector((state:RootState) => state.pageState.displayLogoutForm) 
    const deleteAccountDisplay: boolean = useSelector((state:RootState) => state.pageState.displayDeleteDiv) 
    const authenticated: boolean = useSelector((state:RootState) => state.userInformation.authenticated) 

  return (
    <div >
      {logoutDisplay && <LogoutForm/>}
      {deleteAccountDisplay && <DeleteAccountForm />}
      {/* <VerticalNavbar /> */}
      {authenticated && <VerticalNavbar />}
      <NavBar />
    </div>
  );
}

export default App;
