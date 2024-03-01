import React, { useState, useEffect } from 'react';

import './App.css'

function App() {
 
  const [userData, setUserData] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.users.length); 
      setUserData(data.users[randomIndex]); 
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);



  const refreshData = () => {
    fetchUserData();
    setBgColor(getRandomColor());
  };

  const getRandomColor = () => {
    const maxColorComponent = 200;
    const red = Math.floor(Math.random() * (255 - maxColorComponent) + maxColorComponent);
    const green = Math.floor(Math.random() * (255 - maxColorComponent) + maxColorComponent);
    const blue = Math.floor(Math.random() * (255 - maxColorComponent) + maxColorComponent);
    return `rgb(${red}, ${green}, ${blue})`;

  };

  return (
    <div className='p-5 mt-5' style={{ textAlign: 'center' }}>
    <h1>Random User On Refresh</h1>  
    <div className='rounded p-5 shadow mt-3' style={{ backgroundColor: bgColor, width: '600px', margin: '0 auto'}}>
    {userData && (
    <div className="row d-flex justify-content-between ">
      <div className="col-lg-6">
      <div className='border ' style={{borderRadius:'70%', backgroundColor:bgColor,}} >  <img style={{height:'100px',width:'100px'}} src= {userData.image} alt="" /></div>
    <p className='d-flex justify-content-between'><b>{userData.firstName} {userData.lastName}, {userData.age}</b> </p>
    <p> <b>{userData.gender}</b></p>
   <div className="row">
    <div className="col-lg-6">
      <p className="row d-flex justify-content-between "> Birth Date  <br /><b>{userData.birthDate}</b></p>
    </div>
    <div className="col-lg-6">
      <p>Age <br /><b> {userData.age}</b></p>
    </div>
   </div>
   <div className="row">
    <div className="col-lg-6">
      <p>Weight : <b>{userData.weight}</b></p>
    </div>
    <div className="col-lg-6">
      <p>Height : <b> {userData.height}</b></p>
    </div>
   </div>
  
      </div>
      <div className="col-lg-6">
      <p>Home Address <br /> <b>{userData.address ? `${userData.address.address}, ${userData.address.postalCode}, ${userData.address.city}` : ''}</b></p>

<p>Mobile Phone <br /> <b>{userData.phone}</b></p>
<p>Company <br /> <b>{userData.company.name}</b></p>
<p>Job Title <br /> <b>{userData.company.title}</b></p>
<p>Email <br /> <b>{userData.email}</b></p>

      </div>
    </div>
    )}
    </div>
    <button type="button" className="btn btn-success" onClick={refreshData}>Refresh</button>
  </div>
  )
}
export default App
