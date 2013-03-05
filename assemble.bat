if exist "C:\Program Files\7-Zip\7z.exe" (
	"C:\Program Files\7-Zip\7z.exe" a FireRecord.zip chrome defaults chrome.manifest install.rdf
) else (
	"C:\Program Files (x86)\7-Zip\7z.exe" a FireRecord.zip chrome defaults chrome.manifest install.rdf
)
move FireRecord.zip FireRecord.xpi
start "C:\Program Files (x86)\Mozilla Firefox\firefox.exe" FireRecord.xpi