# 简单方法：直接设置中文
Write-Host "正在配置中文界面..."

$userDataDir = "$env:APPDATA\Code - OSS\User"
New-Item -ItemType Directory -Force -Path $userDataDir | Out-Null

$localeFile = "$userDataDir\locale.json"
$localeContent = @"
{
    "locale": "zh-cn"
}
"@

$localeContent | Out-File -FilePath $localeFile -Encoding UTF8 -Force

Write-Host "配置完成！"
Write-Host "请重启 VS Code 即可看到中文界面。"
Write-Host ""
Write-Host "注意：部分界面可能仍显示英文，这是因为没有完整的语言包。"
Write-Host "配置文件位置: $localeFile"
