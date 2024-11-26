import { openDB } from "idb";

const DB_NAME = "RestaurantDB";
const STORE_NAME = "restaurants";

export const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const saveRestaurants = async (restaurants) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  for (const restaurant of restaurants) {
    tx.store.put(restaurant); // Save each restaurant
  }
  await tx.done;
};

export const getRestaurants = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};
