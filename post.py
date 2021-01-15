import asyncio
import requests
import time
import datetime

async def main():
    try :
        peticion = requests.get('https://github.com/timeline.json')
        print(peticion)
    except:
        print("Ocurrio un error")
def obtener_tiempo():
    reloj = datetime.datetime.now()
    hora = reloj.hour
    minuto = reloj.minute
    segundo = reloj.second
    
    """
    if hora<0:
        hora = hora + 16
    else:
        hora = hora - 6
    """
    print('%d:%d'%(hora,minuto))



while True:
    obtener_tiempo()
    time.sleep(1)
while True:
    asyncio.run(main())






