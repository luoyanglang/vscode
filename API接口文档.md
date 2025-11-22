# 小玉智能系统 API 接口文档

## 📡 接口类型

**REST API** - 基于HTTP的RESTful API

## 🔗 基础信息

- **API地址**: `https://xiaoyu.api.ymd.cc`
- **认证方式**: API Key（Header: `X-API-Key`）
- **数据格式**: JSON
- **超时时间**: 30秒

## 🔐 认证

所有请求需要在Header中携带API Key：

```http
X-API-Key: your-api-key-here
Content-Type: application/json
```

## 📋 接口列表

### 1. 对话接口

#### 1.1 发送消息
```http
POST /api/chat
```

**请求体：**
```json
{
  "message": "你好",
  "session_id": "optional-session-id",
  "use_memory": true,
  "model": "deepseek-chat"
}
```

**响应：**
```json
{
  "success": true,
  "response": "你好！我是小玉...",
  "session_id": "session-123",
  "memories_used": [...],
  "tokens_used": 150,
  "cost": 0.0015
}
```

#### 1.2 高级对话
```http
POST /api/chat/advanced
```

**请求体：**
```json
{
  "message": "帮我写一段代码",
  "system_prompt": "你是一个编程专家",
  "use_memory": true
}
```

#### 1.3 获取统计
```http
GET /api/chat/stats
```

**响应：**
```json
{
  "total_messages": 1000,
  "total_sessions": 50,
  "total_cost": 15.5,
  "cache_hit_rate": 0.65
}
```

### 2. 记忆接口

#### 2.1 添加记忆
```http
POST /api/memory/add
```

**请求体：**
```json
{
  "type": "user_pref",
  "key": "喜欢的颜色",
  "value": "蓝色",
  "importance": 8,
  "tags": ["偏好", "个人"]
}
```

#### 2.2 搜索记忆
```http
POST /api/memory/search
```

**请求体：**
```json
{
  "query": "用户喜欢什么",
  "limit": 10
}
```

**响应：**
```json
{
  "memories": [
    {
      "id": 1,
      "type": "user_pref",
      "key": "喜欢的颜色",
      "value": "蓝色",
      "importance": 8,
      "tags": ["偏好"],
      "created_at": "2024-11-22T10:00:00Z"
    }
  ]
}
```

#### 2.3 获取所有记忆
```http
GET /api/memory/list?skip=0&limit=100
```

#### 2.4 删除记忆
```http
DELETE /api/memory/{id}
```

#### 2.5 记忆统计
```http
GET /api/memory/stats
```

### 3. 会话接口

#### 3.1 创建会话
```http
POST /api/session/create
```

**请求体：**
```json
{
  "name": "今天的对话"
}
```

#### 3.2 获取会话列表
```http
GET /api/session/list
```

**响应：**
```json
{
  "sessions": [
    {
      "id": "session-123",
      "name": "今天的对话",
      "created_at": "2024-11-22T10:00:00Z",
      "updated_at": "2024-11-22T11:00:00Z",
      "message_count": 10
    }
  ]
}
```

#### 3.3 获取会话详情
```http
GET /api/session/{session_id}
```

**响应：**
```json
{
  "session": {...},
  "messages": [
    {
      "id": "msg-1",
      "role": "user",
      "content": "你好",
      "timestamp": 1700640000000
    }
  ]
}
```

#### 3.4 保存消息
```http
POST /api/session/save
```

**请求体：**
```json
{
  "session_id": "session-123",
  "role": "user",
  "content": "你好"
}
```

#### 3.5 删除会话
```http
DELETE /api/session/{session_id}
```

### 4. 健康检查

#### 4.1 健康状态
```http
GET /health
```

**响应：**
```json
{
  "status": "healthy",
  "database": "connected",
  "vector_server": true
}
```

## 🎯 特殊功能

### 媒体文件上传
```http
POST /api/media/upload
Content-Type: multipart/form-data
```

**请求体：**
```
file: [文件]
description: "图片描述"
```

### 提取记忆
```http
POST /api/chat/extract-memory
```

**请求体：**
```json
{
  "conversation": "用户说他喜欢蓝色..."
}
```

## 📊 性能指标

### v2.0.0 优化后

| 指标 | 数值 |
|------|------|
| 平均响应时间 | 300-800ms |
| 向量搜索 | <10ms |
| 记忆召回 | <20ms |
| 并发能力 | 50-100 QPS |
| 缓存命中率 | 60-70% |

## 🔧 错误码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（API Key错误） |
| 404 | 资源不存在 |
| 429 | 请求过于频繁 |
| 500 | 服务器错误 |

## 💡 使用示例

### JavaScript/TypeScript
```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://xiaoyu.api.ymd.cc',
  headers: {
    'X-API-Key': 'your-api-key',
    'Content-Type': 'application/json'
  }
})

// 发送消息
const response = await api.post('/api/chat', {
  message: '你好',
  use_memory: true
})

console.log(response.data.response)
```

### Python
```python
import requests

headers = {
    'X-API-Key': 'your-api-key',
    'Content-Type': 'application/json'
}

response = requests.post(
    'https://xiaoyu.api.ymd.cc/api/chat',
    headers=headers,
    json={
        'message': '你好',
        'use_memory': True
    }
)

print(response.json()['response'])
```

### cURL
```bash
curl -X POST https://xiaoyu.api.ymd.cc/api/chat \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"message":"你好","use_memory":true}'
```

## 🚀 桌面客户端集成

桌面客户端使用Axios封装了所有API：

```typescript
// 配置
import { config } from './config'

// 使用
import { chatApi } from './api/chat'
const response = await chatApi.sendMessage({
  message: '你好',
  use_memory: true
})
```

## 📝 注意事项

1. **API Key安全**：不要在前端代码中硬编码API Key
2. **请求频率**：建议控制在每秒10次以内
3. **超时处理**：建议设置30秒超时
4. **错误重试**：网络错误可以重试，业务错误不要重试
5. **成本控制**：注意Token使用量，避免过长的对话

## 🔗 相关链接

- API在线文档：https://xiaoyu.api.ymd.cc/docs
- 健康检查：https://xiaoyu.api.ymd.cc/health
- GitHub仓库：https://github.com/luoyanglang/xiaoyu-ai

---

**小玉智能系统 v2.0.0** - REST API 文档
