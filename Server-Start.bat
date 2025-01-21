SET "BASE_DIR=%~dp0"

cd /d "%BASE_DIR%"

IF NOT EXIST "cascina-caccia-0.0.1-SNAPSHOT.jar" (
    echo ERROR: JAR file not found in the target directory!
    pause
    exit /b 1
)

java -jar cascina-caccia-0.0.1-SNAPSHOT.jar
