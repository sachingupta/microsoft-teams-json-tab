@ECHO OFF

TITLE sdk starter

ECHO starting build with sdk...

SETLOCAL
CD /d %~dp0

CD ..

ECHO.
ECHO.

ECHO checking dependencies...

CALL :check_req serve serve-install
CALL :check_req ngrok ngrok-install

ECHO done
ECHO.

REM CALL :link

CALL :yarn

CALL :ngrok

CALL :serve

ECHO.
ECHO done...

PAUSE >NUL

EXIT /b

:: subroutines

:installer 
    ECHO installing %1
    npm install -g %1
    ECHO done!

:check_req
    SET "MISSING_REQUIREMENT=true"
    ECHO testing %1...
    
    WHERE %1 > NUL 2>&1 && SET "MISSING_REQUIREMENT=false"
    IF "%MISSING_REQUIREMENT%"=="true" (
        ECHO %1 not found...
        ECHO installing %1
        GOTO %2
    )
    EXIT /b


:: runnables

:link
    ECHO.
    ECHO linking dependencies
    START /B yarn link "@microsoft/teams-js"
    EXIT /b

:serve
    ECHO.
    ECHO starting serve...
    START serve -s build
    EXIT /b

:ngrok
	ECHO.
	ECHO starting local ngrok tunnel...
	START ngrok http 5000 --host-header=localhost
	EXIT /b

:yarn
	ECHO.
	ECHO building project
	ECHO.
	ECHO. 
	ECHO !!!!CLOSE BUILD WINDOW AND PRESS n WHEN BUILD IS COMPLETE!!!!
	START /W yarn build
	EXIT /b
:: installs

:serve-install
    CALL :installer serve
    EXIT /b

:ngrok-install
    CALL :installer ngrok
    EXIT /b
	
:run-task-if-not-running
	ECHO.
	ECHO checking if %1 is alreay running
	tasklist /FI "%IMAGENAME% eq %1.exe" 2>NUL | find /I /N "%1.exe">NUL
	IF "%ERRORLEVEL%"=="0" (
		GOTO %1
	)
	ECHO an instance of %1 is already running...
	EXIT /b
	
ECHO something went wrong... ):
PAUSE >NUL