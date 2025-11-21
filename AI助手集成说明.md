# AI 代码助手集成说明

🎉 已成功为 VS Code 集成强大的 AI 代码助手！

## 🌟 支持的 AI 模型

### GitHub Copilot (推荐)
- ✅ **实时代码补全** - 最流畅的编码体验
- ✅ **Copilot Chat** - 对话式编程
- ✅ **多语言支持** - 支持几乎所有编程语言
- 💰 $10/月，学生免费
- 📚 详见：[GitHub_Copilot使用指南.md](GitHub_Copilot使用指南.md)

### DeepSeek (高性价比)
- ✅ **deepseek-chat** - 通用对话模型
- ✅ **deepseek-coder** - 专业代码模型
- 💰 价格低廉，性价比高
- 🇨🇳 国产优秀 AI，响应速度快

### OpenAI Codex (功能强大)
- ✅ **GPT-4** - 最强大的模型
- ✅ **GPT-4 Turbo** - 更快更便宜
- ✅ **GPT-3.5 Turbo** - 快速且经济
- 🌍 全球领先的 AI 技术

## 🚀 功能列表

### 基础功能
1. **💬 智能对话** - 与 AI 进行自然语言对话
2. **📖 代码解释** - 详细解释代码功能和实现
3. **✨ 代码生成** - 根据描述自动生成代码
4. **🚀 代码优化** - 提升代码性能和可读性

### 高级功能
5. **🔧 修复错误** - 自动分析并修复代码错误
6. **💬 添加注释** - 为代码添加清晰的中文注释
7. **🧪 生成测试** - 自动生成单元测试代码
8. **🌍 代码翻译** - 在不同编程语言间转换
9. **🔄 代码重构** - 改善代码结构和设计
10. **📝 生成文档** - 自动生成 API 文档

## 🎯 AI 选择建议

### 推荐方案

**方案一：GitHub Copilot（最佳体验）**
- ✅ 实时代码补全，无需手动触发
- ✅ 体验最流畅
- ✅ 学生免费
- 💰 $10/月

**方案二：内置 AI 助手（灵活经济）**
- ✅ 按需使用，按量付费
- ✅ 支持多个 AI 提供商
- ✅ 功能丰富
- 💰 使用多少付多少

**方案三：组合使用（推荐）**
- 🚀 Copilot 用于日常编码补全
- 💡 内置 AI 用于复杂问题和代码审查
- 🎯 发挥各自优势

## 📦 快速开始

### 选项 A: 使用 GitHub Copilot

1. 安装扩展：`GitHub.copilot` 和 `GitHub.copilot-chat`
2. 登录 GitHub 账号
3. 激活订阅（学生免费）
4. 开始编码！

详细教程：[GitHub_Copilot使用指南.md](GitHub_Copilot使用指南.md)

### 选项 B: 使用内置 AI 助手

#### 步骤 1: 获取 API Key

#### 使用 DeepSeek (推荐)
1. 访问 https://platform.deepseek.com/
2. 注册并登录账号
3. 进入 API Keys 页面
4. 创建新的 API Key
5. 复制保存 API Key

#### 使用 OpenAI
1. 访问 https://platform.openai.com/
2. 注册并登录账号
3. 进入 API Keys 页面
4. 创建新的 API Key
5. 复制保存 API Key

### 步骤 2: 配置 VS Code

编译安装 VS Code 后，打开设置：

**方法一：图形界面**
1. 按 `Ctrl+,` 打开设置
2. 搜索 "AI 助手"
3. 选择 AI 提供商 (DeepSeek 或 OpenAI)
4. 填入对应的 API Key
5. 选择模型

**方法二：JSON 配置**

按 `Ctrl+Shift+P`，输入 "Open User Settings (JSON)"，添加：

```json
{
  // 选择 AI 提供商
  "aiAssistant.provider": "deepseek",

  // DeepSeek 配置
  "aiAssistant.deepseek.apiKey": "sk-xxxxxxxxxxxxxxxx",
  "aiAssistant.deepseek.model": "deepseek-chat",

  // OpenAI 配置 (可选)
  "aiAssistant.openai.apiKey": "sk-xxxxxxxxxxxxxxxx",
  "aiAssistant.openai.model": "gpt-4",

  // 语言设置
  "aiAssistant.language": "zh-CN"
}
```

### 步骤 3: 开始使用

#### 🎯 快捷键
| 功能 | Windows/Linux | macOS |
|------|---------------|-------|
| 开始对话 | `Ctrl+Shift+A` | `Cmd+Shift+A` |
| 解释代码 | `Ctrl+Shift+E` | `Cmd+Shift+E` |
| 生成代码 | `Ctrl+Shift+G` | `Cmd+Shift+G` |

#### 📝 右键菜单
1. 选中代码
2. 右键点击
3. 选择 "AI 助手"
4. 选择需要的功能：
   - 解释代码
   - 添加注释
   - 生成文档
   - 优化代码
   - 重构代码
   - 修复代码错误
   - 生成测试代码
   - 翻译代码语言

#### 🎨 命令面板
1. 按 `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. 输入 "AI 助手"
3. 选择命令

## 💡 使用示例

### 示例 1: 解释代码
```typescript
// 选中以下代码，按 Ctrl+Shift+E
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```
AI 会详细解释这是一个递归实现的斐波那契数列函数。

### 示例 2: 生成代码
按 `Ctrl+Shift+G`，输入：
```
创建一个 React 组件，显示用户列表，支持搜索和分页
```
AI 会生成完整的 React 组件代码。

### 示例 3: 优化代码
选中低效的代码，右键 → AI 助手 → 优化代码
AI 会提供优化建议和改进后的代码。

### 示例 4: 生成测试
选中函数代码，右键 → AI 助手 → 生成测试代码
AI 会生成完整的单元测试。

## ⚙️ 配置说明

### AI 提供商选择

**DeepSeek (推荐新手)**
- ✅ 价格便宜
- ✅ 中文支持好
- ✅ 响应速度快
- ✅ 国内访问稳定

**OpenAI (推荐专业用户)**
- ✅ 功能最强大
- ✅ 支持更多模型
- ✅ 生态完善
- ⚠️ 需要代理访问
- ⚠️ 价格较高

### 模型选择建议

| 任务类型 | DeepSeek | OpenAI |
|---------|----------|--------|
| 日常对话 | deepseek-chat | gpt-3.5-turbo |
| 代码编写 | deepseek-coder | gpt-4 |
| 代码审查 | deepseek-coder | gpt-4 |
| 复杂任务 | deepseek-coder | gpt-4-turbo |

### OpenAI 代理设置

如果无法直接访问 OpenAI，可以配置代理：

```json
{
  "aiAssistant.openai.apiEndpoint": "https://your-proxy.com/v1"
}
```

常见代理服务：
- https://api.openai-proxy.com/v1
- https://api.openai-sb.com/v1
- 或使用自建代理

## 💰 费用参考

### DeepSeek 定价
- 输入: ¥0.001 / 1K tokens
- 输出: ¥0.002 / 1K tokens
- 约 1000 次对话 ≈ ¥10

### OpenAI 定价
- GPT-3.5 Turbo: $0.0015 / 1K tokens
- GPT-4: $0.03 / 1K tokens
- GPT-4 Turbo: $0.01 / 1K tokens

## 🔒 隐私与安全

- ✅ API Key 仅存储在本地
- ✅ 代码仅在主动调用时发送
- ✅ 不收集任何个人数据
- ✅ 支持自定义 API 端点
- ⚠️ 注意不要将 API Key 提交到代码仓库

## 🎯 最佳实践

### 1. 对话历史管理
- 扩展自动保存最近 20 条对话
- 定期使用 "清除对话历史" 命令
- 避免在对话中包含敏感信息

### 2. 提示词技巧
- 描述要清晰具体
- 提供足够的上下文
- 指定期望的输出格式
- 可以要求分步骤解释

### 3. 代码审查
- 不要盲目信任 AI 生成的代码
- 仔细检查生成的代码
- 运行测试验证功能
- 根据项目规范调整

### 4. 成本控制
- 优先使用 DeepSeek
- 复杂任务才用 GPT-4
- 避免重复相同的问题
- 清除不需要的对话历史

## 🐛 常见问题

### Q: API Key 无效？
A: 检查是否正确复制，是否有多余的空格

### Q: 网络连接失败？
A:
- DeepSeek: 检查网络连接
- OpenAI: 可能需要配置代理

### Q: 回复速度慢？
A:
- 尝试切换到更快的模型
- 检查网络状况
- 减少对话历史长度

### Q: 回复质量不好？
A:
- 提供更详细的描述
- 尝试不同的模型
- 清除对话历史重新开始

### Q: 如何切换 AI 提供商？
A: 在设置中修改 `aiAssistant.provider`

## 📚 扩展位置

扩展源码位于: `extensions/deepseek/`

可以根据需要自定义修改。

## 🎉 开始使用

1. ✅ 编译 VS Code
2. ✅ 获取 API Key
3. ✅ 配置扩展
4. ✅ 开始编程！

**祝你编程愉快！** 🚀

---

## 📞 技术支持

遇到问题？
1. 查看输出面板的错误信息
2. 检查配置是否正确
3. 尝试重启 VS Code
4. 查看扩展 README 文档
