# /bin/bash

# Component Generator

# Arguments
SCRIPT_NAME=$0

# Get the directory of the script
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Change to that directory
cd "$SCRIPT_DIR"

# Verify the current directory
echo "Current working directory is now: $(pwd)"

WORK_DIR="../../src"

COMPONENT_NAME=$1
COMPONENTS_DIR="$WORK_DIR/components"

COMPONTENTS_INDEX="$COMPONENTS_DIR/index.ts"

TARGET_DIR="$COMPONENTS_DIR/$COMPONENT_NAME"
TARGET_FILE="$TARGET_DIR/$COMPONENT_NAME.tsx"
TARGET_INDEX="$TARGET_DIR/index.ts"

TEMPLATE_FILE="../../templates/components/base.template"

# Create target directory

#TODO: Check if target files already exist

mkdir "$TARGET_DIR"

generate_component() {
	sed "s/\${ComponentName}/${COMPONENT_NAME}/g" $TEMPLATE_FILE >>$TARGET_FILE
}

generate_component

echo "export {default as $COMPONENT_NAME} from './$COMPONENT_NAME'" >>$TARGET_INDEX

# Export from components/index.ts

echo "export { $COMPONENT_NAME } from './$COMPONENT_NAME' " >>$COMPONTENTS_INDEX
