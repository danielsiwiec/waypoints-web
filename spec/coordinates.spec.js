import coordinates from '../public/tools/coordinates'

describe('coordinates', () => {
  it('should recognize Decimal Degrees coordinates', () => {
    expect(coordinates('41.40338, 2.17403')).toEqual({lat: 41.40338, lng: 2.17403})
  })

  it('should recognize Decimal Degrees coordinates without a comma', () => {
    expect(coordinates('41.40338 2.17403')).toEqual({lat: 41.40338, lng: 2.17403})
  })

  it('should recognize Decimal Degrees negative coordinates', () => {
    expect(coordinates('-41.40338, -2.17403')).toEqual({lat: -41.40338, lng: -2.17403})
  })

  it('should recognize Decimal Minutes coordinates', () => {
    expect(coordinates('41 24.2028, 2 10.4418')).toEqual({lat: 41.40338, lng: 2.17403})
  })

  it('should recognize Decimal Minutes coordinates without a comma', () => {
    expect(coordinates('41 24.2028 2 10.4418')).toEqual({lat: 41.40338, lng: 2.17403})
  })

  it('should recognize Decimal Minutes negative coordinates', () => {
    expect(coordinates('-41 24.2028, -2 10.4418')).toEqual({lat: -41.40338, lng: -2.17403})
  })

  it('should recognize Degrees, minutes and seconds coordinates for NE', () => {
    expect(coordinates(`41°24'12.2"N 2°10'26.5"E`)).toEqual({lat: 41.40339, lng: 2.17403})
  })

  it('should recognize Degrees, minutes and seconds coordinates for SW', () => {
    expect(coordinates(`41°24'12.2"S 2°10'26.5"W`)).toEqual({lat: -41.40339, lng: -2.17403})
  })

  it('should recognize Degrees, minutes and seconds coordinates for SW with a space before NSEW', () => {
    expect(coordinates(`41°24'12.2" S 2°10'26.5" W`)).toEqual({lat: -41.40339, lng: -2.17403})
  })

  it('should recognize UTM format', () => {
    expect(coordinates('31T 430959.5858286716 4583866.770942634')).toEqual({lat: 41.40338, lng: 2.17403})
  })

  it('should return null for a search string input', () => {
    expect(coordinates('freddys sandwitches')).toBeNull()
  })
})
