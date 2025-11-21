# SSH 密钥配置说明

## 你的 SSH 公钥

```
```

## 添加到 GitHub 的步骤

1. 复制上面的公钥（整行）
2. 访问：https://github.com/settings/keys
3. 点击 "New SSH key"
4. Title 填写：`Windows PC`
5. Key 粘贴上面的公钥
6. 点击 "Add SSH key"

## 完成后运行

添加完成后，在终端运行以下命令推送代码：

```bash
git remote set-url origin git@github.com:luoyanglang/vscode.git
git push -u origin main
```
