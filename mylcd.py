#import asyncio
#import RPi.GPIO as GPIO
import syslog
import requests
import os
import glob
import textwrap
import time
import I2C_LCD_driver 
from time import *

from datetime import datetime, date, time, timedelta
import calendar

mylcd = I2C_LCD_driver.lcd()
url = 'https://instrumentacionline.ddns.net/raspbi'
url_local = 'https://instrumentacionline.ddns.net:5002/raspbi'

#GPIO.setmode(GPIO.BOARD)
#GPIO.setup(11,GPIO.OUT)
#import wifistatus

#intentalo = wifistatus

#data=intentalo.main()



"""
mylcd.lcd_display_string("Iniciando ",2,6)
sleep(1)
mylcd.lcd_display_string(".",3,9)
sleep(1)
mylcd.lcd_display_string(".",3,10)
sleep(1)
mylcd.lcd_display_string(".",3,11)
sleep(1)
mylcd.lcd_display_string(" ",3,9)
sleep(1)
mylcd.lcd_display_string(" ",3,10)
sleep(1)
mylcd.lcd_display_string(" ",3,11)
sleep(1)
mylcd.lcd_display_string(".",3,9)
sleep(1)
mylcd.lcd_display_string(".",3,10)
sleep(1)
mylcd.lcd_display_string(".",3,11)

sleep(1)

mylcd.lcd_clear()

#mylcd.lcd_load_custom_chars(signalData)
#mylcd.lcd_display_string("")
#mylcd.lcd_display_string(unichr(0),1,18)
#mylcd.lcd_display_string("")


#********************
#******iniciando*****
#********...*********


#calculando las distancias 
#COmienza el modulo Ultrasonico

#fDistancia = (iTiempo * 300 ) / 2 


base_dir = 'sys/bus/w1/devices'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'

def temp_sensor():
    f = open()

while True:
    temperatura 

#os.system('modprobe w1-gpio')
#os.system('modprobe w1-therm')
""" 

base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'
 
def read_temp_raw():
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines
 
def read_temp():
    lines = read_temp_raw()
    data = lines[1].find('t=')
    data_string = lines[1][data+2:]
    celcius = float(data_string) / 1000.0
    #print(celcius)
    return celcius
    """
    #print(data_string)
    while lines[0].strip()[-3:] != 'YES':
        sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    #print(lines)
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        #temp_f = temp_c * 9.0 / 5.0 + 32.0
        return temp_c
	"""
while True:
    temperatura = read_temp()
    print temperatura
    import wifistatus
    ahora = datetime.now()
    hora = ahora.hour
    minuto = ahora.minute
    segundo = ahora.second

    #print("Horas: ",ahora.hour)
    #print("Minutos: ",ahora.minute)
    #print("Segundos: ",ahora.second)
    
    if segundo%2==0:
        if hora<10:
            mylcd.lcd_display_string("0%d"%hora,1,1)
        else:
            mylcd.lcd_display_string("%d"%hora,1,1)            
        #mylcd.lcd_display_string(" %d"%hora,1,1)
        mylcd.lcd_display_string(":",1,3)
        if minuto<10:
            mylcd.lcd_display_string("0%d "%minuto,1,4)
        else:
            mylcd.lcd_display_string("%d"%minuto,1,4)
        #mylcd.lcd_display_string("%d "%minuto,1,4)
    else:
        if hora<10:
            mylcd.lcd_display_string("0%d"%hora,1,1)
        else:
            mylcd.lcd_display_string("%d"%hora,1,1)            
        #mylcd.lcd_display_string(" %d"%hora,1,1)
        mylcd.lcd_display_string(" ",1,3)
        if minuto<10:
            mylcd.lcd_display_string("0%d "%minuto,1,4)
        else:
            mylcd.lcd_display_string("%d"%minuto,1,4)
        #mylcd.lcd_display_string("%d "%minuto,1,4)
        #mylcd.lcd_display_string(" %d"%hora,1,1)
        #mylcd.lcd_display_string(" ",1,3)
        #mylcd.lcd_display_string("%d "%minuto,1,4)    
    
    mylcd.lcd_display_string(unichr(10), 1,19)
    mylcd.lcd_display_string("Temp: ",3,0)
    mylcd.lcd_display_string("%.3f"%temperatura,3,6)
    mylcd.lcd_display_string(unichr(0), 3,12)
    mylcd.lcd_display_string("C ",3,13)
    """
    if temperatura>30:
        GPIO.output(11,True)
    elif temperatura<25:
        GPIO.output(11,False)
    else:
        print("")
    """ 
        
    obj = {
        'id': 3,
        'temperatura': temperatura
    }
    """
    async def enviar():
        try:
            x = requests.post(url_local,data=obj,verify=False)
            print(x.text)
        except:
            print("exepcion ocurrida")
        else:
            print("Error, seguira")
    """
sleep(1)

"""async def main():
    print "Alo"
    await asyncio.sleep(2)
    print "Polecia"
asyncio.run(main())
"""