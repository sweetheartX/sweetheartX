import React, { useState, useEffect } from 'react';
import { Card, Link } from 'react-bootstrap';

const Bio = (props) => {
  const { authStatus } = props;
  const { username } = authStatus;

  const [bio, setBio] = useState({
    firstname: 'grace',
    lastname: '',
    about: '',
    profilepic: '',
    githubhandle: '',
    linkedin: '',
    personalpage: '',
  });

  const getData = () => {
    fetch('/api/bio', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(username),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  // const getData = async () => {
  //   // Get all existing user data, sending username as a parameter
  //   const res = await fetch(`/api/profile/${username}`);
  //   // Expect in response an object with all User table column properties
  //   const userTableData = await res.json();
  //   setBio({ userTableData });
  // };

  const { firstname, lastname, about, profilepic, githubhandle, linkedin, personalpage } = bio;
  return (
    <div className="bioContainer">
      {getData()}
      <Card className="m-3" id="card" style={{ width: '20rem' }}>
        <Card.Img src={profilepic} variant="top" />
        <Card.Body>
          <Card.Title>{username}</Card.Title>
          <Card.Text style={{ fontWeight: 300 }}>First Name: {firstname}</Card.Text>
          <Card.Text style={{ fontWeight: 300 }}>Last Name: {lastname}</Card.Text>
          <Card.Text style={{ fontWeight: 300 }}>About: {about}</Card.Text>
          <Card.Text style={{ fontWeight: 300 }}>Github: {githubhandle}</Card.Text>
          <Card.Text style={{ fontWeight: 300 }}>LinkedIn: {linkedin}</Card.Text>
          <Card.Text style={{ fontWeight: 300 }}>Personal Page: {personalpage}</Card.Text>
          {/* <Link to="/editprofile">Edit Profile</Link> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Bio;
