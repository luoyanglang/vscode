# GitHub Copilot 使用指南

本定制版 VS Code 已内置 GitHub Copilot 支持！

## 🎯 功能概览

### GitHub Copilot
- ✨ **代码自动补全** - 实时智能代码建议
- 🚀 **整行/整块代码生成** - 根据注释生成代码
- 🔄 **多种建议** - 提供多个代码选项
- 📝 **支持多种语言** - Python, JavaScript, TypeScript, Go, Ruby 等

### GitHub Copilot Chat
- 💬 **对话式编程** - 用自然语言提问
- 📖 **代码解释** - 解释复杂代码
- 🐛 **调试帮助** - 找出并修复 bug
- 🧪 **生成测试** - 自动生成单元测试
- 📚 **文档生成** - 生成代码文档

## 📦 安装步骤

### 1. 安装扩展

编译安装 VS Code 后，安装 Copilot 扩展：

**方法一：扩展市场**
1. 按 `Ctrl+Shift+X` 打开扩展面板
2. 搜索 "GitHub Copilot"
3. 安装以下两个扩展：
   - **GitHub Copilot** - 代码补全
   - **GitHub Copilot Chat** - 对话功能

**方法二：命令行**
```bash
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
```

### 2. 登录 GitHub

1. 安装完成后，右下角会提示登录
2. 点击 "Sign in to GitHub"
3. 在浏览器中授权
4. 返回 VS Code

### 3. 激活订阅

GitHub Copilot 需要订阅：
- 💰 **个人版**: $10/月 或 $100/年
- 🎓 **学生/教师**: 免费
- 🏢 **企业版**: $19/月/用户

访问：https://github.com/settings/copilot

## 🚀 使用方法

### 代码补全（Copilot）

#### 1. 自动建议
直接输入代码，Copilot 会自动显示灰色建议：
```python
# 输入注释，Copilot 会生成代码
def calculate_fibonacci(n):
    # 按 Tab 接受建议
```

#### 2. 查看多个建议
- `Alt+]` - 下一个建议
- `Alt+[` - 上一个建议
- `Tab` - 接受当前建议
- `Esc` - 拒绝建议

#### 3. 触发建议
- 输入代码时自动触发
- 或按 `Alt+\` 手动触发

### 对话功能（Copilot Chat）

#### 1. 打开 Chat 面板
- 按 `Ctrl+Shift+I` 打开侧边栏
- 或点击左侧活动栏的 Chat 图标

#### 2. 常用命令

**解释代码**
```
选中代码 → 右键 → Copilot → Explain This
或在 Chat 中输入: /explain
```

**修复代码**
```
选中代码 → 右键 → Copilot → Fix This
或在 Chat 中输入: /fix
```

**生成测试**
```
选中代码 → 右键 → Copilot → Generate Tests
或在 Chat 中输入: /tests
```

**优化代码**
```
在 Chat 中输入: 优化这段代码的性能
```

#### 3. Chat 快捷命令

| 命令 | 说明 |
|------|------|
| `/explain` | 解释选中的代码 |
| `/fix` | 修复代码问题 |
| `/tests` | 生成单元测试 |
| `/help` | 显示帮助信息 |
| `/clear` | 清除对话历史 |

#### 4. 内联 Chat
- 按 `Ctrl+I` 在编辑器中打开内联 Chat
- 直接在代码位置提问
- 生成的代码会直接插入

## 💡 使用技巧

### 1. 编写好的注释
```python
# 创建一个函数，接收用户列表，按年龄排序，返回前10个
# Copilot 会根据注释生成完整代码
```

### 2. 提供上下文
```typescript
// 已有的代码提供上下文
interface User {
  name: string;
  age: number;
}

// Copilot 会理解 User 类型
function sortUsers(users: User[]) {
  // 按 Tab 接受建议
}
```

### 3. 使用示例
```javascript
// 示例：
// const result = processData([1, 2, 3]);
// console.log(result); // [2, 4, 6]

// Copilot 会根据示例生成函数
function processData(data) {
  // 建议会出现在这里
}
```

### 4. Chat 提问技巧

**好的提问**：
- ✅ "如何在 TypeScript 中实现单例模式？"
- ✅ "这段代码有什么性能问题？"
- ✅ "为这个函数生成 Jest 测试用例"

**不好的提问**：
- ❌ "帮我"
- ❌ "代码"
- ❌ 太模糊的问题

## 🎨 快捷键总览

| 功能 | Windows/Linux | macOS |
|------|---------------|-------|
| 接受建议 | `Tab` | `Tab` |
| 拒绝建议 | `Esc` | `Esc` |
| 下一个建议 | `Alt+]` | `Option+]` |
| 上一个建议 | `Alt+[` | `Option+[` |
| 手动触发 | `Alt+\` | `Option+\` |
| 打开 Chat | `Ctrl+Shift+I` | `Cmd+Shift+I` |
| 内联 Chat | `Ctrl+I` | `Cmd+I` |

## ⚙️ 配置选项

打开设置 (`Ctrl+,`)，搜索 "Copilot"：

```json
{
  // 启用 Copilot
  "github.copilot.enable": {
    "*": true
  },

  // 内联建议
  "github.copilot.editor.enableAutoCompletions": true,

  // Chat 设置
  "github.copilot.chat.enabled": true,

  // 特定语言启用/禁用
  "github.copilot.enable": {
    "markdown": false,
    "plaintext": false
  }
}
```

## 🆚 Copilot vs 内置 AI 助手

本 VS Code 同时支持三种 AI：

| 功能 | GitHub Copilot | 内置 AI 助手 (DeepSeek/OpenAI) |
|------|----------------|-------------------------------|
| 代码补全 | ✅ 实时自动 | ❌ 需手动触发 |
| 对话功能 | ✅ Copilot Chat | ✅ 支持 |
| 代码解释 | ✅ | ✅ |
| 代码生成 | ✅ | ✅ |
| 费用 | $10/月 | 按使用量 |
| 网络要求 | 需要 | 需要 |
| 多语言支持 | ✅ | ✅ |

**建议**：
- 💰 **有预算** → 使用 GitHub Copilot（体验最好）
- 💡 **灵活使用** → 内置 AI 助手（按需付费）
- 🎯 **最佳方案** → 两者结合使用

## 🔒 隐私与安全

### Copilot 数据使用
- 代码片段会发送到 GitHub 服务器
- 用于生成建议
- 可以选择是否允许 GitHub 使用你的代码改进模型

### 配置隐私设置
```json
{
  // 不允许 GitHub 使用你的代码
  "github.copilot.advanced": {
    "debug.overrideEngine": "codex",
    "debug.testOverrideProxyUrl": "",
    "debug.overrideProxyUrl": ""
  }
}
```

访问隐私设置：https://github.com/settings/copilot

## 🐛 常见问题

### Q: Copilot 没有建议？
A:
1. 检查是否已登录 GitHub
2. 检查订阅是否有效
3. 检查网络连接
4. 尝试重启 VS Code

### Q: 建议质量不好？
A:
1. 提供更多上下文
2. 写更清晰的注释
3. 使用更标准的代码风格

### Q: 如何临时禁用？
A:
- 点击右下角状态栏的 Copilot 图标
- 选择 "Disable Completions"

### Q: 可以离线使用吗？
A: 不可以，Copilot 需要网络连接

### Q: 支持中文吗？
A: 支持！可以用中文注释和提问

## 📚 学习资源

- 官方文档：https://docs.github.com/copilot
- 快速入门：https://github.com/features/copilot
- 最佳实践：https://github.blog/tag/github-copilot/
- 视频教程：https://www.youtube.com/github

## 🎉 开始使用

1. ✅ 安装 Copilot 扩展
2. ✅ 登录 GitHub 账号
3. ✅ 激活订阅
4. ✅ 开始编码！

**提示**：学生和教师可以免费使用 GitHub Copilot！
访问：https://education.github.com/

---

**享受 AI 辅助编程的乐趣！** 🚀
