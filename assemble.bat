if exist "C:\Program Files\7-Zip\7z.exe" (
	"C:\Program Files\7-Zip\7z.exe" a FireRecord.zip chrome defaults locale skin chrome.manifest install.rdf .project
) else if exist "C:\Program Files (x86)\7-Zip\7z.exe" (
	"C:\Program Files (x86)\7-Zip\7z.exe" a FireRecord.zip chrome defaults locale skin chrome.manifest install.rdf .project
) else (
	"C:\Program Files\WinRAR\rar.exe" a FireRecord.zip chrome defaults locale skin chrome.manifest install.rdf .project
)
move FireRecord.zip FireRecord.xpi
if exist "C:\Program Files (x86)\Mozilla Firefox\firefox.exe" (
	start "C:\Program Files (x86)\Mozilla Firefox\firefox.exe" FireRecord.xpi
) else (
	start FireRecord.xpi
)
