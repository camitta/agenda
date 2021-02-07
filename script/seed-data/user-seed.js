const {User} = require('../../server/db/models')

const users = [
  {
    firstName: 'Shermie',
    lastName: 'Zanelli',
    email: 'szanelli0@ezinearticles.com',
    password: 'wPCWNjW5VN92'
  },
  {
    firstName: 'Henryetta',
    lastName: 'Nairns',
    email: 'hnairns1@hhs.gov',
    password: 'bwVBLP'
  },
  {
    firstName: 'Daphna',
    lastName: 'Matteacci',
    email: 'dmatteacci2@apple.com',
    password: '4oelxK4G'
  },
  {
    firstName: 'Cheryl',
    lastName: 'Stowe',
    email: 'cstowe3@lulu.com',
    password: 'vwFReooEBz'
  },
  {
    firstName: 'Gare',
    lastName: 'Twaite',
    email: 'gtwaite4@wikispaces.com',
    password: 'YX00ENsV'
  },
  {
    firstName: 'Nicolette',
    lastName: 'Degan',
    email: 'ndegan5@simplemachines.org',
    password: 'g0VGAwr6'
  },
  {
    firstName: 'Lillian',
    lastName: 'Leving',
    email: 'lleving6@behance.net',
    password: 'JXStdBh'
  },
  {
    firstName: 'Bea',
    lastName: 'Coiley',
    email: 'bcoiley7@privacy.gov.au',
    password: 'WBHGZzPaYmG'
  },
  {
    firstName: 'Leda',
    lastName: 'Tyrie',
    email: 'ltyrie8@auda.org.au',
    password: 'krDsnyPs3NS'
  },
  {
    firstName: 'Mareah',
    lastName: 'Swiffin',
    email: 'mswiffin9@twitter.com',
    password: '8MIAQx'
  },
  {
    firstName: 'Gunther',
    lastName: 'Mityushkin',
    email: 'gmityushkina@sun.com',
    password: 'lhvVDB'
  },
  {
    firstName: 'Cly',
    lastName: 'Barukh',
    email: 'cbarukhb@narod.ru',
    password: '7odJQSIHb'
  },
  {
    firstName: 'Winona',
    lastName: 'Drillingcourt',
    email: 'wdrillingcourtc@amazon.co.jp',
    password: 'xxbECpoyc'
  },
  {
    firstName: 'Giovanna',
    lastName: 'Caskie',
    email: 'gcaskied@alexa.com',
    password: 'QOBL9W'
  },
  {
    firstName: 'Merwyn',
    lastName: 'Mullin',
    email: 'mmulline@facebook.com',
    password: 'IzO0jkF'
  },
  {
    firstName: 'Rosalie',
    lastName: 'Streather',
    email: 'rstreatherf@geocities.jp',
    password: '6opApuox'
  },
  {
    firstName: 'Judith',
    lastName: 'Acomb',
    email: 'jacombg@netlog.com',
    password: 'Onm1AFf5iNK'
  },
  {
    firstName: 'Jacklyn',
    lastName: 'Hillatt',
    email: 'jhillatth@quantcast.com',
    password: 'GcGBD3sJNCo'
  },
  {
    firstName: 'Jerri',
    lastName: 'Schimonek',
    email: 'jschimoneki@sfgate.com',
    password: 'e5UAbc'
  },
  {
    firstName: 'Jaquelin',
    lastName: 'Cumberpatch',
    email: 'jcumberpatchj@newyorker.com',
    password: 'eBUQ3d'
  },
  {
    firstName: 'Lorri',
    lastName: 'Sunnucks',
    email: 'lsunnucksk@illinois.edu',
    password: '1IPR45'
  },
  {
    firstName: 'Harris',
    lastName: 'Boundy',
    email: 'hboundyl@angelfire.com',
    password: '1IIWzgLgfb'
  },
  {
    firstName: 'Monah',
    lastName: 'Frenzl',
    email: 'mfrenzlm@indiatimes.com',
    password: 'yBt8yT9K'
  },
  {
    firstName: 'Vanya',
    lastName: 'Vautier',
    email: 'vvautiern@un.org',
    password: '9SN4eaU'
  },
  {
    firstName: 'Fionnula',
    lastName: 'Leatherland',
    email: 'fleatherlando@facebook.com',
    password: 'R5fWGE'
  }
]

const seedUsers = async () => {
  try {
    await User.bulkCreate(users)
  } catch (err) {
    console.log(err)
  }
  console.log('Users seeded successfully!')
}

module.exports = seedUsers
