const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/api', { useNewUrlParser: true })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err + '数据库连接失败', err));


const historyListSchema = new mongoose.Schema({
    browseId: String,
    collect: Boolean,
    upvote: Boolean
})
const privateListSchema = new mongoose.Schema({
    collectList: Array,
    upvoteList: Array,
    ShoppingList: Array,
})
const historyList = mongoose.model("historyList", historyListSchema, "historyList");
const privateList = mongoose.model("privateList", privateListSchema, "privateList");

const loginMesSchema = new mongoose.Schema({
    phone:{
        type:Number,
        minLenght: 11,
        maxLength: 11,
    },
    password:{
        type:String,
        minLenght:6,
        maxLength:24,
    }
})

const LoginMes = mongoose.model('LoginMes',loginMesSchema,"LoginMes");
// LoginMes.create({
//     phone:19138984361,
//     password:"admin123"
// })

const userSchema = new mongoose.Schema({
    nick: {
        type: String,
        minLenght: 2,
        maxLength: 20,
        // require:true
    },
    head: String,
    sign: String,
    // userHistoryList: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: historyList,
    // },
    // userPrivateList: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: privateList,
    // },
    userHistoryList:Array,
    userShoppingList:Array,
    login:{
        type:mongoose.Schema.ObjectId,
        ref:LoginMes
    }

})

const User = mongoose.model("User", userSchema, "User");


// User.create({
//     nick:"泽泽木",
//     head:"http://10.218.39.118:3000/public/images/head/12.jpg",
//     sign:"加油！完成此项目",
//     userHistoryList:null,
//     userShoppingList:null,
//     login:"6491936801a245608cc7bb58"
// })

const goodsSchema = new mongoose.Schema({
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
    },
    imgs: {
        type: Array,
    },
    price: {
        type: Number,
    },
    details: String,
})

const Goods = mongoose.model("Goods", goodsSchema, "Goods");

const communitySchema = new mongoose.Schema({
    publisher: {
        type: mongoose.Schema.ObjectId,
        ref: User
    },
    content: String,
    imgs: {
        type: Array
    },
    time: {
        type: String,
    },
    collectNum: Number,
    commentNum: Number,
    upvoteNum: Number
})

const Community = mongoose.model("Community", communitySchema, "Community")

const shoppingCartSchema = new mongoose.Schema({
    details:{
        type:mongoose.Schema.ObjectId,
        ref:Goods
    },
    num:Number,
})
const ShoppingCart = mongoose.model("ShoppingCart",shoppingCartSchema,"ShoppingCart")
// 创建数据
// User.create({
//     nick: "小小小张",
//     head: "http://10.218.39.118:3000/public/images/head/1.jpg",
//     sign: "没有签名",
//     userHistoryList: null,
//     userPrivateList: null,
// }, {
//     nick: "山楂马蹄糯",
//     head: "http://10.218.39.118:3000/public/images/head/2.jpg",
//     sign: "加油！！",
//     userHistoryList: null,
//     userPrivateList: null,
// }, {
//     nick: "哈鱼帽子",
//     head: "http://10.218.39.118:3000/public/images/head/3.jpg",
//     sign: "1,2,3",
//     userHistoryList: null,
//     userPrivateList: null,
// }, {
//     nick: "张方",
//     head: "http://10.218.39.118:3000/public/images/head/4.jpg",
//     sign: "今天还挺帅",
//     userHistoryList: null,
//     userPrivateList: null,
// })


// Goods.create({
//     publisher: '648d24d6c30c80026384b3bb',
//     name: "奢华小提包",
//     imgs: ["http://10.218.39.118:3000/public/images/goods/package.jpg"],
//     price: 1283,
//     details: "有了新包了，所有想要卖掉，99新"
// }
// ,{
//     publisher:'648d26a7434a5a5f40ea1a0d',
//     name:"口红",
//     imgs:["http://10.218.39.118:3000/public/images/goods/lipstick.jpg"],
//     price:258,
//     details:"全新，还没用过"
// },{
//     publisher:'648d26a7434a5a5f40ea1a0f',
//     imgs:["http://10.218.39.118:3000/public/images/goods/shoe.jpg"],
//     name:"小白鞋",
//     price:128,
//     details:"只穿过一次，99新"
// },{
//     publisher:"648d26a7434a5a5f40ea1a0e",
//     name:"Lolita",
//     imgs:["http://10.218.39.118:3000/public/images/goods/skirt.jpg"],
//     price:188,
//     details:"新裙子"
// })
//
//
// Community.create({
//     publisher: "648d24d6c30c80026384b3bb",
//     content: "好看的夕阳",
//     imgs: ["http://10.218.39.118:3000/public/images/discover/sunset.jpg"],
//     time: 2023-5-30,
//     collectNum: 12,
//     commentNum: 34,
//     upvoteNum: 133,
//
// },
// {
//     publisher:'648d26a7434a5a5f40ea1a0d',
//     content:"当我两个月没打球…… ",
//     imgs:["http://10.218.39.118:3000/public/images/discover/racket1.jpg","http://10.218.39.118:3000/public/images/discover/racket2.jpg"],
//     time:"2023-5-16",
//     collectNum: 59,
//     commentNum: 63,
//     upvoteNum: 966,
// },{
//     publisher:'648d26a7434a5a5f40ea1a0f',
//     content:"记录一些日常",
//     imgs:["http://10.218.39.118:3000/public/images/discover/peo.jpg"],
//     time:"2023-5-16",
//     collectNum: 0,
//     commentNum: 40,
//     upvoteNum: 185,
// },{
//     publisher:"648d26a7434a5a5f40ea1a0e",
//     content:"好看又好玩的现代诗",
//     imgs:["http://10.218.39.118:3000/public/images/discover/poem.jpg",
//     "http://10.218.39.118:3000/public/images/discover/poem2.jpg",
//     "http://10.218.39.118:3000/public/images/discover/poem3.jpg"],
//     time:"2023-5-16",
//     collectNum: 89,
//     commentNum: 66,
//     upvoteNum: 569,
// })

// Goods.find().populate('publisher').then(res=>console.log(res))

// 清空数据库，用于在网络环境更换的情况下使用，因为数据库中的图片数据是在后端中的引用，所以更换网络后地址发生变化，
// 导致数据库中的图片无法使用，（在此基础上，满足在局域网下的设备同样能够访问，所以使用本机的IPv4地址，而不是用localhost）
// 清空后重新添加包含本地ip的图片进入数据库，

// Community.deleteMany({})
//     .then(doc=>console.log(doc))
//     .catch(err=>console.log(err))
//
// Goods.deleteMany({})
//     .then(doc=>console.log(doc))
//     .catch(err=>console.log(err))

module.exports = { Goods, Community,ShoppingCart,historyList,User,LoginMes };