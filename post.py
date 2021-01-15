import asyncio
import requests
from datetime import datetime, date, time, timedelta
import calendar

async def main():
    try :
        peticion = requests.get('https://github.com/timeline.json')
        print(peticion)
    except:
        print("Ocurrio un error")
def obtener_tiempo():
    reloj = datetime.now()
    hora = reloj.hour
    minuto = reloj.minute
    segundo = reloj.second
    
    if hora<0:
        hora = hora + 16
    else:
        hora = hora - 6
    print('Hora actual %d:%d '%(hora,minuto))
while True:
    obtener_tiempo()
    time.sleep(1)
asyncio.run(main())





