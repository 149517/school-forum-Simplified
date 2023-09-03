const express = require('express');
const fs = require('fs');
// const multer = require('multer');
const path = require('path');

const router = new express.Router();

// const upload = multer({ dest: 'public/images/discover'});

const Connect = require("./connect/connect");
const util = require("util");


router.get('/aa',(req,res)=>{
    res.send("Hello zeze")
})
//
router.get("/api/goods", (req, res) => {
    Connect.Goods.find()
        // .populate('publisher')
        .then((data) => {
            res.send(data);
            // console.log(data)
        })
        .catch(err => console.log(err))
})
router.get("/api/community", (req, res) => {
    Connect.Community.find().populate('publisher')
        .then((data) => {
            res.send(data);
            // console.log(data)
        })
        .catch(err => console.log(err))
})

// 商品详情
router.get("/api/goods/:id", (req, res) => {
    Connect.Goods.findOne({_id: `${req.params.id}`}).populate('publisher')
        .then(data => res.send(data))
        .catch(err => console.log(err))
})
// 帖子详情
router.get("/api/discover/:id", (req, res) => {
    Connect.Community.findOne({_id: `${req.params.id}`}).populate('publisher')
        .then(data => {
            res.send(data)

            // 返回数据之后并添加到历史浏览记录
            Connect.historyList.create({
                browseId: `${req.params.id}`,
                collect: false,
                upvote: false
            })
                .then(() => console.log("添加成功"))

        })
        .catch(err => console.log(err))
})


// 历史浏览记录
router.get('/api/historyList', (req, res) => {
    Connect.historyList.find()
        .then(data => res.send(data))
        .catch(err => res.send(err))
})


router.get('/json/:id', (req, res) => {
    // 读取本地JSON文件
    const jsonData = JSON.parse(fs.readFileSync(`./public/JSON/${req.params.id}.json`, 'utf8'));

    // 发送数据回客户端
    res.send(jsonData);

})


// 购物车列表
router.get('/api/shoppingCart', (req, res) => {
    Connect.ShoppingCart.find().populate('details')
        .then(data => res.send(data))
        .catch(err => console.log(err))
})
// 添加购物车
router.post('/api/shoppingCart/addCart', async (req, res) => {
    // console.log(req.body);
    let {id, num} = req.body;
    // console.log(id)
// 在数据库中查找匹配的数据
    const existingData = await Connect.ShoppingCart.findOne({details: id});
    if (existingData != null) {
        res.send("已经在购物车中")
    } else {
        Connect.ShoppingCart.create({
            details: id,
            num: num
        })
            .then(() => res.send("添加成功"))
            .catch(() => res.send("添加失败"))
    }
})
// 删除购物车
router.post('/api/shoppingCart/delete', (req, res) => {
    let {id} = req.body;
    console.log(req.body)
    console.log(id)
    Connect.ShoppingCart.findOneAndDelete({_id: id})
        .then(() => res.send('删除成功'))
        .catch(() => res.send("删除失败"))

})
// 修改商品数量
router.post('/api/shoppingCart/fixNum', async (req, res) => {
    let {id, num, op} = req.body;
    let number = num;
    number = (op === '-') ? number -= 1 : number += 1;
    await Connect.ShoppingCart.findOneAndUpdate({_id: id}, {$set: {num: number}})
        .then(() => res.send("修改成功"))
        .catch(err => res.send(err))


})
// 用于返回用户浏览记录，所有的浏览记录
router.post('/api/userHistory', async (req, res) => {
    let {UserId} = req.body;

    // 获取到用户的浏览记录列表
    Connect.User.find({_id: UserId}, {userHistoryList: 1})
        .then(doc => {
            let data = doc[0].userHistoryList;

            let promises = data.map(item => {
                return Connect.Community.findOne({_id: item.post}, {
                    content: 1,
                    imgs: 1
                }).populate('publisher', 'head nick');
            });

            Promise.all(promises)
                .then(results => {
                    res.send(results);
                })
                .catch(err => {
                    res.send(err);
                });
        })
        .catch(err => {
            res.send(err)
        })
})

// 返回用户的浏览记录，用于返回在帖子页面用户的浏览记录，用于共同生成帖子
router.post('/api/userHistoryList', async (req, res) => {
    let {UserId, list} = req.body;

    let data = []

    // 返回一个列表，列表中含有的是当前帖子列表中用户浏览过的记录
    await Connect.User.findOne({_id: UserId}, {userHistoryList: 1})
        .then(doc => {
            // console.log(doc.userHistoryList)
            // 从传递过来的 List 列表中进行比对
            for (let i = 0; i < doc.userHistoryList.length; i++) {
                for (let n = 0; n < list.length; n++) {
                    if (list[n] === doc.userHistoryList[i].post) {
                        // console.log(doc.userHistoryList[i])
                        data.push(doc.userHistoryList[i]);
                    }
                }
            }
            res.send(data)
        })
        .catch(err => {
            console.log("未查询到对应数据");
            res.send("未查询到对应数据")
        })
})

// 添加用户浏览记录
router.post('/api/addUserHistoryList', (req, res) => {
    let {UserId, postId, upvote, collect} = req.body;
    let newPost = {post: postId, upvote: upvote, collect: collect}
    Connect.User.findOne({_id: UserId, "userHistoryList.post": postId})
        .then(doc => {
            if (doc) {
                // 如果文档存在，则更新指定字段
                Connect.User.findOneAndUpdate(
                    {_id: UserId, "userHistoryList.post": postId},
                    {$set: {"userHistoryList.$.upvote": upvote, "userHistoryList.$.collect": collect}},
                    {new: true})
                    .then(() => {
                        console.log("修改成功")
                        res.send("修改成功")
                    })
                    .catch(() => console.log("修改失败"))
            } else {
                // 如果文档不存在，则向数组中添加新元素
                Connect.User.findOneAndUpdate(
                    {_id: UserId},
                    {$push: {userHistoryList: newPost}},
                    {new: true})
                    .then(() => {
                        console.log("添加成功")
                        res.send("添加成功")
                    })
                    .catch(() => console.log("添加失败"))
            }
        })
        .catch(() => console.log("查询失败"))
    // Connect.User.findOneAndUpdate(
    //     {_id: UserId},
    //     {$addToSet: {userHistoryList: newPost}},
    //     {new: true})
    //     .then(() => {
    //         console.log("修改成功")
    //         res.send("修改成功")
    //     })
    //     .catch(() => console.log("修改失败"))
})
/*
* 点赞信息交互
*
* 1. 点击后获取用户是否已经点赞或者收藏，
*   a.在客户端进行读取，读取之后再页面中显示读取状态
*   b.传递到服务器
* 2. 如果没有进行交互(收藏和点赞),就进行相对应的修改，
*   a.帖子点赞或者收藏数量加一
*   b.修改用户数据中点赞和收藏状态
* 3. 如果已经进行了点赞或者收藏，或者其中一个
*   a. 从用户记录中读取数据，
*   b. 并与新的交互中进行比对，如果不同则修改
*   c. 如果相同则清除状态，并减去对应的数据数量
* */


// 点赞等信息交互
router.post('/api/upvote', (req, res) => {
    // 用户id，帖子id,点赞还是收藏，点赞数量，收藏数量，收藏状态，点赞状态
    let {UserId, PostId, action, upvoteNum, collectNum, col, up} = req.body;
    console.log(UserId, PostId, action, upvoteNum, collectNum, col, up)

    // 获取 用户在当前帖子的交互，从客户端接收 col,up
    // 取反后作为新值修改
    if (col === null) {
        col = false
    }
    if (up === null) {
        up = false
    }
    let updataUp = !up;
    let updataCol = !col;
    console.log(updataCol, updataUp)

    // 在用户的信息中修改点赞和收藏记录
    if (action === 'upvote') {
        Connect.User.findOne(
            {_id: UserId, 'userHistoryList.post': PostId})
            // {$set: {'userHistoryList.$.upvote': updataUp}},
            // {new: true})
            .then(doc => {
                let value = fixPost(doc, PostId, updataUp, 1);
                doc.userHistoryList.push(value);
                return doc.save();
            })
            .then(() => {
                // 点赞数量的修改
                console.log("执行到")
                let upNum = (up) ? upvoteNum -= 1 : upvoteNum += 1;
                console.log(upNum)
                Connect.Community.findOneAndUpdate({_id: PostId}, {$set: {upvoteNum: upNum}})
                    .then((doc) => {
                        // console.log(doc);
                        res.send("数据修改成功")
                    })
                // res.send("修改成功")
            })
            .then(() => {
                console.log('修改成功');
            })
            .catch(err => {
                console.log(err);
            });
    }
    if (action === 'collect') {
        Connect.User.findOne({_id: UserId, 'userHistoryList.post': PostId})
            .then(doc => {
                let value = fixPost(doc, PostId, updataCol, 2);
                doc.userHistoryList.push(value);
                return doc.save();
            })
            .then(() => {
                let colNum = (col) ? collectNum -= 1 : collectNum += 1;
                // console.log(colNum)
                Connect.Community.findOneAndUpdate({_id: PostId}, {$set: {collectNum: colNum}})
                    .then((doc) => {
                        // console.log(doc);
                        res.send("数据修改成功")
                    })
            })
            .then(() => {
                console.log('修改成功');
            })
            .catch(err => {
                console.log(err);
            });
    }
})
let fixPost = function (doc, PostId, updata, op) {

    console.log(doc.userHistoryList)
    let index = doc.userHistoryList.findIndex(item => item.post === PostId);
    console.log(index)
    let value;
    if (index !== -1) {
        value = doc.userHistoryList.splice(index, 1);
        console.log(value[0])
    }
    if (op === 1) {

        value[0].upvote = updata;
    }
    else {
        value[0].collect = updata;
    }

    return value[0];
}
// 注册登录
router.post('/api/login', (req, res) => {
    let {account, password} = req.body;
    Connect.LoginMes.findOne({phone: account, password: password})
        .then((data) => {
            Connect.User.findOne({login: data._id})
                .then(data => res.send(data))
                .catch(err => res.send('账户未找到'))
        })
        .catch(err => res.send(err))
})
module.exports = router;
