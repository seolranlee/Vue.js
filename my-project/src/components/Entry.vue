<template>
  <div class="box">
    <h1>클래시 로얄 리그<br>마스터 인증 고사</h1>
    <p>{{ answer }}</p>
    <p>{{ userInfo }}</p>
    <p>{{ numActive }}</p>

    <div class="steps-box">

      <transition name="fade">
        <start
          v-if="this.numActive === 0"
          v-on:eventName="changeNumber"
        ></start>
      </transition>

      <transition name="fade">
        <questions
          v-if="this.numActive === 1"
          v-on:eventName1="addAnswer"
          v-on:eventName="changeNumber"
          v-bind:answer="answer"
        ></questions>
      </transition>

      <transition name="fade">
        <userinfo
          v-on:event3="addUserInfo"
          v-bind:userInfo="userInfo"
          v-if="this.numActive === 2"
        ></userinfo>
      </transition>

      <transition name="fade">
        <final
          v-if="this.numActive === 3"
        ></final>
      </transition>

    </div>
  </div>

</template>

<script>
  import start from "./Start";
  import questions from "./Questions";
  import userinfo from "./UserInfo";
  import final from "./Final";

  export default {
    name: 'entry',
    components: { start, questions, userinfo, final },
    data:function(){
      return {
        numActive: 0,
        answer : {
          q1: '',
          q2: '',
          q3: '',
          q4: '',
          q5: '',
        },
        userInfo: {
          userName: '',
          userPhone: '',
        },
      }
    },
    watch:{
      winW:function(){
        this.responsive();
      },
      scrollBottom:function(){
        this.motionInteraction(0.3);
      },
    },
    methods: {
      addAnswer: function([idx, id]){
        this.answer['q'+(idx+1)] = id;
      },
      changeNumber: function(num){
        this.numActive = num;
      },
      checkUserPhoneNum: function(target){
        var regExp =  /^\d{3}\d{4}\d{4}$/;
        return regExp.test( target );
      },
      checkUserName: function(target){
        var regexp=/(^[가-힣]{2,20}$)|(^[a-zA-Z]{1,20}(\s[a-zA-Z]{1,20})?$)/;
        return regexp.test( target );
      },
      addUserInfo: function([agree, num]){
        if(!this.checkUserName(this.userInfo.userName)) {
          alert('이름을 확인해주세요.');
        }
        else if(!this.checkUserPhoneNum(this.userInfo.userPhone)) {
          alert('휴대폰 번호를 확인해주세요.');
        }
        else if(agree === false){
          alert('정보제공 활용에 동의를 하셔야 진행이 가능합니다.');
        }
        else{
          // this.userInfo.userName = userName;
          // this.userInfo.userPhone = userPhone;
          this.numActive = num;
          this.getsetJson();
        }
      },
      getsetJson: function (){
        alert('getsetJason');
        event.preventDefault();
        let that = this;
        const baseURI = 'https://clashroyale.co.kr/event/proc/rofam_goblin/visit.json.php';
        this.$http.post(baseURI, 'mode=search&user_phonenum='+this.userInfo.userPhone+'')
          .then(function( response ){
            console.log(response);
          });
      },
    },
    created:function(){},
    beforeMount:function(){},
    mounted:function(){},
  }
</script>


<style lang="scss">
  .box{padding: 100px 0;
    h1{font-size: 72px;}
    .steps-box{overflow: hidden;margin-top: 100px;
      .steps{
        >li{@include opacity(0);@include css-value-transition('opacity 0.8s linear 0s');
          &.active{@include opacity(1);}
        }
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
