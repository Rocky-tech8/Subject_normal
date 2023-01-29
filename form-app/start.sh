# /bin/sh
IP="db"
PORT="3306"
WAITSET="10"
echo "Waiting 10 seconds..."
sleep 10
nc -vz ${IP} ${PORT} >> /dev/null
while :
do
    if [ "$?" = "0" ]; then
        echo "OK"
        break
    else
        echo "NG"
        echo "Waiting ${WAITSEC} seconds..."
        sleep ${WAITSEC}
        nc -vz ${IP} ${PORT}  >> /dev/null
    fi
done
echo "Start Application"
node /app/server/index.mjs