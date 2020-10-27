import React, { Component } from "react";
import UserCard from "./UserCard";
import { connect } from "react-redux";
import { fetchUsers } from "../store/usersReducer";
import Pagination from "../common/Pagination";
import paginate from "../utils/paginate";
import ListGroup from "../common/ListGroup";

class UsersList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      genders: [],
      selectedGender: "",
      pageSize: 4,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.setState({
      genders: ["All Genders", "Male", "Female", "Transgender"],
    });
  }

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleOnGenderSelect = (gender) => {
    this.setState({ selectedGender: gender, currentPage: 1 });
  };

  render() {
    const { genders, selectedGender, pageSize, currentPage } = this.state;
    const { users } = this.props;

    if (!users) { return <div></div> };


    const filteredByGender =
      selectedGender === "Male" || selectedGender === "Female" || selectedGender === "Transgender"
        ? users.filter((user) => user.gender === selectedGender)
        : users;

    const usersData = paginate(filteredByGender, currentPage, pageSize);

    return (
      <>
        <ListGroup
          genders={genders}
          selectedGender={selectedGender}
          OnGenderSelect={this.handleOnGenderSelect}
        />
        <br />
        <br />
        {usersData.map((user) => (
          <div className="profile" key={user.id}>
            <UserCard user={user} />
          </div>
        ))}
        <Pagination
          usersCount={filteredByGender.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users: users.all,
  };
};


export default connect(mapStateToProps, { fetchUsers })(UsersList);
