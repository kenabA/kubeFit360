const { WeightLog } = require('../models/weightLogModal');
const catchAsync = require('../utils/catchAsync');

exports.inputWeight = catchAsync(async (req, res, next) => {
  const { weight, loggedAt, overwrite = false } = req.body;
  if (!weight || typeof weight !== 'number' || weight <= 0) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Invalid weight value' });
  }

  const existing = await WeightLog.findOne({ user: req.user.id, loggedAt });

  if (existing && !overwrite) {
    return res.status(409).json({
      message: 'Weight already recorded for this date.',
      existingWeight: existing.weight,
    });
  }

  if (existing && overwrite) {
    existing.weight = weight;
    await existing.save();
    return res.status(200).json({ message: 'Weight updated successfully.' });
  }

  const newEntry = await WeightLog.create({
    user: req.user.id,
    weight,
    loggedAt,
  });
  res.status(200).json({ status: 'success', data: { data: newEntry } });
});

exports.getWeights = catchAsync(async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ status: 'fail', message: 'No User Found' });
  }

  const { range } = req.query;
  const days = parseInt(range || '90d');
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const weights = await WeightLog.find({
    user: req.user.id,
    loggedAt: { $gte: new Date(startDate).toISOString() },
  }).sort({ loggedAt: 1 });

  res.status(200).json({ status: 'success', data: { data: weights } });
});

exports.seedLast6MonthsWeights = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    const startDate = new Date();
    startDate.setMonth(today.getMonth() - 6);

    const logs = [];

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      logs.push({
        user: userId,
        weight: +(65 + Math.random() * 10).toFixed(1),
        loggedAt: new Date(d),
      });
    }

    await WeightLog.insertMany(logs);

    res.status(201).json({
      status: 'success',
      message: `${logs.length} weight logs inserted for the past 6 months.`,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: 'fail', message: 'Seeding failed', error: err.message });
  }
};

exports.deleteAllWeights = catchAsync(async (req, res, next) => {
  await WeightLog.deleteMany();
  res.status(204).json({
    status: 'success',
  });
});
