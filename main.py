from firestore import FirestoreDatabase
import Adafruit_ADS1x15
import time
import sys

try:
    adc = Adafruit_ADS1x15.ADS1115()
    db = FirestoreDatabase(sys.argv[1])

    GAIN = 1
    name = 'Efeutute'
    plant = db.findPlantByName(name)
    if( plant == None):
        plant = db.addPlant(name, 'Succulent')

    while True:
        data_value =adc.read_adc(3, gain=GAIN)
        db.addDataToPlant(plant, data_value)
        print(data_value)
        time.sleep(10)  
except KeyboardInterrupt:
    print("Exit")