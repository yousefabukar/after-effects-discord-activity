# After Effects Discord Extension

Discord Rich Presence for Adobe After Effects. Shows your current project, version, and elapsed time in your Discord status.

## Usage

```
npm install
install.bat
```

`install.bat` detects your AE installation and drops a startup script into it — After Effects will launch the presence automatically every time it opens. Requires admin prompt (to write into Program Files).

To run manually instead:

```
node src/index.js
```
