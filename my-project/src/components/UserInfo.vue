<template>
  <div class="userinfo">
    <form id="form1" method="post">
      <input type="hidden" name="login">
      <fieldset>
        <div class="form form-box-1">
          <label for="userName">이름</label>
          <input type="text" id="userName" maxlength="10" v-model="userInfo.userName" placeholder="한글만 입력해주세요.">
        </div>

        <div class="form form-box-2">
          <label for="userPhone">휴대폰 번호</label>
          <input type="text" id="userPhone" maxlength="11" v-model="userInfo.userPhone" placeholder="- 를 제외한 숫자 입력">
        </div>
      </fieldset>
    </form>
    <div class="agree-box">
      <span class="check-box">
        <label class="input_check">
            <input
              @click="agree = !agree"
              type="checkbox"
              id="check_collect"
              value="">
            <i></i>
            <span class="label_text">개인정보 수집·이용내역</span>
        </label>
      </span>
    </div>
    <button
      @click="sendInfo"
      type="submit">완료</button>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    props: ['userInfo'],
    data: function(){
      return{
        userInfo: this.userInfo,
        agree: false,
      }
    },
    methods: {
      sendInfo: function(){
        // this.$emit('event3', [this.userName, this.userPhone, this.agree, 3]);
        this.$emit('event3', [this.agree, 3]);
      },
    }
  }
</script>

<style scoped>

</style>
