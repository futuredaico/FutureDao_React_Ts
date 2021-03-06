# FutureDao

## 技术选型
1. React
2. React-router
3. Mobx
4. Typescript

## 启动（测试网）

```shell
npm install / yarn add
```

```shell
npm start / yarn start
```
## 启动（主网）
```shell
npm run startpub
```
## 打包发布
```shell
npm run build
```

## Nginx 配置
```shell
location / {
  try_files $uri /index.html;
}

location /test {
 try_files $uri /test/index.html;
}
```

## 项目文档

V1.0完成基础功能：
  发现项目列表页
  注册、登录功能
  个人中心
    个人资料，可更改头像、简介、邮箱、密码
    管理项目
  编辑项目
    编辑项目信息、团队信息并保存，可以提交审核
  编辑项目更新
  项目详情页
  详情展示，可关注、看好项目
  团队展示
  评论展示，可评论已看好项目
  更新列表展示
  更新详情及其评论，可评论已看好项目的更新


## 流程图

todo

## 代码约束

遵循 typescript-react 规范 以及 arbnb 规范

## 合并
1. 保持当前分支代码最新 并 push
2. 切到master 分枝， 并 拉取最新代码
3. 在master 分枝， git merge  （需要合并的分枝）
4. master push 到github

3 的 操作表示  把 xx 分枝 合并进master