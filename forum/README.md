# forum 

## 导入数据问题

> 数据导入的使用express发送JSON文件的格式

图片采用express访问静态文件夹目录获取，
但是在后续过程中发现，JSON文件只利用获取，添加数据时候不好添加，
故采用数据库，MongoDB

##### 数据库建立连接之后尚未进行数据内容的添加处理



## 文本框的动画问题

> 在内容添加界面。文本框位于屏幕的中部，在上面和下面都有内容，
> 最初的想法在文本框获得焦点时候，文本框上移动，然后添加过渡动画，

##### 但是在实现中，电脑上显示完全，完美符合预期，
手机上的效果是，点击输入框，就会弹出输入法，且会自动弹开上面的内容，过度效果未完成，且造成卡顿。

#### 解决
实现在文本框原本的位置添加一个块，覆盖文本框，待其动画完成之后，隐藏该块，并显示文本框，同时获取焦点

###### 出现问题 data 数据修改后，在后面直接调用focus并不能成功，
**这是因为data改变后vue是异步响应的，它会先执行下一条代码，但是这时的el-input并没有显示在页面上，所以不会focus。**
`this.inputPlay = true;this.$refs.input.focus();`
> 为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用
> Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。
```js
      this.$nextTick(() =>this.$refs.input.focus())
      this.$refs.input.focus();
```
但是 这个方法过快，动画尚未执行完成，故使用setTimeout

## 当前页面样式的问题
> 由于后续子界面的增加，发现底部的导航使用只限与主要的5个界面，没必要在`App.vue`中实现
> 改为将底部的导航栏作为五个主要界面中的子组件导入的形式使用

修改之后发现当前页面的样式并没有实现，需要点击2次之后才出现，第一次跳转，第二次才能够有当前页面的选中样式。

##### 解决
使用了父组件传值给子组件的方式，根据当前父组件的值来修改底部图标的选中样式。

#### Home 组件内子组件的选中样式
> 在home组件中，子组件没有较大问题，只是刷新后，页面内容停留在当前的页面，而选中样式回到了第一个。

后面采用`openLink:this.$route.path,`获取当前页面的路由，让后进行比较，在每次创建的时候获取并修改选中按钮


## 数据库添加内容的去重问题

> 刚开始的时候感觉很简单，做了一个简单的判断，然后尝试了一下， 感觉对了
> 
> 后面发现添加的时候还是添加了重复的数据。才来后端查看

#### 最先以为是查询的问题
因为使用联合查询，导致数据内部包含数据，我以为解决了这个问题就能够解决
然后尝试了使用一个函数（写的时候内容较多，然后看起来比较杂）通过返回值来判断数据库中是否含有
但是查询出来了，也通过输出来检查错误。还通过正则比对
> 但是当时没有反应过来，即使是比对正确，但是返回值还是没有添加，然后还是继续添加，

#### 查询异步执行
后面才知道是因为查询异步执行了，其实输出的次序已经是这样了，当时没太注意。

### 修改代码为同步
刚开始的时候还是感觉比较复杂，求助了ChatGPT，他写的代码还是执行有些问题，然后后面我突然发现，
其实**我在查询时候没必要深入的查询，只需要查询到当前这个集合就行，不需要使用联合查询，因为`details`
关联其他表的数据其实就是那个`_id`值，我只需要查询这个表中的Details就行。

##### 最后的代码
```js
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
```


## 点赞收藏的交互操作

### 用户浏览记录的添加获取

* 浏览记录的返回
```js
router.post('/api/userHistoryList', async (req, res) => {
    let {UserId, list} = req.body;

    let data = []

    await Connect.User.findOne({_id: UserId}, {userHistoryList: 1})
        .then(doc => {
            console.log(doc.userHistoryList)
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
```

### 实现获取两个数据进行内容刷新

先通过`v-for`刷新列表，再根据帖子的Id进行比对，相同会读取点赞和收藏记录
* 问题每次刷新列表都需要遍历浏览记录

`<img src="/src/assets/icon/upvoteClick.png" alt="" v-if="nn.post === item._id && nn.upvote">
<img src="/src/assets/icon/upvote.png" alt="" v-else>`

```vue
<div class="comment">
    <div class="action" v-for="nn in HistoryList">
        <div class="collect alignment" @click="comment('collect',item._id,item.upvoteNum,item.collectNum)">
        <img src="/src/assets/icon/collectClick.png" alt="" v-if="nn.post === item._id && nn.upvote">
            <img src="/src/assets/icon/collect.png" alt="" v-else>
                {{ item.collectNum }}
    </div>
    <div class="comm alignment" @click="comment('comm',item._id,item.commentNum )">
    <img src="/src/assets/icon/Mes.png" alt="">{{ item.commentNum }}
</div>
<div class="upvote alignment" @click="comment('upvote',item._id,item.upvoteNum,item.collectNum)">
<img src="/src/assets/icon/upvoteClick.png" alt="" v-if="nn.post === item._id && nn.upvote">
    <img src="/src/assets/icon/upvote.png" alt="" v-else>
        {{ item.upvoteNum }}
    </div>
</div>

</div>
```


### 根据操作进行数据的修改

> 涉及两个数据，一个是用户数据，一个是帖子数据，

* 经过多次修改完善实现其功能

1. 通过从客户端接收数据，其内容包括用户id，帖子id,点赞还是收藏，点赞数量，收藏数量，收藏状态，点赞状态
2. 通过接收到的点赞或者收藏的状态进行修改，如为null，则修改为false，然后建立新的修改参数接收相反值
3. 根据用户的操作，点赞还是收藏进行不同的处理
4. 在User表中查找` {_id: UserId, 'userHistoryList.post': PostId})`,UserId下的userHistoryList.post==PostId的对象
5. 找到该对象后通过修改值的一个函数进行数据处理，先将其从浏览记录中删除，再通过操作修改对应upvote或者Collect的值
6. 然后将这条数据通过函数返回，添加到数据数组中，在数据库中save
7. 然后进行点赞数据的修改，
8. 先通过upvote的状态来决定number加还是减，
9. 再通过数据的查找，给数据库中对应的值进行赋值
```js
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
```

## 网络环境更变后数据库图片的响应问题

> 因为一直在学校，使用的是学校的网络，在使用中使用的是webstorm进行开发，在生成的网站中，有本机localhost的地址和本机的ip地址进行访问网站
> 使用ip地址时，可以在局域网中进行访问和使用。

> 所以在后端的请求和数据库的使用中，都是使用的是ip地址进行访问，更换网络后发现后端和数据库的访问都出现了问题。
> 原因是ip地址发生了变更，在学校的我的电脑的ip地址是`10.218.4.31`,在家是`192.168.2.216`


* 初期排除半天的问题发现是因为IP地址变化所以访问出现问题

#### 文件修改
**在后续的修改中，我通过vscode的全局修改功能，在文件中所有包含`10.218.4.31`地址的字符全部修改为`192.168.2.216`**

#### 反向代理
* 但是在数据库中的图片路径依然是原本的`192.168.2.216`，我通过搜索了解到nginx的功能，原本打算通过使用反向代理的方式进行使用，但是后来发现怎么都不成功

* 在数据库的图片读取时候数据的请求路径可能无法发送到本机，再加上nginx的配置不生效。

#### 图片格式转化

* 原本打算使用base64格式的图片在数据库中进行存储，但是发现base64格式的数据量较大，而且重新将数据库中的图片改为base64，工程也比较大，需要重新覆盖数据库，
* 所有决定还是通过**修改请求路径和使用我的网站服务器的方式**


#### 数据库中图片的路径修改
1. 需要先删除原本的数据库，**在操作中，因为mongodb数据库的`_id`时自动生成，而在我的数据库中全部使用的是通过`_id`进行查询和绑定**，
2. 所以只能修改Goods和Community两个数据库，但是修改后的部分数据会产生影响。
3. 在User中的头像数据采用的是我的网站服务器加上在数据库中修改图片路径的方式进行(**因为User表中的数据是其他数据库的绑定依据，修改后所有_id发生变化会导师其他数据库找不到的问题**)


`后面可能全部采用的是数据库中的图片使用网站服务器进行存储和发送的方式`
**通过清空且重新添加的方式后，原本的浏览历史和购物车都会找不到数据，需要进行清空**


清空数据库
```js
Community.deleteMany({})
    .then(doc=>console.log(doc))
    .catch(err=>console.log(err))

Goods.deleteMany({})
    .then(doc=>console.log(doc))
    .catch(err=>console.log(err))
```

图片路径路由的请求

> `folder?` 表示可选参数，但是在我的服务器中的路由并不是以下，做了修改，使用了不同的路由处理了之前的图片请求和forum的图片请求
```js
router.get('/api/images/:folder1?/:folder2?/:id', (req, res) => {
    let filePath;
    if (req.params.folder1 && req.params.folder2) {
        filePath = path.join(__dirname, `./images/${req.params.folder1}/${req.params.folder2}/${req.params.id}`);
    } else if (req.params.folder1) {
        filePath = path.join(__dirname, `./images/${req.params.folder1}/${req.params.id}`);
    } else {
        filePath = path.join(__dirname, `./images/${req.params.id}`);
    }
    res.sendFile(filePath);
});
```