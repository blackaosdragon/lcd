import os
import glob
import textwrap
import time
import I2C_LCD_driver 
from time import *

mylcd = I2C_LCD_driver.lcd()

otros = [
    [0x00, 0x01, 0x01, 0x03, 0x03, 0x07, 0x0F, 0x1F],
    [0x01, 0x01, 0x03, 0x03, 0x07, 0x07, 0x0F, 0x1F],
    [0x00, 0x0C, 0x12, 0x12, 0x0C, 0x00, 0x00, 0x00]
]

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
    while lines[0].strip()[-3:] != 'YES':
        sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        #temp_f = temp_c * 9.0 / 5.0 + 32.0
        return temp_c
	
while True:
    import wifistatus
    
    mylcd.lcd_display_string("Temp: ",3,0)
    mylcd.lcd_display_string("%.2f"%read_temp(),3,6)
    mylcd.lcd_display_string(unichr(5), 3,11)
    mylcd.lcd_display_string("C",3,12)
sleep(1)