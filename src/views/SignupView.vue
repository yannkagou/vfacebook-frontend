<template>
  <div class="popup-form" v-show="showPopup">

    <div class="popup-form-content">

      <div class="popup-form-title">
        <div class="right">
          <h4>Sign Up</h4>
          <h6>It's quick and easy.</h6> 
        </div>
        <div class="left">
          <i class="fas fa-xmark" @click="closePopup"></i>
        </div>
      </div>

      <form @submit.prevent="submitSignupForm" class="signup-form">

        <div class="form-group1">
          <input type="text" id="firstname" v-model="signupform.firstname" placeholder="First Name" required>
          <input type="text" id="lastname" v-model="signupform.lastname" placeholder="Last Name" required>
        </div>

        <div class="form-group">
          <input type="email" id="email" placeholder="Email" v-model="signupform.email" required>
        </div>

        <div class="form-group2">
          <input :type="showPassword? 'text' : 'password'" id="password" placeholder="Password" v-model="signupform.password" required>
          <i class="fa-solid fa-eye" @click="toggleType"></i>
        </div>

        <div class="form-group2">
          <input :type="showPassword2? 'text' : 'password'" id="c_password" placeholder="Confirm Password" v-model="signupform.password_confirm" required>
          <i class="fa-solid fa-eye" @click="toggleType2"></i>
        </div>

        <div class="form-group">
            <MazPhoneNumberInput
            v-model="signupform.tel"
            show-code-on-list
            :preferred-countries="['CM','FR', 'BE', 'DE', 'US', 'GB']"
            :defaultCountryCode="'CM'"
            style="width: 100%; outline: none !important;"
            />
        </div>

        <div class="form-group4">
          <label>Birthdate</label>
          <input type="date" id="birthdate" placeholder="Enter your birthdate" v-model="signupform.birthday" required>
        </div>

        <!-- <div class="form-group3">
          <label @click="showDate">Birthday</label>
          <div class="form-group-date">
            <div class="form-date">
              <select id="month" v-model="month" class="w-date">
                <option v-for="(month, index) in months" :value="index+1" :key="index">{{ month }}</option>
              </select>
            </div>
            <div class="form-date">
              <select id="day" v-model="day" class="w-date">
                <option v-for="day in days" :value="day" :key="day">{{ day }}</option>
              </select>
            </div>
            <div class="form-date">
              <select id="year" v-model="year" class="w-date">
                <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
              </select>
            </div>
          </div>
        </div> -->

        <div class="form-group4">
          <label>Gender</label>
          <div class="form-group-gender">
            <div class="form-gender">
              <p>Female</p>
              <input class="radio" type="radio" v-model="gender" value="female" style="height:20px; width:20px; vertical-align: middle;">
            </div>
            <div class="form-gender">
              <p>Male</p>
              <input class="radio" type="radio" v-model="gender" value="male" style="height:20px; width:20px; vertical-align: middle;">
            </div>
            <div class="form-gender">
              <p>Other</p>
              <input class="radio" type="radio" v-model="gender" value="other" style="height:20px; width:20px; vertical-align: middle;">
            </div>
          </div>
        </div>

        <p class="para">People who use our service may have uploaded your contact information to Facebook.<br> Learn more.</p>
        <p class="para">By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.<br> You may receive SMS Notifications from us and can opt out any time.</p>

        <button  v-if="isLoading == false" type="submit" class="signup-link">SignUp</button>
        <button v-else class="signup-link2"><LoadingSpinner /></button>


      </form>

    </div>
  </div>
</template>
  
<script setup>

  import axios from 'axios';
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toast-notification';
  import LoadingSpinner from '../components/LoadingSpinner.vue'
  import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
  import "maz-ui/css/main.css";

  const results = ref()

  const toast = useToast();

  const props = defineProps({
    showPopup: Boolean
  })

  const router = useRouter();

  const emits = defineEmits(['hide-popup']);

  const closePopup = () =>{
    emits('hide-popup');
  }

  let errors = ref([]);

  let showPassword = ref(false)
  let showPassword2 = ref(false)

  function toggleType(){
    showPassword.value = !showPassword.value
  }

  function toggleType2(){
    showPassword2.value = !showPassword2.value
  }

  let isLoading = ref(false);

  // const phoneRegex = /^\+?\d{9,15}$/;
  const capitalRegex = /[A-Z]/
  const numberRegex = /\d/
  const specialRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

  // let day = ref('')
  // let month = ref('')
  // let year = ref('')

  let gender =  ref('')
  // const days = [];
  // const months = [
  //   'January', 'February', 'March', 'April', 'May', 'June',
  //   'July', 'August', 'September', 'October', 'November', 'December'
  // ];
  // const years = [];

  // const currentYear = new Date().getFullYear();

  // for (let i = currentYear; i >= currentYear - 100; i--) {
  //   years.push(i);
  // }

  // for (let i = 1; i <= 31; i++) {
  //   days.push(i);
  // }

  // function showDate(){
  //   console.log(new Date(year.value, month.value - 1, day.value).toLocaleDateString());
  // }

  let signupform = reactive ({
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      password_confirm: '',
      birthday: '',
      tel: '',
  });

    
  let logform = reactive({
        email: '',
        password: '',
    });

  const submitSignupForm = async() => {

    errors.value = []

    if (signupform.firstname === '') {
        errors.value.push('Your name is incomplete')
        toast.error('Your name is incomplete')
    } else if (signupform.lastname === '') {
        errors.value.push('Your name is incomplete')
        toast.error('Your name is incomplete')
    } else if (signupform.email === '') {
        errors.value.push('Your e-mail is missing')
        toast.error('Your e-mail is missing')
    } else if (!capitalRegex.test(signupform.password) || 
           !numberRegex.test(signupform.password) || 
           !specialRegex.test(signupform.password)) {
      errors.value.push('Your password should contain at least one capital letter, one number, and one special character')
      toast.error('Password with capital letter, number and one special character')
    } else if (signupform.password === '') {
        errors.value.push('Your password is missing')
        toast.error('Your password is missing')
    } else if (signupform.password.length < 6) {
      errors.value.push('Your password should be at least 6 characters long')
      toast.error('Your password should be at least 6 characters long')
    } else if (signupform.password !== signupform.password_confirm) {
        errors.value.push('The password does not match')
        toast.error('The password does not match')
    // } else if (!phoneRegex.test(signupform.tel)) {
    //   errors.value.push('Your phone number is invalid')
    //   toast.error("Your phone number should start with '+' and be valid")
    } else if (signupform.gender === '') {
        errors.value.push('Your gender is missing')
        toast.error('Your gender is missing')
    } 
    console.log(errors.value)
    if (errors.value.length === 0) {
      isLoading.value = true
      await axios
              .post('/api/signup/', signupform, {
                headers: { 'Content-Type': 'application/json' }
              })
              .then(response => {
                signupform.firstname = ''
                signupform.lastname = ''
                logform.email = signupform.email
                logform.password = signupform.password
                isLoading.value = false
              })
              .catch(error => {
                console.log('errors', error)
                toast.error('This email exists')
                isLoading.value = false
              });
    } 

    if (errors.value.length === 0){
      isLoading.value = true
      await axios
            .post('/api/login/', logform, {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
            })
            .then(response => {
              toast.success('Register Successfully!')
              isLoading.value = false
              router.push('/');
            })
            .catch(error => {
              console.log('errors', error)
              toast.error('Try again')
              isLoading.value = false
            })
    }

  }

</script>
  
<style scoped>
 .popup-form {
    position: fixed;
    overflow-y: scroll;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    /* height: 100%; */
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.popup-form-content {
    width: 60%;
    margin: auto;
    background-color: #fff;
    border-radius: 8px;
    padding: 0px 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  .popup-form-title {
    margin-top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .popup-form-title .left{
    padding-bottom: 30px;
  }
  
  .signup-form{
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
  }
  .form-group input:hover{
  border-color: #1b74e4;
}
.form-group input:focus{
  border-color: #1b74e4;
  box-shadow: 0 0 0 2px #1b74e4;
  outline: 0;
}
.form-group2:hover{
  border-color: #1b74e4;
}
.form-group2:focus{
  border-color: #1b74e4;
  box-shadow: 0 0 0 2px #1b74e4;
  outline: 0;
}
.form-group1 input:hover{
  border-color: #1b74e4;
}
.form-group1 input:focus{
  border-color: #1b74e4;
  box-shadow: 0 0 0 2px #1b74e4;
  outline: 0;
}

  .form-group {
    width: 90%;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form-group input {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .form-group1 {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .form-group1 input{
    width: 45%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .form-group2 {
    width: 90%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .form-group2 input{
    width: 90%;
    padding: 8px;
    background-color: transparent;
    outline: none;
    border: 0;
  }
  .form-group2 i{
    width: 10%;
    padding: 3px;
    border-radius: 4px;
  }
  /* .form-group3{
    width: 90%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
  }
  .form-group3 label {
    display: block;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    margin-bottom: 8px;
  }
  .form-group-date{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .form-date {
    display: flex;
    width: 30%;
  }

  .w-date{
    text-align: center;
    width: 100%;
  }
  
  .form-date label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .form-date select {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  } */
  .form-group4{
    width: 90%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
  }
  .form-group4 label {
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    margin-bottom: 5px;
  }
  .form-group4 input[type=date]{
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .form-group4 input[type=date]:hover{
    border-color: #1b74e4;
  }
  .form-group4 input[type=date]:focus{
    border-color: #1b74e4;
    box-shadow: 0 0 0 2px #1b74e4;
    outline: 0;
  }
  .form-group-gender{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .form-gender{
    display: flex;
    align-items: center;
    width: 30%;
  }
  .form-gender p{
    margin: 0;
  } 
  .radio{
    color: #1d2129;
    font-weight: lighter;
    margin-left: 10px;
  }

  .para{
    font-size: 12px;
    text-align: left;
    color: #b6b3b3;
    font-weight: lighter;
    width: 100%;
    margin: 0;
    margin-left: 10px;
    }

    .signup-link{
      width: 100%;
      margin: 5px auto;
      background-color: #385898;
      border: none;
      border-radius: 6px;
      font-weight: 700;
      font-size: 14px;
      line-height: 38px;
      padding: 0 10px;
      color: #fff;
    }
    .signup-link2{
        width: 100%;
        margin: 5px auto;
        background-color: #fff;
        border: none;
        border-radius: 6px;
        font-weight: 700;
        font-size: 17px;
        line-height: 48px;
        padding: 5px 10px;
    }

</style>