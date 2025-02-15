import { db } from "../../config/firebase";
import { get, ref, query, equalTo, child, orderByChild, remove, set, push } from 'firebase/database';

export async function checkIfVehicleInFavorites (userUID, vinNumber) {
    const favoritesRef = ref(db, `users/${userUID}/garage/favorites`);
    const vinQuery = query(favoritesRef, orderByChild('vin'), equalTo(vinNumber));

    const snapshot = await get(vinQuery);
    return snapshot.exists();
}

export const saveCarInGarage = async (userUID, carData, potentialOdometerFraud, inspectionProblems, vehicleComment) => {
    const vehiclesRef = ref(db, `users/${userUID}/garage/favorites`);
    const vehicle = {
        name: `${carData?.znamka?.toUpperCase()} ${carData?.model_detail?.toUpperCase()}`,
        vin: carData.vin,
        color: carData.barva_detail,
        type: carData.gorivo,
        vehicleComment: vehicleComment,
        km: carData.km,
        potentialOdometerFraud,
        inspectionProblems
    }
    const newVehicleRef = push(vehiclesRef);
    await set(newVehicleRef, vehicle);
    console.log("Vehicle added successfully");
}