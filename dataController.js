import db from "../config/db.js";

export const getAllData = async (req, res) => {
try {
const data = await db.collection("your_collection").find().toArray();
res.status(200).json(data);
} catch (err) {
res.status(500).json({ message: err.message });
}
};

export const getDataById = async (req, res) => {
try {
const id = req.params.id;
const data = await db.collection("your_collection").findOne({ _id: id });
if (!data) return res.status(404).json({ message: "Not found" });
res.status(200).json(data);
} catch (err) {
res.status(500).json({ message: err.message });
}
};

export const createData = async (req, res) => {
try {
const newData = req.body;
const result = await db.collection("your_collection").insertOne(newData);
res.status(201).json(result);
} catch (err) {
res.status(500).json({ message: err.message });
}
};

export const updateData = async (req, res) => {
try {
const id = req.params.id;
const update = { $set: req.body };
const result = await db.collection("your_collection").updateOne({ _id: id }, update);
res.status(200).json(result);
} catch (err) {
res.status(500).json({ message: err.message });
}
};

export const deleteData = async (req, res) => {
try {
const id = req.params.id;
const result = await db.collection("your_collection").deleteOne({ _id: id });
res.status(200).json(result);
} catch (err) {
res.status(500).json({ message: err.message });
}
};
