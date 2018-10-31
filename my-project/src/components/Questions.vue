<template>
  <div>
    <h2>클래시 로얄 리그<br>마스터 필기 시험</h2>
    <ol class="questions">
      <li v-for="(lists, index) in items"
      >
        <h3>{{index + 1}}. {{text[index].title}}</h3>
        <p
          v-if="text[index].description !== ''"
        >{{text[index].description}}</p>
        <ol class="question">
          <li v-for="item in lists"
              :class="{highlight:selected[index] == item.id}"
              @click="pickAnswer(index, item.id)"
          >{{item.id}}. {{item.content}}</li>
        </ol>
      </li>
    </ol>

    <p class="data">
      {{selected}}
      {{answers}}
    </p>
    <p>
      <button v-on:click="currentNumber">다음스텝으로</button>
    </p>
    <p>
      한 번 제출하면 수정을 할 수 없습니다.<br>
      신중히 제출해 주세요.
    </p>
  </div>
</template>

<script>
  export default {
    name: "Questions",
    props: ['answer'],
    data: function(){
      return{
        answers: this.answer,
        text: [
          { title: '다음 ho 선수의 상황으로 알맞은 것을 고르시오.', description: ''},
          { title: '다음 질문을 읽고 알맞은 답을 고르시오', description: '6주차 경기, X-bow master 선수와 Benzer Ridel 선수의 첫 번째 게임. 다음 상황에서 X-bow master 선수는 이 카드를 활용해서 승부수를 던져 타워를 파괴 직전까지 만들어 냅니다. 위 장면 뒤에 등장하는 이 카드는 무엇인가요?'},
          { title: '다음 질문을 읽고 알맞은 답을 고르시오', description: '가장 어렵다는 순환 호그 덱. Rolaporon선수가 위 대회에서 보여준 플레이와 일치하지 않은 것은?'},
          { title: 'TNT 선수 표정의 의미는?', description: ''},
          { title: '클래시 로얄 리그 대망의 마지막! 월드 파이널이 열리는 날짜는?', description: ''},
        ],
        items: [
          [
            {id: 1, content: '경기가 잘 풀리지 않아 답답하다.'},
            {id: 2, content: '경기장 와이파이 문제가 생겨서 화가 났다.'},
            {id: 3, content: '평소 약했던 심장에 무리가 왔다.'},
            {id: 4, content: '승리한 이후 긴장이 몰려 왔다.'},
          ],
          [
            {id: 1, content: '파이어볼' },
            {id: 2, content: '광부' },
            {id: 3, content: '플라임머신' },
            {id: 4, content: '마법아처' },
          ],
          [
            {id: 1, content: '상대 병력이 다리를 넘지 못하게 최대한 앞에서 막아줬다.' },
            {id: 2, content: '무덤은 타워 옆에 대포를 짓고, 최소한의 피해로 막았다.' },
            {id: 3, content: '과감한 예측 파이어볼 등으로 마법 데미지를 누적 시켰다.' },
            {id: 4, content: '방어를 하기보단 호그라이더를 계속 순환시켜서 호그라이더로 데미지를 많이 입혔다.' },
          ],
          [
            {id: 1, content: '기쁨' },
            {id: 2, content: '슬픔' },
            {id: 3, content: '놀람' },
            {id: 4, content: '화남' },
          ],
          [
            {id: 1, content: '11.29' },
            {id: 2, content: '11.30' },
            {id: 3, content: '12.1' },
            {id: 4, content: '12.2' },
          ],
        ],
        selected: [undefined, undefined, undefined, undefined, undefined],
      }
    },
    methods: {
      currentNumber: function(){
        if(this.answers.q1 !== '' && this.answers.q2 !== '' && this.answers.q3 !== '' && this.answers.q4 !== '' && this.answers.q5 !== ''){
          this.$emit('eventName', 2);
        }else{
          alert('답을 모두 선택해주세요.');
        }
      },
      pickAnswer: function(idx, id){
        this.selected[idx] = id;
        this.$emit('eventName1', [idx, id]);
      },
    }
  }
</script>

<style lang="scss">
  h2{font-size: 52px;margin-bottom: 50px;}
  h3{font-size: 18px;margin-bottom: 10px}
  .questions{
    >li{margin-top: 100px;
      &:first-child{margin-top: 0;}
      .question{margin-top: 15px;
        >li{margin-top: 20px;cursor: pointer;
          &:hover{font-weight: 600}
          &.highlight{background: yellow;font-weight: 600;}
          &:first-child{margin-top: 0}
        }
      }
    }
  }

</style>
