<template>
  <div id="app">
    <div class="content">
      <entry></entry>
    </div>
  </div>
</template>

<script>

  import entry from "./components/Entry";

  export default {
    name: 'App',
    components: { entry },
    data:function(){
      return {
        msg: 'hello world',
        isWeb:'',
        urlWeb:'',
        urlMobile:'',
        motionTarget:'',
        responsiveTarget:'',

        userName:'',
        userPhoneNum:'',
        winW:'',
        winH:'',

        scrollTop: '' ,
        scrollBottom:'',

        testfn:'',
      }
    },
    watch:{
      winW:function(){
        this.responsive();
      },
      scrollBottom:function(){
        this.motionInteraction(0.3);
      }
    },
    methods:{
      init:function(){
        this.testfn = '2) 부모에서 전달된 props';
        this.initGa();
      },
      addEvent:function(){
        window.addEventListener('resize', this.resizeHandler);
        window.addEventListener('scroll', this.scrollHandler);
        this.resizeHandler();
        this.scrollHandler();
        // document.querySelector('.scrollTop').addEventListener('click', () => {
        //   this.scrollIt(
        //     document.getElementById('app'),
        //     // 0,
        //     300,
        //     'easeOutQuad',
        //   );
        // });
      },
      resizeHandler:function(){
        this.winW = window.innerWidth;
        this.winH = window.innerHeight;

        this.responsiveTarget = document.body.getElementsByClassName('changable');
        this.motionTarget = document.body.getElementsByClassName('motion');
      },
      scrollHandler:function(){
        this.scrollTop = window.pageYOffset;
        this.scrollBottom = this.scrollTop + this.winH;
      },
      // https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
      scrollIt:function(destination, duration = 200, easing = 'linear', callback) {

        const easings = {
          linear(t) {
            return t;
          },
          easeInQuad(t) {
            return t * t;
          },
          easeOutQuad(t) {
            return t * (2 - t);
          },
          easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          },
          easeInCubic(t) {
            return t * t * t;
          },
          easeOutCubic(t) {
            return (--t) * t * t + 1;
          },
          easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          },
          easeInQuart(t) {
            return t * t * t * t;
          },
          easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
          },
          easeInOutQuart(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
          },
          easeInQuint(t) {
            return t * t * t * t * t;
          },
          easeOutQuint(t) {
            return 1 + (--t) * t * t * t * t;
          },
          easeInOutQuint(t) {
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
          }
        };
        const start = window.pageYOffset;
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

        const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
        const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

        if ('requestAnimationFrame' in window === false) {
          window.scroll(0, destinationOffsetToScroll);
          if (callback) {
            callback();
          }
          return;
        }

        function scroll() {
          console.log('scroll');
          const now = 'now' in window.performance ? performance.now() : new Date().getTime();
          const time = Math.min(1, ((now - startTime) / duration));
          const timeFunction = easings[easing](time);
          window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

          if (window.pageYOffset === destinationOffsetToScroll) {
            if (callback) {
              callback();
            }
            return;
          }

          requestAnimationFrame(scroll);
        }

        scroll();
      },
      initGa : function(){
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga( 'create', "UA-73264580-1", 'auto' );
      },
      responsive:function(){
        this.winW > 768 ? this.isWeb = true : this.isWeb = false;
        this.changeSrc();
      },
      changeSrc:function(){
        for( let i=0; i<this.responsiveTarget.length; i++ ){
          if( this.isWeb ){
            this.responsiveTarget[i].src = this.responsiveTarget[i].dataset.web;
          }else{
            this.responsiveTarget[i].src = this.responsiveTarget[i].dataset.mobile;
          }
        }
      },
      motionInteraction:function(point){
        for( let i=0; i<this.motionTarget.length; i++ ){
          if(point === undefined){
            point = 1;
          }
          if( this.motionTarget[i].dataset.point !== undefined ){
            point = this.motionTarget[i].dataset.point;
          }
          if( this.scrollBottom > this.motionTarget[i].offsetTop + this.motionTarget[i].offsetHeight * point ){
            this.motionTarget[i].classList.add('onShow');
          }
        }
      },
      TrackingCode:function(){
        /*var googleAccount = "UA-73264580-1";
        ga( 'create', googleAccount, 'auto' );*/

        // -----------------------------------------------
        // page view
        function _googlePageTagging( $page ) {
          ga('send', {
            hitType: 'pageview',
            page: $page
          });
        }

        // -----------------------------------------------
        // Event tracking
        function _googleEventTagging( $eventCategory, $eventAction) {

          ga('send', {
            hitType: 'event',
            eventCategory: $eventCategory,
            eventAction: $eventAction
            // ,eventLabel: 'Content Label',
          });
        }

        // ---------------------------------------------------------- 1. Clicks on External Links
        function _googleEventTagging_link( $eventCategory) {

          _googleEventTagging( $eventCategory, 'link btn');

        }

        // ---------------------------------------------------------- 2. Downloads
        function _googleEventTagging_download( $eventCategory) {

          _googleEventTagging( $eventCategory, 'download btn')

        }

        // ---------------------------------------------------------- 3. Media ( Videos, Music... )
        function _googleEventTagging_media( $eventCategory) {

          _googleEventTagging( $eventCategory, 'media btn')

        }

        // ---------------------------------------------------------- 4. SNS (Facebook, twitter... )
        function _googleEventTagging_sns( $eventCategory) {

          _googleEventTagging( $eventCategory, 'sns btn')

        }


        return {
          pageTagging: _googlePageTagging,
          eventTagging: _googleEventTagging,
          eventTagging_link: _googleEventTagging_link,
          eventTagging_download: _googleEventTagging_download,
          eventTagging_media: _googleEventTagging_media,
          eventTagging_sns: _googleEventTagging_sns
        }
      },
      loadInit:function(){
        this.init();
        this.addEvent();
        document.body.getElementsByClassName('content')[0].classList.add('onShow');
        // this.$eventHub.$emit( 'ga',this.TrackingCode() );
      }
    },
    created:function(){},
    beforeMount:function(){},
    mounted:function(){
      // window.addEventListener('load', this.loadInit);
      let that = this;
      window.addEventListener('load', function(){
        that.init();
        that.addEvent();
        document.body.getElementsByClassName('content')[0].classList.add('onShow');
        // that.$eventHub.$emit( 'ga',this.TrackingCode() );
      });

    },
  }
</script>

<style lang="scss">
  #app{ text-align: center; }
  .content{ visibility: hidden;
    &.onShow{ visibility: visible; }
  }
</style>
