#!/usr/bin/env bash

# Exit on error
set -e

# Constants
CONTRACTS_FOLDER="../contracts"
TARGET_ABI_FILE="./src/abi.ts"

# Move into contracts package and install dependencies
cd $CONTRACTS_FOLDER

yarn --ignore-scripts && yarn build

# Move back to artifacts package
cd - > /dev/null

# Wipe the destination file
echo "// NOTE: Do not edit this file. It is generated automatically." > $TARGET_ABI_FILE

# Extract the abi field and create a TS file
CONTRACT_ARTIFACTS=$(ls \
    $CONTRACTS_FOLDER/artifacts/src/core/*/*/*.json \
    $CONTRACTS_FOLDER/artifacts/src/framework/*/*/*.json \
    $CONTRACTS_FOLDER/artifacts/src/framework/*/*/*/*.json \
    | grep -v ".dbg." \
    | grep -v utils
)
for FILE in $CONTRACT_ARTIFACTS
do
    SRC_FILE_NAME=$(basename $FILE)

    # Backwards compatible exports with abi and bytecode
    ABI=$(node -e "console.log(JSON.stringify(JSON.parse(fs.readFileSync('$FILE').toString()).abi))")
    BYTECODE=$(node -e "console.log(JSON.parse(fs.readFileSync('$FILE').toString()).bytecode || '')")
    CONTRACT_NAME=${SRC_FILE_NAME%".json"}

    echo "export const ${CONTRACT_NAME}ABI = $ABI as const;" >> $TARGET_ABI_FILE

    if [ "$BYTECODE" == "0x" -o "$BYTECODE" == "" ]; then
        echo "const ${CONTRACT_NAME}Bytecode = null;" >> $TARGET_ABI_FILE
    else
        echo "const ${CONTRACT_NAME}Bytecode = \"$BYTECODE\";" >> $TARGET_ABI_FILE
    fi

    echo "
export class ${CONTRACT_NAME} {
  /** @deprecated Use \`${CONTRACT_NAME}ABI\` instead. */
  static get abi() {
    console.warn('Warning: \`${CONTRACT_NAME}.abi\` is deprecated. Use \`${CONTRACT_NAME}ABI\` instead.');
    return ${CONTRACT_NAME}ABI;
  }

  /** @deprecated Use the bytecode deployed on the target network. See addresses.json */
  static get bytecode(): \`0x\${string}\` | null {
    console.warn('Warning: \`${CONTRACT_NAME}.bytecode\` is deprecated and may be removed in future versions.');
    return ${CONTRACT_NAME}Bytecode;
  }
}

" >> $TARGET_ABI_FILE

    echo "" >> $TARGET_ABI_FILE
done

# Common interfaces JSON ABI
EXTRA_CONTRACT_ABI_FILES=$(ls \
    $CONTRACTS_FOLDER/artifacts/@aragon/osx-commons-contracts/src/dao/*.sol/*.json \
    $CONTRACTS_FOLDER/artifacts/@aragon/osx-commons-contracts/src/executors/*.sol/*.json \
    $CONTRACTS_FOLDER/artifacts/@aragon/osx-commons-contracts/src/permission/*/*.sol/*.json \
    $CONTRACTS_FOLDER/artifacts/@aragon/osx-commons-contracts/src/plugin/*.sol/*.json \
    $CONTRACTS_FOLDER/artifacts/@aragon/osx-commons-contracts/src/plugin/setup/*.sol/*.json \
    $CONTRACTS_FOLDER/artifacts/@aragon/osx-commons-contracts/src/utils/versioning/*.sol/*.json \
    | grep -v ".dbg."
)

# Shipping the common interfaces as well
for FILE in $EXTRA_CONTRACT_ABI_FILES
do
    SRC_FILE_NAME=$(basename $FILE)

    ABI=$(node -e "console.log(JSON.stringify(JSON.parse(fs.readFileSync('$FILE').toString()).abi))")
    BYTECODE=$(node -e "console.log(JSON.parse(fs.readFileSync('$FILE').toString()).bytecode || '')")
    CONTRACT_NAME=${SRC_FILE_NAME%".json"}

    echo "export const ${CONTRACT_NAME}ABI = $ABI as const;" >> $TARGET_ABI_FILE

    if [ "$BYTECODE" == "0x" -o "$BYTECODE" == "" ]; then
        echo "const ${CONTRACT_NAME}Bytecode = null;" >> $TARGET_ABI_FILE
    else
        echo "const ${CONTRACT_NAME}Bytecode = \"$BYTECODE\";" >> $TARGET_ABI_FILE
    fi

    echo "
export class ${CONTRACT_NAME} {
  /** @deprecated Use \`${CONTRACT_NAME}ABI\` instead. */
  static get abi() {
    console.warn('Warning: \`${CONTRACT_NAME}.abi\` is deprecated. Use \`${CONTRACT_NAME}ABI\` instead.');
    return ${CONTRACT_NAME}ABI;
  }

  /** @deprecated Use the bytecode deployed on the target network. See addresses.json */
  static get bytecode(): \`0x\${string}\` | null {
    console.warn('Warning: \`${CONTRACT_NAME}.bytecode\` is deprecated and may be removed in future versions.');
    return ${CONTRACT_NAME}Bytecode;
  }
}

" >> $TARGET_ABI_FILE

    echo "" >> $TARGET_ABI_FILE
done

echo "ABI prepared: $TARGET_ABI_FILE"
