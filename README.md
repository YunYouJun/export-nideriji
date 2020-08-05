# export-nideriji

[![Build Status](https://travis-ci.com/YunYouJun/export-nideriji.svg?branch=master)](https://travis-ci.com/YunYouJun/export-nideriji)

导出 [你的日记](http://nideriji.com/) APP 日记数据（你的日记数据来源于 [Oh 生活](https://ohshenghuo.com/)）

> 因为「你的日记」开发不是很活跃，且经常出现无法连接等 BUG，而本身也未提供导出功能，所以我写了该工具用于迁移至其他日记软件。  
> 此外因为我之后选择的是「一本日记」，所以也可以转换为「一本日记」的数据格式用于导入。  
> 我自己也已经成功迁移，所以该项目不会再维护，但如果你也有此需要，也希望能对你有所帮助。

[相关文章 - 导出「你的日记」与导入「一本日记」](https://www.yunyoujun.cn/note/export-nideriji-and-import-1diary/)

## 功能

### 你的日记

- 导出 `你的日记` 数据
- 导入 `你的日记` 数据

### Other

- 转换成 `一本日记` 数据格式

## 格式

- 你的日记原始 JSON 格式
- [一本日记](http://1diary.me)

## 使用方法

### 下载

- 方法一：直接下载 [Download zip](https://github.com/YunYouJun/export-nideriji/archive/master.zip)
- 方法二：使用 `git clone`

> 如果您没有 git , 还须先下载安装 [git](https://git-scm.com/)

```sh
git clone https://github.com/YunYouJun/export-nideriji.git
```

### 安装

须安装 [Node.js](http://nodejs.cn/download/)

```sh
# install
# 安装依赖包
npm install
# yarn
```

### 命令

```sh
# export
# 导出你的日记
npm start
# yarn start

# import
# 导入你的日记
npm run import
# yarn run import
```

导出文件位于 `logs` 目录中，`nideriji.json` 为`你的日记`的原始数据，`1diary/source.json` 为一本日记的导入格式。

### 配置

在 `.env.example` 中填写正确的邮箱和密码，并重命名为 `.env`

| Parameter | Description                     | Default |
| --------- | ------------------------------- | ------- |
| EMAIL     | 邮箱                            | -       |
| PASSWORD  | 密码                            | -       |
| TOTAL     | 导出数量(不填或 0 代表全部导出) | -       |

所需时间几十秒到几分钟不等。

### 导出至一本日记

如需导出至「一本日记」的格式，运行如下命令

```sh
# 转为一本日记 JSON 格式（须已存在导出文件）
npm run to:1diary
# yarn to:diary
```

用转换格式后所得的 `source.json` 替换 `example` 文件夹内 `1diary_backup_all` 压缩文件内部的同名文件 `source.json`，
再用该压缩文件作为导入即可。

## NIDERIJI API

[你的日记 API DOC - Postman](https://documenter.getpostman.com/view/3326320/Rztmr8pE)
