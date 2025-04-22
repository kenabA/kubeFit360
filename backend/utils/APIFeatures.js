const { default: mongoose } = require('mongoose');

class APIFeatures {
  constructor(query, queryString, config = {}) {
    this.query = query;
    this.queryString = queryString;
    this.config = config;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
    );

    if (this.queryString.search) {
      this.search(queryStr);
    } else {
      this.query.find(queryStr);
    }
    return this;
  }

  async search(queryStr) {
    const searchRegex = { $regex: this.queryString.search, $options: 'i' };
    const isNumeric = !isNaN(searchRegex);

    const {
      includeUserFields = false,
      userFields = ['member', 'trainer'], // optional: define which user-linked fields to use
    } = this.config; // Destructing the options object

    let userIds = [];

    if (includeUserFields) {
      // First find matching users
      const matchingUsers = await mongoose
        .model('User')
        .find({
          name: searchRegex,
        })
        .select('_id');

      userIds = matchingUsers.map((user) => user._id);
      console.log('User IDs matching the search term:');
    }

    // Build search conditions
    const searchConditions = [
      { name: searchRegex },
      { email: searchRegex },
      { equipmentName: searchRegex },
      { serialNumber: searchRegex },
      { brandName: searchRegex },
      { model: searchRegex },
    ];

    if (includeUserFields && userIds.length > 0) {
      userFields.forEach((field) => {
        searchConditions.push({ [field]: { $in: userIds } });
      });
    }

    if (isNumeric) {
      searchConditions.push({ phoneNumber: parseInt(this.queryString.search) });
    }

    const searchQuery = { ...queryStr, $or: searchConditions };

    delete searchQuery['search'];
    this.query.find(searchQuery);
  }

  sort(timeStr) {
    this.query = this.query.sort(timeStr || '-createdAt');
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
