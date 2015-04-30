#!/bin/sh
DESTINATION="./src/_site/zip"
SOURCE="./psd"
PREFIX="psd"

echo -n "Creating clean folder: $DESTINATION"
rm -rf ${DESTINATION}
mkdir ${DESTINATION}
echo "   ...DONE"

find ./psd/ -mindepth 1 -maxdepth 1 -not -path '*/\.*' -type d | while read DIR
do
    echo -n "Compressing $DIR
"
    DIR_NAME=${DIR##*/}
    zip -r "$DESTINATION/${PREFIX}_${DIR_NAME}.zip" "${DIR}"
    echo ""
done