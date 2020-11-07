import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMatches } from "../store/usersReducer";
import { card } from '../common/card';

const Matches = () => {
  const dispatch = useDispatch()
  const matches = useSelector(state => state.users.matches)

  useEffect(() => {
    dispatch(fetchMatches())
  }, [dispatch])

  return (
    <>
      {matches.map((user) => (
        <div className="profile" key={user.id} style={{ marginTop: "50px" }} >
          {card(user)}
        </div>
      )
      )}
    </>
  );
}

export default Matches;

