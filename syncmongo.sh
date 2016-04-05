#!/bin/bash

HOST="ds015869.mlab.com"
PORT="15869"
REMOTE_DB="heroku_gcvj3qm4"
LOCAL_DB="hellosleep"
USER="heroku_gcvj3qm4"
PASS="uu72dfv9q9bv4gou7i9mr4vbr2"

## DUMP THE REMOTE DB
echo "Dumping '$HOST:$PORT/$REMOTE_DB'..."
mongodump --host $HOST:$PORT --db $REMOTE_DB -u $USER -p $PASS

## RESTORE DUMP DIRECTORY
echo "Restoring to '$LOCAL_DB'..."
mongorestore --db $LOCAL_DB --drop dump/$REMOTE_DB

## REMOVE DUMP FILES
echo "Removing dump files..."
rm -r dump

echo "Done."
