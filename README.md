# Phonebook Full-Stack Demo

一个简单的全栈电话簿练习项目，包含：
- 后端：Express + CORS API（`phonebook-backend`）
- 前端：React + Vite（`phonebook-frontend`）

## ✅ 项目结构

```
exercise/
├─ phonebook-backend/
│  ├─ index.js
│  ├─ package.json
│  └─ requests/
├─ phonebook-frontend/
│  ├─ src/
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ package.json
│  └─ vite.config.js
```

## 🚀 功能说明

- 后端支持：
  - `GET /api/persons`：获取所有联系人
  - `GET /api/persons/:id`：根据 id 获取联系人
  - `POST /api/persons`：新增联系人
  - `DELETE /api/persons/:id`：删除联系人
  - `GET /info`：返回电话簿数量 + 当前时间
- 前端支持：
  - 页面加载时展示联系人列表
  - 新增联系人（发送 POST）
  - 简单表单输入

## 🛠️ 本地运行

### 1) 启动后端

```bash
cd phonebook-backend
npm install
npm run dev
```

后端默认运行在 `http://localhost:3001`

### 2) 启动前端

```bash
cd phonebook-frontend
npm install
npm run dev
```

前端默认运行在 `http://localhost:5173`（或终端显示的地址）

然后打开浏览器访问前端地址即可看到电话簿页面。

## 🔧 调试 API

后端目录 `requests/` 提供了 REST 客户端调用示例文件：
- `post_person.rest`
- `person.rest`
- `delete_person.rest`

你可以在 VS Code 的 REST 客户端插件中直接运行。

## 📌 备注

该项目是一个学习型小练习，存储为内存数据（重启后数据会重置）。
