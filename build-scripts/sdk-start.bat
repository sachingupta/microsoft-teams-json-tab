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

ECHO linking teams sdk...

CALL :link

ECHO done
ECHO.

CALL :ngrok

CALL :serve

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

:: installs

:serve-install
    CALL :installer serve
    EXIT /b

:ngrok-install
    CALL :installer ngrok
    EXIT /b

ECHO something went wrong... ):
PAUSE >NUL