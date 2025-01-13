const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  equipmentName: {
    type: String,
    required: [true, 'A equipment must have a name'],
  },
  serialNumber: {
    unique: true,
    type: Number,
    required: [true, 'A equipment must have a serial number'],
  },
  installationDate: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: 'active',
    enum: {
      values: ['active', 'inactive', 'deleted'],
      message: 'Please provide a valid status',
    },
  },
  brandName: {
    type: String,
    required: [true, 'A equipment must have a brand name.'],
  },
  lastMaintenance: Date,
  category: {
    enum: {
      values: ['strength', 'cardio', 'flexibility'],
      message: 'Please provide a valid category',
    },
    type: String,
    required: [true, 'A equipment must have a category.'],
  },
  description: {
    type: String,
    required: [true, 'A equipment must have a description.'],
  },
  equipmentImage: String,
});

// equipmentSchema.pre('findOneAndUpdate', async function (next) {
//   const query = this.getQuery();
//   const update = this.getUpdate();

//   // Check if status is part of the update
//   if (update.status) {
//     const doc = await this.model.findOne(query);

//     if (doc && doc.status !== update.status) {
//       console.log(
//         `Status is being changed from '${doc.status}' to '${update.status}'`,
//       );
//     }
//   }

//   next();
// });

const Equipment = mongoose.model('Equipment', equipmentSchema);
module.exports = Equipment;
