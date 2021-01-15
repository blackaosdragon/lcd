import asyncio
import requests
import time

async def main():
    try :
        peticion = requests.get('https://github.com/timeline.json')
        print(peticion)
    except:
        print("Ocurrio un error")
asyncio.run(main())

def obtener_tiempo():
    localtime = time.localtime(time.time())
    print("Hora actual: ",localtime)
obtener_tiempo()


