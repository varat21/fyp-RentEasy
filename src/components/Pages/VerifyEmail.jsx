import React from 'react'

const VerifyEmail = () => {
    const response = await axios.getpost('http://localhost/rent-easy/auth/login.php');
    try{
        console.log(response);
        if(response.data.success = "success")
    }
  return (
    <div>
      
    </div>
  )
}

export default VerifyEmail
