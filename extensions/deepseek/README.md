# DeepSeek AI 助手

DeepSeek AI 代码助手集成，为 VS Code 提供智能代码辅助功能。

## 功能特性

- 💬 **智能对话**: 与 DeepSeek AI 进行自然语言对话
- 📖 **代码解释**: 详细解释选中的代码功能和实现原理
- ✨ **代码生成**: 根据描述自动生成代码
- 🚀 **代码优化**: 智能优化代码性能和可读性

## 使用方法

### 1. 配置 API Key

打开设置 (Ctrl+,)，搜索 "DeepSeek"，填入你的 API Key：

```json
{
  "deepseek.apiKey": "your-api-key-here",
  "deepseek.model": "deepseek-chat"
}
```

### 2. 使用命令

- **开始对话**: `Ctrl+Shift+D` (Mac: `Cmd+Shift+D`)
- **解释代码**: 选中代码 → 右键 → "DeepSeek: 解释代码"
- **优化代码**: 选中代码 → 右键 → "DeepSeek: 优化代码"
- **生成代码**: 命令面板 → "DeepSeek: 生成代码"

## 获取 API Key

访问 [DeepSeek 官网](https://platform.deepseek.com/) 注册并获取 API Key。

## 配置选项

- `deepseek.apiKey`: DeepSeek API Key
- `deepseek.apiEndpoint`: API 端点 (默认: https://api.deepseek.com/v1)
- `deepseek.model`: 模型选择 (deepseek-chat 或 deepseek-coder)
- `deepseek.enabled`: 启用/禁用扩展

## 支持的模型

- **deepseek-chat**: 通用对话模型
- **deepseek-coder**: 专业代码模型

## 许可证

MIT
