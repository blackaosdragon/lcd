
import requests
try :
    peticion = requests.get('https://github.com/timeline.json')
except error:
    print "Ocurrio un error"

print peticion