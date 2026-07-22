Add-Type -TypeDefinition @'
using System;
using System.Text;
using System.Runtime.InteropServices;
public class AEDetect {
    [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc cb, IntPtr lp);
    [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr h, StringBuilder s, int n);
    [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr h);
    public delegate bool EnumWindowsProc(IntPtr h, IntPtr lp);

    public static string FindWindow() {
        string found = null;
        EnumWindows((hwnd, lp) => {
            if (!IsWindowVisible(hwnd)) return true;
            var sb = new StringBuilder(1024);
            GetWindowText(hwnd, sb, 1024);
            var t = sb.ToString();
            if (t.Contains("After Effects")) { found = t; return false; }
            return true;
        }, IntPtr.Zero);
        return found;
    }
}
'@ -Language CSharp

$t = [AEDetect]::FindWindow()
if ($t) { Write-Output $t }
