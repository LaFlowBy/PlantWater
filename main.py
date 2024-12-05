"""Main Module"""
import sys
import time
import logging
import Adafruit_ADS1x15
from firestore import FirestoreDatabase

# Configure logging to log to a file
logging.basicConfig(filename='/home/florian/main.log',
                     level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

try:
    adc = Adafruit_ADS1x15.ADS1115()
    logging.info(sys.argv[1])
    db = FirestoreDatabase(sys.argv[1] if len(sys.argv) > 1 else None)

    GAIN = 1
    NAME = 'Efeutute'
    plant = db.findPlantByName(NAME)
    if plant is None:
        plant = db.addPlant(NAME, 'Succulent')
        logging.info(f"Added new plant: {NAME}")

    while True:
        data_value = adc.read_adc(3, gain=GAIN)
        db.addDataToPlant(plant, data_value)
        logging.info(f"Data value: {data_value}")
        time.sleep(10)
except KeyboardInterrupt:
    logging.info("Exit")
