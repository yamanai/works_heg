<template>
    <div class="wrapper">
        <head-top class="header">
            <i slot="left" class="prev iconfont icon-back" @click="$router.go(-1)"></i>
            <div slot="title" class="title">Router</div>
            <i slot="right" class="sp iconfont icon-back"></i>
        </head-top>
        <div class="content">
            <ul class="enter">
                <li>sun</li>
                <li>moon</li>
                <li>star</li>
            </ul>
            <ul class="random">
                <li v-for="(item,index) in randomArr">
                    {{item}}
                </li>
            </ul>

            <a @click="random()">R</a>
        </div>
    </div>
</template>
<script>
import headTop from '../../components/head/head'
export default {
    components: {
        headTop
    },
    data() {
        return {
            randomArr: []
        }
    },
    created() {
        var arr = [1, 2, 3, 4, 5, 6]
        this.randomArr = arr;
    },
    methods: {
        random() {
            var arr = this.randomArr;
            for (var i = arr.length - 1; i >= 0; i--) {
                var randomIndex = Math.floor(Math.random() * (i + 1));
                var itemAtIndex = arr[randomIndex];
                arr[i] = itemAtIndex;
            }
            this.randomArr = arr;
        }
    }
}
</script>
<style lang="less" scoped>
.header {
    background: #0b9d78;
    .sp {
        opacity: 0;
    }
    .title {
        line-height: 2.04rem;
        font-size: 0.768rem;
        color: #fff;
    }
}

.content {
    padding: 3.3rem 0.64rem 0.64rem 0.64rem;
    .enter {
        text-align: left;
        li {
            font-size: 0.853rem;
            padding: 0.21rem 0;
            color: #333;
        }
    }
}
</style>

