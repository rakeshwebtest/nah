module.exports = {
  name: 'lcexchpro',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/lcexchpro',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
