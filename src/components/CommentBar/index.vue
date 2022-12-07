<template>
    <div class="bar">
        <div class="left" :style="{'background-image':'url('+ props.data.user.avatarUrl +')'}">

        </div>
        <div class="right">
            <div class="user">
                <div class="name">{{props.data.user.nickname}}</div>
                <div class="vip" :style="{'background-image':'url('+ props.data.user.vipRights.associator?.iconUrl +')'}" v-if="props.data.user.vipRights?.redVipLevel > 0"></div>
                <div class="comment"> ：{{props.data.content}}</div>
            </div>
            <div class="options">
                <div class="l">{{props.data.timeStr}}</div>
                <div class="r">回复</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['data'])
</script>

<style  scoped>
.comment{
    margin-left:4px;
}
.options{
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}
.l{
    color: #9f9f9f;
    margin-top: 6px;
}
.vip{
    width: 40px;
    height: 15px;
    background-repeat: no-repeat;
    background-size: 100%;
}
.name{
    color: #537eaf;
    margin-right: 4px;
}
.user{
    display: flex;
    align-items: center;
}
.right{
    display: flex;
    flex-direction: column;
    flex: 1;
    font-size: 12px;
    margin-left: 15px;
}
.left{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: 100%;
}
.bar{
    display: flex;
    margin-top: 15px;
    border-bottom: 1px solid #f2f2f2;
}
</style>