"""Main Module"""

import time
import os
import Adafruit_ADS1x15
from firestore import FirestoreDatabase

try:
    service_account_path = '~/Repos/PlantWater/serviceAccountKey.json'
    adc = Adafruit_ADS1x15.ADS1115()
    db = FirestoreDatabase(service_account_path)

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
