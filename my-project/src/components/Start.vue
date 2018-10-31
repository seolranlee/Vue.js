<template>
  <div>
    <p>
      클래시로얄 리그 마스터 인증고사를 시작합니다.
      시작하시겠습니까?
    </p>
    <button v-on:click="currentNumber">시작합니다.</button>
  </div>
</template>

<script>
    export default {
        name: "Start",
        methods: {
          currentNumber: function(){
            this.$emit('eventName', 1)
          }
        }
    }
</script>

<style scoped>

</style>
