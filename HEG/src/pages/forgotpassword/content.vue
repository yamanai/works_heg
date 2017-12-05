<template>
  <div class="forgot">
    <head-top class="header">
      <img slot="left" :src="require('../../assets/images/prevs.png')" class="prev" @click="$router.go(-1)">
      <div slot="title" class="title">Forgot Passoword</div>
    </head-top>
  </div>
</template>
<script>
  import headTop  from 'components/head/head.vue';
  import {CookieUtil} from 'models/utils';
  import {Toast,Indicator} from 'mint-ui';

  export default{
    components:{
      headTop
    },
    data(){
      return {

      }
    },
    methods:{

    }
  }
</script>
<style lang="less" scoped>
  @import './content.less';
</style>