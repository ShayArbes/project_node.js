const jsonfile = require("jsonfile");
const path = require("node:path");
let db = jsonfile.readFileSync(path.join(__dirname, "db.json"));

async function getProducts() {
  return db;
}

async function getIdProduct(id) {
  const userId = parseInt(id);
  const user = db.find((u) => u.id === userId);
  return user || null;
}

async function postProduct(newUser) {
  newUser.id = db[db.length - 1].id + 1;
  db.push(newUser);
  saveToFile(db);
  return db; // Return the updated array
}



//----------------------------------------

async function updateProduct(id, updatedData) {
  const productIndex = db.findIndex(product => product.id === id);
  if (productIndex !== -1) {
    db[productIndex] = { ...db[productIndex], ...updatedData };
    saveToFile(db);
    return db[productIndex];
  }
  return null;
}

async function deleteProduct(id) {
  const productIndex = db.findIndex(product => product.id === id);
  if (productIndex !== -1) {
    db.splice(productIndex, 1);
    saveToFile(db);
    return true;
  }
  return false;
}

async function incrementQuantity(id) {
  const productIndex = db.findIndex(product => product.id === id);
  if (productIndex !== -1) {
    db[productIndex].quantity++;
    saveToFile(db);
    return db[productIndex];
  }
  return null;
}
async function decrementQuantity(id) {
  const productIndex = db.findIndex(product => product.id === id);
  if (productIndex !== -1) {
    db[productIndex].quantity--;
    saveToFile(db);
    return db[productIndex];
  }
  return null;
}


const saveToFile = (db) => {
  jsonfile.writeFileSync(path.join(__dirname, "db.json"), db);
};

module.exports = { getProducts, getIdProduct, postProduct, updateProduct, deleteProduct, incrementQuantity, decrementQuantity };
