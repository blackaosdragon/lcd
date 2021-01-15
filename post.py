import asyncio
import requests
import time
import datetime
import sys

url_local = 'https://instrumentacionline.ddns.net:5002/tomardata'

async def main():
    try :
        peticion = requests.get('https://instrumentacionline.ddns.net:5002/tomardata')
        print(peticion)
        """
    except Exception:
        #e.sys.exc_info()[1]
        print("Ocurrio un error")
    """
    time.sleep(1)
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


"""
while True:
    obtener_tiempo()
    time.sleep(1)
"""
while True:
    asyncio.run(main())






