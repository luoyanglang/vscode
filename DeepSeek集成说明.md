# DeepSeek AI 集成说明

已成功为 VS Code 添加 DeepSeek AI 支持！

## 功能特性

✅ **智能对话** - 与 DeepSeek AI 进行自然语言对话
✅ **代码解释** - 详细解释选中代码的功能和实现
✅ **代码生成** - 根据描述自动生成代码
✅ **代码优化** - 智能优化代码性能和可读性

## 使用步骤

### 1. 获取 DeepSeek API Key

访问 [DeepSeek 平台](https://platform.deepseek.com/) 注册并获取 API Key

### 2. 配置 API Key

编译安装 VS Code 后，打开设置：

**方法一：通过 UI 设置**
1. 按 `Ctrl+,` 打开设置
2. 搜索 "DeepSeek"
3. 填入你的 API Key

**方法二：通过 settings.json**
```json
{
  "deepseek.apiKey": "sk-xxxxxxxxxxxxxxxx",
  "deepseek.model": "deepseek-chat",
  "deepseek.enabled": true
}
```

### 3. 使用功能

#### 开始对话
- 快捷键: `Ctrl+Shift+D` (Mac: `Cmd+Shift+D`)
- 或命令面板: `DeepSeek: 开始对话`

#### 解释代码
1. 选中要解释的代码
2. 右键菜单 → `DeepSeek: 解释代码`
3. 在输出面板查看详细解释

#### 生成代码
1. 命令面板 → `DeepSeek: 生成代码`
2. 输入代码描述
3. 代码将插入到当前光标位置

#### 优化代码
1. 选中要优化的代码
2. 右键菜单 → `DeepSeek: 优化代码`
3. 在输出面板查看优化建议

## 配置选项

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `deepseek.apiKey` | DeepSeek API Key | (空) |
| `deepseek.apiEndpoint` | API 端点地址 | https://api.deepseek.com/v1 |
| `deepseek.model` | 使用的模型 | deepseek-chat |
| `deepseek.enabled` | 启用/禁用扩展 | true |

## 支持的模型

- **deepseek-chat**: 通用对话模型，适合日常问答
- **deepseek-coder**: 专业代码模型，更适合编程任务

## 快捷键

| 功能 | Windows/Linux | macOS |
|------|---------------|-------|
| 开始对话 | `Ctrl+Shift+D` | `Cmd+Shift+D` |

## 注意事项

1. 需要有效的 DeepSeek API Key 才能使用
2. 使用 API 会产生费用，请查看 DeepSeek 定价
3. 首次使用需要配置 API Key
4. 网络连接需要能访问 DeepSeek API

## 扩展位置

扩展源码位于: `extensions/deepseek/`

## 下一步

编译完成后，DeepSeek 扩展将作为内置扩展自动启用。配置好 API Key 后即可使用！
