
import requests
try :
    peticion = requests.get('https://github.com/timeline.json')
    print peticion
except:
    print "Ocurrio un error"

