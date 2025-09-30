import { openDB } from "idb";

const taskDBPromise = openDB("taskkeyval-store", 1, {
  upgrade(db) {
    db.createObjectStore("keyval");
  },
});

export async function get(key) {
  return (await taskDBPromise).get("keyval", key);
}

export async function set(key, val) {
  return (await taskDBPromise).put("keyval", val, key);
}

export async function del(key) {
  return (await taskDBPromise).delete("keyval", key);
}

export async function clear() {
  return (await taskDBPromise).clear("keyval");
}

export async function keys() {
  return (await taskDBPromise).getAllKeys("keyval");
}

export async function getAllKeys() {
  return (await taskDBPromise).getAllKeys("keyval");
}
