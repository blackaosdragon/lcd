import I2C_LCD_driver 
from time import *

mylcd = I2C_LCD_driver.lcd()

signalData = [
    [0x00,0x01,0x01,0x03,0x03,0x07,0x0F,0x1F]
]
waitData = [  0x00,  0x00,  0x00,  0x00,  0x00,  0x00,  0x00,  0x15]

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

mylcd.lcd_load_custom_chars(signalData)
mylcd.lcd_display_string_pos(unichr(0),1,18)
#mylcd.lcd_display_string("")

#********************
#******iniciando*****
#********...*********