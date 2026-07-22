Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "node """ & WScript.Arguments(0) & """", 0, False
