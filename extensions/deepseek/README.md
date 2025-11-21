# AI 代码助手

🚀 强大的 AI 代码助手，集成 DeepSeek 和 OpenAI Codex，为你的编程提供智能支持！

## ✨ 功能特性

### 🤖 多 AI 模型支持
- **DeepSeek** - 国产优秀 AI 模型，性价比高
  - `deepseek-chat` - 通用对话模型
  - `deepseek-coder` - 专业代码模型
- **OpenAI** - GPT 系列模型，功能强大
  - `gpt-4` - 最强大的模型
  - `gpt-4-turbo` - 更快更便宜
  - `gpt-3.5-turbo` - 快速且经济

### 💡 智能功能

#### 1. 💬 智能对话
与 AI 进行自然语言对话，解答编程问题
- 快捷键: `Ctrl+Shift+A` (Mac: `Cmd+Shift+A`)

#### 2. 📖 代码解释
详细解释选中代码的功能、实现原理和关键点
- 快捷键: `Ctrl+Shift+E` (Mac: `Cmd+Shift+E`)
- 右键菜单: AI 助手 → 解释代码

#### 3. ✨ 代码生成
根据自然语言描述自动生成代码
- 快捷键: `Ctrl+Shift+G` (Mac: `Cmd+Shift+G`)
- 支持多种编程语言

#### 4. 🚀 代码优化
智能优化代码性能、可读性和可维护性
- 右键菜单: AI 助手 → 优化代码

#### 5. 🔧 修复错误
自动分析并修复代码中的错误
- 右键菜单: AI 助手 → 修复代码错误

#### 6. 💬 添加注释
为代码添加清晰易懂的中文注释
- 右键菜单: AI 助手 → 添加注释

#### 7. 🧪 生成测试
自动生成完整的单元测试代码
- 右键菜单: AI 助手 → 生成测试代码

#### 8. 🌍 代码翻译
在不同编程语言之间转换代码
- 右键菜单: AI 助手 → 翻译代码语言
- 支持: TypeScript, JavaScript, Python, Java, Go, Rust, C++, C#

#### 9. 🔄 代码重构
改善代码结构和设计，提高代码质量
- 右键菜单: AI 助手 → 重构代码

#### 10. 📝 生成文档
自动生成详细的 API 文档
- 右键菜单: AI 助手 → 生成文档
- 支持 JSDoc/Markdown 格式

## 🎯 快速开始

### 1. 获取 API Key

#### DeepSeek (推荐)
1. 访问 [DeepSeek 平台](https://platform.deepseek.com/)
2. 注册并登录
3. 创建 API Key

#### OpenAI
1. 访问 [OpenAI 平台](https://platform.openai.com/)
2. 注册并登录
3. 创建 API Key

### 2. 配置扩展

打开 VS Code 设置 (`Ctrl+,`)，搜索 "AI 助手"：

```json
{
  // 选择 AI 提供商
  "aiAssistant.provider": "deepseek",  // 或 "openai"

  // DeepSeek 配置
  "aiAssistant.deepseek.apiKey": "sk-xxxxxxxxxxxxxxxx",
  "aiAssistant.deepseek.model": "deepseek-chat",

  // OpenAI 配置
  "aiAssistant.openai.apiKey": "sk-xxxxxxxxxxxxxxxx",
  "aiAssistant.openai.model": "gpt-4",
  "aiAssistant.openai.apiEndpoint": "https://api.openai.com/v1",

  // 其他设置
  "aiAssistant.language": "zh-CN",
  "aiAssistant.autoSave": true
}
```

### 3. 开始使用

#### 方式一：快捷键
- `Ctrl+Shift+A` - 开始对话
- `Ctrl+Shift+E` - 解释代码（需先选中代码）
- `Ctrl+Shift+G` - 生成代码

#### 方式二：右键菜单
1. 选中代码
2. 右键点击
3. 选择 "AI 助手" 菜单
4. 选择需要的功能

#### 方式三：命令面板
1. 按 `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. 输入 "AI 助手"
3. 选择需要的命令

## ⚙️ 配置选项

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `aiAssistant.provider` | AI 服务提供商 | `deepseek` |
| `aiAssistant.deepseek.apiKey` | DeepSeek API Key | (空) |
| `aiAssistant.deepseek.model` | DeepSeek 模型 | `deepseek-chat` |
| `aiAssistant.openai.apiKey` | OpenAI API Key | (空) |
| `aiAssistant.openai.model` | OpenAI 模型 | `gpt-4` |
| `aiAssistant.openai.apiEndpoint` | OpenAI API 端点 | `https://api.openai.com/v1` |
| `aiAssistant.language` | AI 回复语言 | `zh-CN` |
| `aiAssistant.autoSave` | 自动保存对话历史 | `true` |

## 🎨 使用技巧

### 1. 对话历史
扩展会自动保存最近 20 条对话，支持上下文理解。使用 "清除对话历史" 命令可以重新开始。

### 2. 输出面板
所有 AI 回复都会显示在 "AI 助手" 输出面板中，方便查看和复制。

### 3. 代理设置
如果无法访问 OpenAI，可以修改 `aiAssistant.openai.apiEndpoint` 使用代理或第三方端点。

### 4. 模型选择
- **日常对话**: 使用 `deepseek-chat` 或 `gpt-3.5-turbo`
- **代码任务**: 使用 `deepseek-coder` 或 `gpt-4`
- **复杂任务**: 使用 `gpt-4` 或 `gpt-4-turbo`

## 📊 费用说明

### DeepSeek
- 价格低廉，性价比高
- 查看详情: [DeepSeek 定价](https://platform.deepseek.com/pricing)

### OpenAI
- 按 token 计费
- 查看详情: [OpenAI 定价](https://openai.com/pricing)

## 🔒 隐私安全

- API Key 仅存储在本地配置中
- 代码仅在你主动调用时发送到 AI 服务
- 不会收集或上传任何个人数据

## 🐛 问题反馈

如遇到问题，请：
1. 检查 API Key 是否正确
2. 检查网络连接
3. 查看 "AI 助手" 输出面板的错误信息
4. 尝试切换不同的 AI 提供商

## 📝 更新日志

### v1.0.0
- ✨ 支持 DeepSeek 和 OpenAI 双 AI 引擎
- 💬 智能对话功能
- 📖 代码解释
- ✨ 代码生成
- 🚀 代码优化
- 🔧 修复错误
- 💬 添加注释
- 🧪 生成测试
- 🌍 代码翻译
- 🔄 代码重构
- 📝 生成文档

## 📄 许可证

MIT License

---

**享受 AI 编程的乐趣！** 🎉
