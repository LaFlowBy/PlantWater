from firebase_admin import firestore

class FirestoreDatabase:
    def __init__(self, credentials_path=None):
        # Initialize Firestore client
        credentials_path = os.path.expanduser(credentials_path) if credentials_path else None
        self.db = firestore.Client.from_service_account_json(credentials_path) if credentials_path else firestore.Client()
        self.PLANTS_COLLECTION = 'plants'
        self.DATA_COLLECTION = 'data'

    def __plantsCollection(self):
        return self.db.collection(self.PLANTS_COLLECTION)
    
    def addPlant(self, plant_name, plant_type):
        """Adds a plant to the Firestore database."""
        timestamp, plant_ref = self.__plantsCollection().add({
            'name': plant_name,
            'type': plant_type
        })
        print(f"Plant {plant_name} added with ID: {plant_ref.id}.")
        return plant_ref.id

    def addDataToPlant(self, plant_id, value):
        """Adds data to a specific plant's document."""
        plant_ref = self.__plantsCollection().document(plant_id)
        timestamp, data_ref = plant_ref.collection(self.DATA_COLLECTION).add({
            'value': value,
            'timestamp': firestore.SERVER_TIMESTAMP  # Automatically set to the server's current time
        })
        print(f"Data added to plant {plant_id}: {value} at {data_ref.id}.")

    def findPlantByName(self, plant_name):
        """Retrieves a plant by its name."""
        plant_ref = self.__plantsCollection().where('name', '==', plant_name).stream()
        
        for doc in plant_ref:
            return doc.id
        print(f"No plant found with name {plant_name}.")
        return None


    def getDataFromPlant(self, plant_id):
        """Retrieves all data from a specific plant's data subcollection."""
        plant_ref = self.__plantsCollection().document(plant_id)
        data_ref = plant_ref.collection(self.DATA_COLLECTION).order_by('timestamp').stream()
        
        data = []
        for doc in data_ref:
            data.append(doc.to_dict())
        
        if data:
            return data
        else:
            print(f"No data found for plant with ID {plant_id}.")
            return None

    def deletePlant(self, plant_id):
        """Deletes a plant from the Firestore database."""
        plant_ref = self.__plantsCollection().document(plant_id)
        plant_ref.delete()
        print(f"Plant with ID {plant_id} deleted successfully.")
