import asyncio
import requests
import time
import datetime

url_local = 'https://instrumentacionline.ddns.net:5002/tomardata'

async def main():
    try :
        peticion = requests.get(url_local)
        print(peticion)
    except:
        print("Ocurrio un error")

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






