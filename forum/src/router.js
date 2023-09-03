import {createRouter, createWebHashHistory} from 'vue-router'


import Home from "/src/components/page/Home.vue"
import Discover from "./components/page/Discover.vue";
import Add from "./components/page/Add.vue";
import Shopping from "./components/page/Shopping.vue";
import Mine from "./components/page/Mine.vue";
import Idle from "./components/child/home/idle.vue";
import Friends from "./components/child/discover/friends.vue";
import Mutual from "./components/child/home/mutual.vue";
import Job from "./components/child/home/job.vue";
import Outdoor from "./components/child/home/outdoor.vue";
import ShoppingCart from "./components/child/home/shoppingCart.vue";
import Account from "./components/child/mine/account.vue";
import Transaction from "./components/child/mine/transaction.vue";
import Bill from "./components/child/mine/bill.vue";
import His from "./components/child/mine/history.vue";
import Setting from "./components/child/mine/setting.vue";
import Message from "./components/child/home/message.vue";
import Like from "./components/child/mine/like.vue";
import Collect from "./components/child/mine/collect.vue";
import GoodsDetails from "./components/child/shopping/goodsDetails.vue";
import DiscoverDetails from "./components/child/discover/discoverDetails.vue";
import Plaza from "./components/child/discover/plaza.vue";
import Expansion from "./components/child/home/expansion.vue";
import Activity from "./components/child/discover/activity.vue";
import Cooperation from "./components/child/discover/cooperation.vue";
import PartTime from "./components/child/discover/partTime.vue";
import Login from "./components/page/login.vue";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/login', component: Login},
        {
            path: '/', component: Home,
            redirect: "/home/idle",
            children: [
                {path: '/home/idle', component: Idle},
                {path: '/home/expansion', component: Expansion},
                {path: '/home/mutual', component: Mutual},
                {path: '/home/job', component: Job},
                {path: '/home/outdoor', component: Outdoor},
            ]
        },
        {
            path: '/discover', component: Discover,
            redirect: '/discover/plaza',
            children: [
                {path: '/discover/plaza', component: Plaza},
                {path: '/discover/friends', component: Friends},
                {path: '/discover/activity', component: Activity},
                {path: '/discover/cooperation', component: Cooperation},
                {path: '/discover/partTime', component: PartTime},
            ]
        },
        {path: '/add', component: Add,},
        {path: '/shopping', component: Shopping,},
        {path: '/mine', component: Mine,},
        // 子界面跳转
        {path: '/shoppingCart', component: ShoppingCart,},

        // Mine中的子界面
        {path: '/account', component: Account,},
        {path: '/transaction', component: Transaction,},
        {path: '/bill', component: Bill,},
        {path: '/history', component: His,},
        {path: '/setting', component: Setting,},
        {path: '/like', component: Like,},
        {path: '/collect', component: Collect,},
        // Home 界面
        {path: '/message', component: Message,},
        // 商品详情
        {path: '/goodsDetails', component: GoodsDetails},
        {path: '/discoverDetails', component: DiscoverDetails},
    ]
})

export default router;