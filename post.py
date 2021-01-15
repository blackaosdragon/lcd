import asyncio
import requests

async def main():
    try :
        peticion = requests.get('https://github.com/timeline.json')
        print(peticion)
    except:
        print("Ocurrio un error")
asyncio.run(main())
