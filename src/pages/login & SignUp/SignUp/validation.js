

 function Validation(values) {
  let errors ={}
  

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  const password_pattern = /^(?=.\d)(?=.[a-z])(?=.*[A-Z])[a-zA-z0-9]{6,8}$/;
  const contactNo_pattern =  /^\d{10}$/;

  if (values.username.trim() === ""){
    errors.username="Username is required!";
 }

 if (values.email.trim() === ""){
    errors.email="Email is required!";
 } else if(!email_pattern.test(values.email)) {
    errors.email="This is not valid email format!";
 }

 if (values.contactNo.trim() === ""){
    errors.contactNo="Contact No is required!";
 } else if(!contactNo_pattern.test(values.contactNo)) {
    errors.contactNo="This is not valid contact number!";
 } else if(isNaN(values.contactNo)) {
    errors.contactNo="This is not a valid contact number!";
 }

 if (values.password.trim() === ""){
    errors.password="Password is required!";
 } else if(!password_pattern.test(values.password)) {
    errors.password="This is not a valid password!";
 } 


 if (values.confirmPassword.trim() === ""){
    errors.confirmPassword="Confirm Password is required!";
 } else if (values.confirmPassword === "" || String (values.confirmPassword !== values.password)) {
   console.log(values.confirmPassword + "___" + values.password)
   errors.confirmPassword = "Passwords did not matched!";
}
  return errors;

}

export default Validation;
