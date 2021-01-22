import sys
import time
import glob

data = 10.5

#print(data)
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