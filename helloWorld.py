#from smbus import SM
#print("Hello world")
import I2C_LCD_driver 
from time import *

mylcd = I2C_LCD_driver()

mylcd.lcd_display_string("Hola mundo!",1)
