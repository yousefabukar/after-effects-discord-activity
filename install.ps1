$projectDir = $PSScriptRoot -replace '\\', '\\\\'

$jsx = @"
(function () {
  var projectDir = "$projectDir";
  var vbs = projectDir + "\\\\launch-hidden.vbs";
  var script = projectDir + "\\\\src\\\\index.js";
  system.callSystem('wscript "' + vbs + '" "' + script + '"');
}());
"@

$ae = Get-ChildItem "C:\Program Files\Adobe" -Directory |
      Where-Object { $_.Name -like "Adobe After Effects*" } |
      Sort-Object Name -Descending |
      Select-Object -First 1

if (-not $ae) {
    Write-Error "After Effects installation not found."
    exit 1
}

$startupDir = Join-Path $ae.FullName "Support Files\Scripts\Startup"
$jsx | Out-File (Join-Path $startupDir "discord-presence.jsx") -Encoding utf8 -NoNewline

Write-Host "Installed to: $startupDir"
Write-Host "Restart After Effects to activate."
