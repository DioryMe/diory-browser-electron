const { readFileSync } = require('fs')
const { load } = require('exifreader')

jest.mock('fs')
jest.mock('exifreader')

const { readImage } = require('./image-reader')

describe('image-reader', () => {
  let act
  describe('readImage', () => {
    let imagePath
    let tags

    it('renders with undefined values', async () => {
      readImage()
    })

    beforeEach(() => {
      tags = {}
      act = () => {
        readFileSync.mockReturnValue({})
        load.mockReturnValue(tags)
        return readImage(imagePath)
      }
    })

    it('renders with empty responses', async () => {
      act()
    })

    describe('given image path', () => {
      beforeEach(() => {
        imagePath = 'some-imagePath'
      })

      it('reads image', async () => {
        await act()

        expect(readFileSync).toHaveBeenCalledWith('some-imagePath')
      })

      it('set DateTime  or DateTimeOriginal to date', async () => {
        tags.DateTimeOriginal = { value: ['1234:12:34 12:34:56'] }
        expect(act().date).toEqual('1234-12-34T12:34:56.000Z')

        tags.DateTime = { value: ['4321:12:34 12:34:56'] }
        expect(act().date).toEqual('4321-12-34T12:34:56.000Z')
      })

      it('set DateCreated or CreateDate to created', async () => {
        tags.CreateDate = { value: ['1234-12-34T12:34:56.000'] }
        expect(act().created).toEqual('1234-12-34T12:34:56.000Z')

        tags.DateCreated = { value: ['4321-12-34T12:34:56.000'] }
        expect(act().created).toEqual('4321-12-34T12:34:56.000Z')
      })

      it('set GPSLatitude description to latitude', async () => {
        tags.GPSLatitude = { description: 'some-GPSLatitude-description' }
        expect(act().latitude).toEqual('some-GPSLatitude-description')
      })

      it('set GPSLongitude description to longitude', async () => {
        tags.GPSLongitude = { description: 'some-GPSLongitude-description' }
        expect(act().longitude).toEqual('some-GPSLongitude-description')
      })

    })
  })
})

const exampleTags = [
  {
    'Bits Per Sample': { value: 8, description: '8' },
    'Image Height': { value: 640, description: '640px' },
    'Image Width': { value: 480, description: '480px' },
    'Color Components': { value: 3, description: '3' },
    Subsampling: {
      value: [ [Array], [Array], [Array] ],
      description: 'YCbCr4:2:0 (2 2)'
    },
    Make: { id: 271, value: [ 'HMD Global' ], description: 'HMD Global' },
    Model: { id: 272, value: [ 'Nokia 6.1' ], description: 'Nokia 6.1' },
    Orientation: { id: 274, value: 1, description: 'top-left' },
    XResolution: { id: 282, value: 72, description: 72 },
    YResolution: { id: 283, value: 72, description: 72 },
    DateTime: {
      id: 306,
      value: [ '2019:11:25 19:58:24' ],
      description: '2019:11:25 19:58:24'
    },
    'Exif IFD Pointer': { id: 34665, value: 168, description: 168 },
    'GPS Info IFD Pointer': { id: 34853, value: 482, description: 482 },
    ExposureTime: { id: 33434, value: 0.07, description: 0.07 },
    FNumber: { id: 33437, value: 2, description: 2 },
    ISOSpeedRatings: { id: 34855, value: 800, description: 800 },
    ExifVersion: { id: 36864, value: [ 48, 50, 50, 48 ], description: '0220' },
    DateTimeOriginal: {
      id: 36867,
      value: [ '2019:11:25 19:58:24' ],
      description: '2019:11:25 19:58:24'
    },
    DateTimeDigitized: {
      id: 36868,
      value: [ '2019:11:25 19:58:24' ],
      description: '2019:11:25 19:58:24'
    },
    ApertureValue: { id: 37378, value: 2, description: 2 },
    MeteringMode: { id: 37383, value: 3, description: 'Spot' },
    Flash: { id: 37385, value: 0, description: 'Flash did not fire' },
    FocalLength: { id: 37386, value: 3.57, description: 3.57 },
    SubSecTime: { id: 37520, value: [ '734' ], description: '734' },
    SubSecTimeOriginal: { id: 37521, value: [ '734' ], description: '734' },
    SubSecTimeDigitized: { id: 37522, value: [ '734' ], description: '734' },
    ColorSpace: { id: 40961, value: 1, description: 'sRGB' },
    PixelXDimension: { id: 40962, value: 480, description: 480 },
    PixelYDimension: { id: 40963, value: 640, description: 640 },
    ExposureIndex: { id: 41493, value: 9, description: 9 },
    WhiteBalance: { id: 41987, value: 0, description: 'Auto white balance' },
    SceneCaptureType: { id: 41990, value: 6, description: 'Unknown' },
    GPSLatitudeRef: { id: 1, value: [ 'N' ], description: 'North latitude' },
    GPSLongitudeRef: { id: 3, value: [ 'E' ], description: 'East longitude' },
    GPSAltitude: { id: 6, value: 149, description: '149 m' },
    GPSTimeStamp: { id: 7, value: [ 17, 58, 24 ], description: '17:58:24' },
    GPSDateStamp: { id: 29, value: [ '2019:11:25' ], description: '2019:11:25' },
    'Coded Character Set': { id: 346, value: [ 27, 37, 71 ], description: 'UTF-8' },
    'Record Version': { id: 512, value: [ 0, 2 ], description: '2' },
    'Digital Creation Time': {
      id: 575,
      value: [ 49, 57, 53, 56, 50, 52 ],
      description: '19:58:24'
    },
    'Digital Creation Date': {
      id: 574,
      value: [
        50, 48, 49, 57,
        49, 49, 50, 53
      ],
      description: '2019-11-25'
    },
    'Date Created': {
      id: 567,
      value: [
        50, 48, 49, 57,
        49, 49, 50, 53
      ],
      description: '2019-11-25'
    },
    'Time Created': {
      id: 572,
      value: [ 49, 57, 53, 56, 50, 52 ],
      description: '19:58:24'
    }
  },
  {
    'Bits Per Sample': { value: 8, description: '8' },
    'Image Height': { value: 480, description: '480px' },
    'Image Width': { value: 640, description: '640px' },
    'Color Components': { value: 3, description: '3' },
    Subsampling: {
      value: [ [Array], [Array], [Array] ],
      description: 'YCbCr4:2:2 (2 1)'
    },
    ImageDescription: {
      id: 270,
      value: [ '                               ' ],
      description: '                               '
    },
    Make: { id: 271, value: [ 'NIKON' ], description: 'NIKON' },
    Model: { id: 272, value: [ 'COOLPIX P6000' ], description: 'COOLPIX P6000' },
    Orientation: { id: 274, value: 1, description: 'top-left' },
    XResolution: { id: 282, value: 300, description: 300 },
    YResolution: { id: 283, value: 300, description: 300 },
    ResolutionUnit: { id: 296, value: 2, description: 'inches' },
    Software: {
      id: 305,
      value: [ 'Nikon Transfer 1.1 W' ],
      description: 'Nikon Transfer 1.1 W'
    },
    DateTime: {
      id: 306,
      value: [ '2008:11:01 21:15:11' ],
      description: '2008:11:01 21:15:11'
    },
    YCbCrPositioning: { id: 531, value: 1, description: 'centered' },
    'Exif IFD Pointer': { id: 34665, value: 268, description: 268 },
    'GPS Info IFD Pointer': { id: 34853, value: 926, description: 926 },
    ExposureTime: { id: 33434, value: 0.01, description: 0.01 },
    FNumber: { id: 33437, value: 4.4, description: 4.4 },
    ExposureProgram: { id: 34850, value: 2, description: 'Normal program' },
    ISOSpeedRatings: { id: 34855, value: 64, description: 64 },
    ExifVersion: { id: 36864, value: [ 48, 50, 50, 48 ], description: '0220' },
    DateTimeOriginal: {
      id: 36867,
      value: [ '2008:10:22 17:00:07' ],
      description: '2008:10:22 17:00:07'
    },
    DateTimeDigitized: {
      id: 36868,
      value: [ '2008:10:22 17:00:07' ],
      description: '2008:10:22 17:00:07'
    },
    ComponentsConfiguration: { id: 37121, value: [ 1, 2, 3, 0 ], description: '' },
    ExposureBiasValue: { id: 37380, value: 0, description: 0 },
    MaxApertureValue: { id: 37381, value: 2.9, description: 2.9 },
    MeteringMode: { id: 37383, value: 5, description: 'Pattern' },
    LightSource: { id: 37384, value: 0, description: 'Unknown' },
    Flash: {
      id: 37385,
      value: 16,
      description: 'Flash did not fire, compulsory flash mode'
    },
    FocalLength: { id: 37386, value: 15, description: 15 },
    MakerNote: {
      id: 37500,
      value: [
        78, 105, 107, 111, 110,  0,  2,  0, 0, 0, 73, 73,
        42,   0,   8,   0,   0,  0, 35,  0, 1, 0,  7,  0,
        4,   0,   0,   0,  48, 50, 49, 48, 2, 0,  3,  0,
        2,   0,   0,   0,   0,  0,  0,  0, 3, 0,  2,  0,
        6,   0,   0,   0, 178,  1,  0,  0, 4, 0,  2,  0,
        8,   0,   0,   0, 184,  1,  0,  0, 5, 0,  2,  0,
        13,   0,   0,   0, 192,  1,  0,  0, 6, 0,  2,  0,
        7,   0,   0,   0, 206,  1,  0,  0, 7, 0,  2,  0,
        7,   0,   0,   0,
      ],
      description: '[Raw maker note data]'
    },
    UserComment: {
      id: 37510,
      value: [
        65, 83, 67, 73, 73,  0,  0,  0, 32, 32, 32, 32,
        32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
        32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
        32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
        32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
        32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
        32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
        32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
        32, 32, 32, 32,
      ],
      description: '                                                                                                                     \u0000'
    },
    FlashpixVersion: { id: 40960, value: [ 48, 49, 48, 48 ], description: '0100' },
    ColorSpace: { id: 40961, value: 1, description: 'sRGB' },
    PixelXDimension: { id: 40962, value: 640, description: 640 },
    PixelYDimension: { id: 40963, value: 480, description: 480 },
    'Interoperability IFD Pointer': { id: 40965, value: 896, description: 896 },
    FileSource: { id: 41728, value: 3, description: 'DSC' },
    SceneType: { id: 41729, value: 1, description: 'A directly photographed image' },
    CustomRendered: { id: 41985, value: 0, description: 'Normal process' },
    ExposureMode: { id: 41986, value: 0, description: 'Auto exposure' },
    WhiteBalance: { id: 41987, value: 0, description: 'Auto white balance' },
    DigitalZoomRatio: { id: 41988, value: 0, description: 'Digital zoom was not used' },
    FocalLengthIn35mmFilm: { id: 41989, value: 70, description: 70 },
    SceneCaptureType: { id: 41990, value: 0, description: 'Standard' },
    GainControl: { id: 41991, value: 0, description: 'None' },
    Contrast: { id: 41992, value: 0, description: 'Normal' },
    Saturation: { id: 41993, value: 0, description: 'Normal' },
    Sharpness: { id: 41994, value: 0, description: 'Normal' },
    SubjectDistanceRange: { id: 41996, value: 0, description: 'Unknown' },
    GPSLatitudeRef: { id: 1, value: [ 'N' ], description: 'North latitude' },
    GPSLatitude: { id: 2, value: [ 43, 27, 52.038 ], description: 43.464455 },
    GPSLongitudeRef: { id: 3, value: [ 'E' ], description: 'East longitude' },
    GPSLongitude: { id: 4, value: [ 11, 52, 53.322 ], description: 11.881478333333334 },
    GPSAltitudeRef: { id: 5, value: 0, description: 'Sea level' },
    GPSTimeStamp: { id: 7, value: [ 14, 57, 41.37 ], description: '14:57:41.37' },
    GPSSatellites: { id: 8, value: [ '04' ], description: '04' },
    GPSImgDirectionRef: { id: 16, value: [], description: 'Unknown' },
    GPSMapDatum: { id: 18, value: [ 'WGS-84   ' ], description: 'WGS-84   ' },
    GPSDateStamp: { id: 29, value: [ '2008:10:23' ], description: '2008:10:23' },
    InteroperabilityIndex: { id: 1, value: [ 'R98' ], description: 'R98' },
    InteroperabilityVersion: { id: 2, value: [ 48, 49, 48, 48 ], description: '0100' }
  },
]
