# export-nideriji

导出 [你的日记](http://nideriji.com/) APP 日记数据

> 应用抓包发现数据实际来源于 [Oh 生活](https://ohshenghuo.com/)

## Format

- 你的日记原始 JSON 格式
- [一本日记](http://1diary.me)

## Usage

安装 [Node.js](http://nodejs.cn/download/)

在命令行输入

```sh
# install
npm install
# yarn

# start
# 开始导出
npm start
# yarn start

# convert to 1diary
# 转为一本日记 JSON 格式
npm run to:1diary
# yarn to:diary
```

导出文件位于 `logs` 目录中，`nideriji.json` 为`你的日记`的原始数据，`1diary/source.json` 为一本日记的导入格式。

在 `.env.example` 中填写正确的邮箱和密码，并重命名为 `.env`

|Parameter|Description|Default|
|-|-|-|
|EMAIL|邮箱|-|
|PASSWORD|密码|-|
|TOTAL|导出数量(不填或0代表全部导出)|-|

所需时间几十秒到几分钟不等。

## NIDERIJI API

[你的日记 API DOC - Postman](https://documenter.getpostman.com/view/3326320/Rztmr8pE)
