import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/usersReducer";

const Logout = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    const dispatchLogout = async () => {
      await dispatch(logoutUser(user.id));
      history.push("/signin");
    };
    dispatchLogout();
  });

  return null;
};

export default Logout;
