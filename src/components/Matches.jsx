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
    <div className="container" style={{ marginTop: "50px" }}>
      {matches.map((user) => {
        return card(user)
      })}
    </div>
  );

}

export default Matches;

