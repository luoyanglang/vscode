# Visual Studio Code - 开源版本 ("Code - OSS")
[![功能请求](https://img.shields.io/github/issues/microsoft/vscode/feature-request.svg)](https://github.com/microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3Afeature-request+sort%3Areactions-%2B1-desc)
[![Bug](https://img.shields.io/github/issues/microsoft/vscode/bug.svg)](https://github.com/microsoft/vscode/issues?utf8=✓&q=is%3Aissue+is%3Aopen+label%3Abug)
[![Gitter](https://img.shields.io/badge/chat-on%20gitter-yellow.svg)](https://gitter.im/Microsoft/vscode)

## 关于本仓库

本仓库（"`Code - OSS`"）是我们（微软）与社区一起开发 [Visual Studio Code](https://code.visualstudio.com) 产品的地方。我们不仅在这里处理代码和问题，还发布我们的[路线图](https://github.com/microsoft/vscode/wiki/Roadmap)、[月度迭代计划](https://github.com/microsoft/vscode/wiki/Iteration-Plans)和[发布计划](https://github.com/microsoft/vscode/wiki/Running-the-Endgame)。本源代码在标准的 [MIT 许可证](https://github.com/microsoft/vscode/blob/main/LICENSE.txt)下对所有人开放。

## Visual Studio Code

<p align="center">
  <img alt="VS Code 运行截图" src="https://user-images.githubusercontent.com/35271042/118224532-3842c400-b438-11eb-923d-a5f66fa6785a.png">
</p>

[Visual Studio Code](https://code.visualstudio.com) 是 `Code - OSS` 仓库的一个发行版，包含微软特定的定制功能，并在传统的[微软产品许可证](https://code.visualstudio.com/License/)下发布。

[Visual Studio Code](https://code.visualstudio.com) 结合了代码编辑器的简洁性和开发者在核心编辑-构建-调试循环中所需的功能。它提供全面的代码编辑、导航和理解支持，以及轻量级调试、丰富的扩展模型和与现有工具的轻量级集成。

Visual Studio Code 每月更新，提供新功能和错误修复。你可以在 [Visual Studio Code 官网](https://code.visualstudio.com/Download)下载 Windows、macOS 和 Linux 版本。要获取每日最新版本，请安装 [Insiders 版本](https://code.visualstudio.com/insiders)。

## 贡献

你可以通过多种方式参与本项目，例如：

* [提交 bug 和功能请求](https://github.com/microsoft/vscode/issues)，并帮助我们验证它们
* 审查[源代码更改](https://github.com/microsoft/vscode/pulls)
* 审查[文档](https://github.com/microsoft/vscode-docs)并为从错别字到新增内容的任何内容提交拉取请求

如果你有兴趣修复问题并直接为代码库做出贡献，请参阅文档[如何贡献](https://github.com/microsoft/vscode/wiki/How-to-Contribute)，其中涵盖以下内容：

* [如何从源代码构建和运行](https://github.com/microsoft/vscode/wiki/How-to-Contribute)
* [开发工作流程，包括调试和运行测试](https://github.com/microsoft/vscode/wiki/How-to-Contribute#debugging)
* [编码指南](https://github.com/microsoft/vscode/wiki/Coding-Guidelines)
* [提交拉取请求](https://github.com/microsoft/vscode/wiki/How-to-Contribute#pull-requests)
* [寻找要处理的问题](https://github.com/microsoft/vscode/wiki/How-to-Contribute#where-to-contribute)
* [为翻译做出贡献](https://aka.ms/vscodeloc)

## 反馈

* 在 [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode) 上提问
* [请求新功能](CONTRIBUTING.md)
* 为[热门功能请求](https://github.com/microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3Afeature-request+sort%3Areactions-%2B1-desc)投票
* [提交问题](https://github.com/microsoft/vscode/issues)
* 在 [GitHub Discussions](https://github.com/microsoft/vscode-discussions/discussions) 或 [Slack](https://aka.ms/vscode-dev-community) 上与扩展作者社区联系
* 关注 [@code](https://twitter.com/code) 并告诉我们你的想法！

请参阅我们的 [wiki](https://github.com/microsoft/vscode/wiki/Feedback-Channels) 以获取这些渠道的描述以及其他一些可用的社区驱动渠道的信息。

## 相关项目

VS Code 的许多核心组件和扩展都位于 GitHub 上的各自仓库中。例如，[node 调试适配器](https://github.com/microsoft/vscode-node-debug)和 [mono 调试适配器](https://github.com/microsoft/vscode-mono-debug)仓库是相互独立的。有关完整列表，请访问我们 [wiki](https://github.com/microsoft/vscode/wiki) 上的[相关项目](https://github.com/microsoft/vscode/wiki/Related-Projects)页面。

## 内置扩展

VS Code 包含一组位于 [extensions](extensions) 文件夹中的内置扩展，包括许多语言的语法和代码片段。为语言提供丰富语言支持（内联建议、转到定义）的扩展具有 `language-features` 后缀。例如，`json` 扩展为 `JSON` 提供着色，而 `json-language-features` 扩展为 `JSON` 提供丰富的语言支持。

## 开发容器

本仓库包含一个 Visual Studio Code 开发容器 / GitHub Codespaces 开发容器。

* 对于[开发容器](https://aka.ms/vscode-remote/download/containers)，使用 **Dev Containers: Clone Repository in Container Volume...** 命令，该命令会创建一个 Docker 卷以在 macOS 和 Windows 上获得更好的磁盘 I/O。
  * 如果你已经安装了 VS Code 和 Docker，也可以点击[这里](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/microsoft/vscode)开始。这将使 VS Code 在需要时自动安装开发容器扩展，将源代码克隆到容器卷中，并启动一个开发容器供使用。

* 对于 Codespaces，在 VS Code 中安装 [GitHub Codespaces](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) 扩展，并使用 **Codespaces: Create New Codespace** 命令。

Docker / Codespace 应至少具有 **4 核和 6 GB RAM（推荐 8 GB）**才能运行完整构建。有关更多信息，请参阅[开发容器 README](.devcontainer/README.md)。

## 行为准则

本项目采用了[微软开源行为准则](https://opensource.microsoft.com/codeofconduct/)。有关更多信息，请参阅[行为准则常见问题](https://opensource.microsoft.com/codeofconduct/faq/)或联系 [opencode@microsoft.com](mailto:opencode@microsoft.com) 提出任何其他问题或意见。

## 许可证

版权所有 (c) Microsoft Corporation。保留所有权利。

根据 [MIT](LICENSE.txt) 许可证授权。

---

## 🎯 本定制版特性

本版本基于 VS Code 开源代码进行了以下定制：

### ✨ 默认中文界面
- 开箱即用的中文界面
- 无需额外安装语言包

### 🤖 内置 AI 代码助手
- 支持 DeepSeek 和 OpenAI Codex
- 10+ 智能编程功能
- 详见 [AI助手集成说明.md](AI助手集成说明.md)

### 🚀 快速开始

1. **编译安装**
   ```bash
   npm install
   npm run compile
   ```

2. **配置 AI 助手**
   - 获取 API Key（DeepSeek 或 OpenAI）
   - 在设置中配置
   - 开始使用 AI 功能

3. **使用快捷键**
   - `Ctrl+Shift+A` - AI 对话
   - `Ctrl+Shift+E` - 解释代码
   - `Ctrl+Shift+G` - 生成代码

### 📚 文档

- [AI 助手使用指南](AI助手集成说明.md)
- [DeepSeek 集成说明](DeepSeek集成说明.md)
- [SSH 密钥配置](SSH密钥配置说明.md)

### 🔗 相关链接

- [原始仓库](https://github.com/microsoft/vscode)
- [本定制版](https://github.com/luoyanglang/vscode)
- [DeepSeek 平台](https://platform.deepseek.com/)
- [OpenAI 平台](https://platform.openai.com/)
