<template>
    <div class="mycontainer">
      <div class="mycard">
          <form @submit.prevent="submitLoginForm">

              <div class="myform">
                  <input type="text" class="form-item"  placeholder="Email" autofocus="1" v-model="form.email">
              </div>

              <div class="myform">
                  <input type="text" class="form-item"  placeholder="Password" v-model="form.password">
                  <!-- <i class="fa fa-eye icon" @click="toggleVisibility"></i> -->
              </div>

              <button v-if="isLoading == false" type="submit" class="log-btn">Login</button>
              <button v-else class="log-btn2"><LoadingSpinner /></button>

          </form>

          <p class="card-text">Forgot password?</p>

          <hr style="width:80%; margin:auto">

          <button class="signup-link" @click="showPopup">Create new account</button>

      </div>

    </div>

    <SignupView :show-popup="popupVisibleRef" @hide-popup="hidePopup" />
    
</template>


<script setup>

  import axios from 'axios';
  import SignupView from './SignupView.vue'
  import LoadingSpinner from '../components/LoadingSpinner.vue'
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useToast } from 'vue-toast-notification'

  const toast = useToast();

  let isLoading = ref(false)

  let popupVisibleRef = ref(false)

  const router = useRouter();

  const showPopup = () => {
    popupVisibleRef.value = true
  }

  const hidePopup = () => {
    popupVisibleRef.value = false
  }

  let form = reactive({
    email: '',
    password: '',
  })

  let errors = ref([]);

  const submitLoginForm = async () => {
    errors.value = []
    if (form.email === ''){
      toast.error('Your email is missing')
      errors.value.push('Your email is missing')
    }

    if (form.password === ''){
      toast.error('Your password is missing')
      errors.value.push('Your password is missing')
    }

    if (errors.value.length === 0){
      isLoading.value = true
      await axios
            .post('/api/login/', form, {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
            })
            .then(response => {
              toast.success('Login Successfull!')
              isLoading.value = false
              router.push('/');
            })
            .catch(error => {
              console.log('errors', error)
              toast.error('Email or Password is not correct')
              isLoading.value = false
            })
    }
  }

</script>

<style scoped>

    .mycontainer {
        overflow-y: scroll;
        background-color: #eeeeee;
        height: 100vh;
        width: 100%;
        display: flex;
        font-family: Helvetica, Arial, sans-serif;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .mycard{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        width: 50%;
        background-color: #fff;
        border-radius: 10px;
        line-height: 1.34;
        font-size: 15px;
        padding: 20px;
    }

    .myform{
        color: #1d2129;
        width: 90%;
        margin: 20px auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .myform .form-item{
      width: 100%;
      border: 1px solid #dddfe2;
      border-radius: 6px;
      line-height: 48px;
      font-size: 17px;
      padding: 0 16px;
      font-weight: 700;
    }

    .log-btn{
      width: 70%;
      margin: 20px auto;
      background-color: #1b74e4;
      border: 1px solid #dddfe2;
      border-radius: 6px;
      color: #fff;
      font-size: 17px;
      line-height: 48px;
      padding: 0 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .log-btn2{
      width: 70%;
      margin: 20px auto;
      background-color: #fff;
      border: 1px solid #1b74e4;
      border-radius: 6px;
      color: #fff;
      font-size: 17px;
      line-height: 48px;
      padding: 5px 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    p{
        text-align: center;
        color: #385898;
    }

    .signup-link{
        width: 50%;
        margin: 20px auto;
        background-color: #42b72a;
        border: none;
        border-radius: 6px;
        font-weight: 700;
        font-size: 13px;
        line-height: 48px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>