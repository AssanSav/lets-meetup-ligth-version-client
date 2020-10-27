import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/usersReducer';


const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)

  useEffect(() => {
    dispatch(logoutUser(user.id))
    window.location = "/signin"
  }, [dispatch, user.id])

  return ( null );
}
 
export default Logout;