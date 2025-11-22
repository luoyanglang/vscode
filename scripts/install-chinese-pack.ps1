# 安装中文语言包（简化版）
Write-Host "正在安装中文语言包..."

# 扩展目录
$userProfile = $env:USERPROFILE
$extensionsDir = "$userProfile\.vscode-oss\extensions\ms-ceintl.vscode-language-pack-zh-hans-1.85.0"

# 创建扩展目录
New-Item -ItemType Directory -Force -Path $extensionsDir | Out-Null

# 创建 package.json
$packageJson = @"
{
  "name": "vscode-language-pack-zh-hans",
  "displayName": "Chinese (Simplified) Language Pack for Visual Studio Code",
  "description": "Language pack extension for Chinese (Simplified)",
  "version": "1.85.0",
  "publisher": "MS-CEINTL",
  "engines": {
    "vscode": "^1.85.0"
  },
  "contributes": {
    "localizations": [{
      "languageId": "zh-cn",
      "languageName": "Chinese (Simplified)",
      "localizedLanguageName": "中文(简体)",
      "translations": [{
        "id": "vscode",
        "path": "./translations/main.i18n.json"
      }]
    }]
  }
}
"@

$packageJson | Out-File -FilePath "$extensionsDir\package.json" -Encoding UTF8

# 创建翻译目录
$translationsDir = "$extensionsDir\translations"
New-Item -ItemType Directory -Force -Path $translationsDir | Out-Null

# 创建基础翻译文件
$translations = @"
{
  "version": "1.0.0",
  "contents": {
    "vs/workbench/contrib/welcome/page/browser/welcomePage": {
      "welcomePage.title": "欢迎",
      "welcomePage.openFolder": "打开文件夹...",
      "welcomePage.openFile": "打开文件..."
    }
  }
}
"@

$translations | Out-File -FilePath "$translationsDir\main.i18n.json" -Encoding UTF8

Write-Host "安装完成！"
Write-Host ""
Write-Host "下一步："
Write-Host "1. 重启 VS Code"
Write-Host "2. 按 Ctrl+Shift+P"
Write-Host "3. 输入 'Configure Display Language'"
Write-Host "4. 选择 '中文(简体)'"
Write-Host "5. 再次重启"
Write-Host ""
Write-Host "扩展已安装到: $extensionsDir"
