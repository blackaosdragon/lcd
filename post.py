import asyncio
import requests
import time
import datetime
import sys



async def main():
    try :
        peticion = requests.get('https://instrumentacionline.ddns.net:5002/tomardata')
        print(peticion)

def obtener_tiempo():
    reloj = datetime.datetime.now()
    hora = reloj.hour
    minuto = reloj.minute
    segundo = reloj.second
    
    if hora<0:
        hora = hora + 16
    else:
        hora = hora - 6
    print('%d:%d'%(hora,minuto))



while True:
    asyncio.run(main())
    time.sleep(1)






