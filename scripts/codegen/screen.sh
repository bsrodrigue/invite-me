# /bin/bash

# Screen Generator

# Arguments
SCRIPT_NAME=$0

# Get the directory of the script
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Change to that directory
cd "$SCRIPT_DIR"

WORK_DIR="../../src"

SCREEN_NAME="$1Screen"
SCREEN_NAME_PREFIX="$1"
SCREENS_DIR="$WORK_DIR/screens"

COMPONTENTS_INDEX="$SCREENS_DIR/index.ts"

TARGET_DIR="$SCREENS_DIR/$SCREEN_NAME"
TARGET_FILE="$TARGET_DIR/$SCREEN_NAME.tsx"
TARGET_INDEX="$TARGET_DIR/index.ts"

TEMPLATE_FILE="../../templates/screens/base.template"

# Check

if [[ -z "$SCREEN_NAME" ]]; then
	echo "[ERROR]: Please provide a screen name"
	exit 1
fi

# Create target directory

#TODO: Check if target files already exist

mkdir "$TARGET_DIR"

generate_component() {
	sed "s/\${ScreenName}/${SCREEN_NAME}/g" $TEMPLATE_FILE >>$TARGET_FILE
	sed -i "s/\${ScreenNamePrefix}/${SCREEN_NAME_PREFIX}/g" $TARGET_FILE
}

generate_component

echo "export {default as $SCREEN_NAME} from './$SCREEN_NAME'" >>$TARGET_INDEX

# Export from components/index.ts

echo "export { $SCREEN_NAME } from './$SCREEN_NAME' " >>$COMPONTENTS_INDEX
