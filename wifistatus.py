import sys 
import subprocess
import I2C_LCD_driver 
from time import *

interface = "wlan0"
lcd = I2C_LCD_driver.lcd()
signalData = [
    [0x01,  0x01,  0x01,  0x03,  0x03,  0x07,  0x0F,  0x1F],
    [0x00,  0x01,  0x01,  0x03,  0x03,  0x07,  0x0F,  0x1F],
    [0x00,  0x00,  0x00,  0x00,  0x02,  0x02,  0x06,  0x0E], #terminan las antenas
    [0x00,  0x00,  0x00,  0x00,  0x00,  0x00,  0x04,  0x0C],
    [0x0C,  0x12,  0x12,  0x12,  0x0C,  0x00,  0x00,  0x00],
    [0x06,  0x09,  0x09,  0x09,  0x06,  0x00,  0x00,  0x00],
    [0x0E,  0x11,  0x11,  0x11,  0x0E,  0x00,  0x00,  0x00],
    [0x0A,  0x1F,  0x11,  0x11,  0x1F,  0x1F,  0x1F,  0x1F],
    [0x0A,  0x1F,  0x11,  0x1F,  0x1F,  0x1F,  0x1F,  0x1F],
    [0x00,  0x0A,  0x0A,  0x1F,  0x0E,  0x04,  0x04,  0x04], #enchufe

]

def get_name(cell):
    return matching_line(cell,"ESSID")[1:-1]

def get_calidad(cell):
    lcd.lcd_load_custom_chars(signalData)
    quality = matching_line(cell,"Quality=").split()[0].split('/')
    #quality = matching_line(cell,"Quality=")     .split()[0].split('/')
    valor = int(round(float(quality[0]) / float(quality[1]) * 100))
    
    if valor==100:
        lcd.lcd_display_string(unichr(2), 1, 17)
    elif valor>=90 and valor<100:
        lcd.lcd_display_string(unichr(1), 1, 17)
    elif valor>=70 and valor<90:
        lcd.lcd_display_string(unichr(2), 1, 17)
    elif valor>=30 and valor<70:
        lcd.lcd_display_string(unichr(3), 1, 17)
    elif valor<30:
        lcd.lcd_display_string(unichr(4), 1, 17)
    else:
        print valor
    """                
    if valor==100:
        lcd.lcd_display_string("%d"%valor,1,16)
        lcd.lcd_display_string("%",1,19)
    else:
        lcd.lcd_display_string("%d"%valor,1,15)
        lcd.lcd_display_string("%",1,19)
    
    sleep(.2)
    """
    return str(int(round(float(quality[0]) / float(quality[1]) * 100))).rjust(3) + "%"

rules = {
    "Name": get_name,
    "Quality": get_calidad
}

def sort_cells(cells):
    sortby = "Quality"
    reverse = True
    cells.sort(None, lambda el:el[sortby],reverse)

columns = ["Quality","Name"]

# Below here goes the boring stuff. You shouldn't have to edit anything below
# this point

def matching_line(lines, keyword):
    """Returns the first matching line in a list of lines. See match()"""
    for line in lines:
        matching=match(line,keyword)
        if matching!=None:
            return matching
    return None

def match(line,keyword):
    """If the first part of line (modulo blanks) matches keyword,
    returns the end of that line. Otherwise returns None"""
    line=line.lstrip()
    length=len(keyword)
    if line[:length] == keyword:
        return line[length:]
    else:
        return None

def parse_cell(cell):
    """Applies the rules to the bunch of text describing a cell and returns the
    corresponding dictionary"""
    parsed_cell={}
    for key in rules:
        rule=rules[key]
        parsed_cell.update({key:rule(cell)})
    return parsed_cell

def print_table(table):
    widths=map(max,map(lambda l:map(len,l),zip(*table))) #functional magic

    justified_table = []
    for line in table:
        justified_line=[]
        for i,el in enumerate(line):
            print(justified_line.append(el.ljust(widths[i]+2)))
        justified_table.append(justified_line)
    
    for line in justified_table:
        for el in line:
            print el,
        print

def print_cells(cells):
    table=[columns]
    intercambiar(cells)
    for cell in cells:
        cell_properties=[]
        for column in columns:
            cell_properties.append(cell[column])
            #print(cell_properties.append(cell[column]))
        table.append(cell_properties)
    print_table(table)

def intercambiar(data):
    info = 0
    #print "ahhhhh"



def main():
    """Pretty prints the output of iwlist scan into a table"""
    
    cells=[[]]
    parsed_cells=[]

    proc = subprocess.Popen(["iwlist", interface, "scan"],stdout=subprocess.PIPE, universal_newlines=True)
    out, err = proc.communicate()

    for line in out.split("\n"):
        cell_line = match(line,"Cell ")
        if cell_line != None:
            cells.append([])
            line = cell_line[-27:]
        cells[-1].append(line.rstrip())

    cells=cells[1:]

    for cell in cells:
        parsed_cells.append(parse_cell(cell))

    sort_cells(parsed_cells)

    print_cells(parsed_cells)

    

main()