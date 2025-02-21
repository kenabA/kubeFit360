class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
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

  search(queryStr) {
    const searchRegex = { $regex: this.queryString.search, $options: 'i' };
    const isNumeric = !isNaN(searchRegex);
    const searchQuery = {
      ...queryStr,
      $or: [
        { name: searchRegex },
        { email: searchRegex },
        { equipmentName: searchRegex },
        { serialNumber: searchRegex },
        { brandName: searchRegex },
        ...(isNumeric ? [{ phoneNumber: parseInt(searchRegex) }] : []),
      ],
    };

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
