"""Main Module"""
import time
import logging
import Adafruit_ADS1x15
from firestore import FirestoreDatabase
import os

# Configure logging to log to a file
logging.basicConfig(filename='/home/florian/main.log',
                     level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

try:
    adc = Adafruit_ADS1x15.ADS1115()
    
    db = FirestoreDatabase("serviceAccountKey.json")

    GAIN = 1
    NAME = 'Efeutute'
    plant = db.findPlantByName(NAME)
    if plant is None:
        plant = db.addPlant(NAME, 'Succulent')
        logging.info("Added new plant: %s", NAME)

    while True:
        data_value = adc.read_adc(3, gain=GAIN)
        db.addDataToPlant(plant, data_value)
        logging.info("Data value: %s", data_value)
        time.sleep(60)
except KeyboardInterrupt:
    logging.info("Exit")
except Exception as e:
    logging.error("Error: %s", e)
