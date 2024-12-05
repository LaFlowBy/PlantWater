"""Main Module"""

import time
import Adafruit_ADS1x15
from firestore import FirestoreDatabase

try:
    SERVICE_ACCOUNT_PATH = '~/Repos/PlantWater/serviceAccountKey.json'
    adc = Adafruit_ADS1x15.ADS1115()
    db = FirestoreDatabase(SERVICE_ACCOUNT_PATH)

    GAIN = 1
    NAME = 'Efeutute'
    plant = db.findPlantByName(NAME)
    if plant is None:
        plant = db.addPlant(NAME, 'Succulent')

    while True:
        data_value =adc.read_adc(3, gain=GAIN)
        db.addDataToPlant(plant, data_value)
        print(data_value)
        time.sleep(10)
except KeyboardInterrupt:
    print("Exit")
