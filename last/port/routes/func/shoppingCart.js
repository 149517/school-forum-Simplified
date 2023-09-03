const express = require('express');

const router = new express.Router();

const Connect = require("../connect/connect");

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
export default router